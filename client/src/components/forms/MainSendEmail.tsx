import React, { useState, useEffect } from "react";
import Alert from "../ui/Alert";
import { connectSocket, getSocket } from "../../handler/socket";

const MainSendEmail = () => {
  let [formData, setFormData] = useState({
    appName: "",
    appPassword: "",
    emailBody: "",
    subject: "",
    userEmail: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [parsedEmails, setParsedEmails] = useState<string[]>([]);
  const [worker, setWorker] = useState<Worker | null>(null);

  const [alertState, setAlertState] = useState<{
    show: boolean;
    type: "success" | "error" | "warning" | "info";
    message: string;
  }>({
    show: false,
    type: "info",
    message: "",
  });

  const [emailResult, setEmailResult] = useState<{
    success: boolean;
    sent: number;
    total: number;
    successfulEmails?: string[];
    errors?: { email: string; error: string }[];
  } | null>(null);

  const [progress, setProgress] = useState<{
    sent: number;
    failed: number;
    total: number;
    currentEmail?: string;
  } | null>(null);

  useEffect(() => {
    // Connect to socket
    const socket = connectSocket();

    socket.on("email_progress", (data) => {
      setProgress(data);
    });

    const emailWorker = new Worker(
      new URL("../../worker/pdfParserWorker.ts", import.meta.url),
      { type: "module" },
    );

    emailWorker.onmessage = (event) => {
      const { emails, error } = event.data;
      setIsLoading(false);

      if (error) {
        setAlertState({
          show: true,
          type: "error",
          message: `Error parsing file: ${error}`,
        });
        setParsedEmails([]);
      } else {
        setParsedEmails(emails);
        setAlertState({
          show: true,
          type: "success",
          message: `Successfully parsed ${emails.length} email(s)`,
        });
      }
    };

    setWorker(emailWorker);

    return () => {
      emailWorker.terminate();
      socket.off("email_progress");
    };
  }, []);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && worker) {
      setIsLoading(true);
      worker.postMessage({
        type: "parse_emails",
        file: file,
      });
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;

    if (
      !formData.appName ||
      !formData.appPassword ||
      !formData.userEmail ||
      !formData.subject ||
      !formData.emailBody
    ) {
      setAlertState({
        show: true,
        type: "warning",
        message: "Please fill in all required fields",
      });
      return;
    }

    if (parsedEmails.length === 0) {
      setAlertState({
        show: true,
        type: "warning",
        message: "Please upload a file with email addresses",
      });
      return;
    }

    setIsLoading(true);
    setProgress(null);
    setEmailResult(null);

    try {
      const socket = getSocket();

      if (!socket || !socket.connected || !socket.id) {
        throw new Error(
          "Cannot connect to server. Please wait a moment or ensure the server is running.",
        );
      }

      // Step 1: Register SMTP configuration with server via Socket.io
      await new Promise<void>((resolve, reject) => {
        socket.emit(
          "register_smtp_config",
          {
            appName: formData.appName,
            appPassword: formData.appPassword,
            userEmail: formData.userEmail,
          },
          (response: any) => {
            if (response && !response.success) {
              reject(
                new Error(response.message || "Failed to register SMTP config"),
              );
            } else {
              resolve();
            }
          },
        );
      });

      // Step 2: Send parsed emails and message via POST API
      const payload = {
        emails: parsedEmails,
        subject: formData.subject,
        emailBody: formData.emailBody,
      };

      const serverUrl = (
        import.meta.env.VITE_SERVER_URL || "http://localhost:2025"
      ).trim();
      const response = await fetch(
        `${serverUrl}/api/send-emails?clientId=${socket.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send emails");
      }

      setAlertState({
        show: true,
        type: "success",
        message: `Emails sent successfully! (${data.sent}/${parsedEmails.length})`,
      });

      setEmailResult({
        success: true,
        sent: data.sent,
        total: parsedEmails.length,
        successfulEmails: data.successfulEmails,
        errors: data.errors,
      });

      // Reset form 
      setProgress(null);
      setFormData({
        appName: "",
        appPassword: "",
        emailBody: "",
        subject: "",
        userEmail: "",
      });
      setParsedEmails([]);
      const fileInput = formElement.elements.namedItem(
        "fileInput",
      ) as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertState({
        show: true,
        type: "error",
        message:
          error instanceof Error ? error.message : "Error sending emails",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const formLayout = [
    {
      id: "appName",
      name: "appName",
      type: "text",
      label: "App Name",
      placeholder: "My Email Campaign",
      desc: "Name of your application or campaign",
    },
    {
      id: "appPassword",
      name: "appPassword",
      type: "password",
      label: "Google App Password",
      placeholder: "Your 16-character app password",
      desc: "Get this from your Google Account → Security → App passwords",
    },
    {
      id: "userEmail",
      name: "userEmail",
      type: "email",
      label: "Email Address",
      placeholder: "your-email@gmail.com",
      desc: "The email address from which to send the emails",
    },
    {
      id: "subject",
      name: "subject",
      type: "text",
      label: "Subject of your Email",
      placeholder: "Greeting",
      desc: "Write your Subject for the email",
    },
    {
      id: "emailBody",
      name: "emailBody",
      isTextArea: true,
      label: "Body of your Email",
      placeholder: "<h1>hello</h1>",
      desc: "You can use given template or else put HTML for email body",
    },
    {
      id: "fileInput",
      name: "fileInput",
      isFileUpload: true,
      label: "Upload File",
      desc: "Supported: PDF, XLSX, CSV",
    },
  ];

  const inputStyles =
    "w-full px-4 py-3 border-2 border-gray-300 focus:border-black outline-none transition-colors font-mono";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <form
        className="bg-white text-black p-8 space-y-6"
        onSubmit={submitHandler}
      >
        {formLayout.map((item) => (
          <div key={item.id}>
            <label htmlFor={item.id} className="block font-bold mb-3 text-lg">
              {item.label}
            </label>
            {item.isFileUpload ? (
              <div className="relative">
                <input
                  type="file"
                  id={item.id}
                  name={item.name}
                  accept=".pdf,.xlsx,.csv"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                />
                <label
                  htmlFor={item.id}
                  className={`block bg-gray-50 border-4 border-dashed border-gray-300 p-8 text-center ${
                    isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 cursor-pointer"
                  } transition-colors`}
                >
                  <svg
                    className="w-12 h-12 text-black mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <div>
                    <p className="text-gray-600 text-sm">
                      {isLoading ? "Parsing emails..." : "or click to browse"}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">{item.desc}</p>
                  </div>
                </label>
              </div>
            ) : item.isTextArea ? (
              <textarea
                id={item.id}
                name={item.name}
                onChange={handleOnChange}
                value={formData[item.name as keyof typeof formData]}
                placeholder={item.placeholder}
                rows={4}
                className={inputStyles}
                disabled={isLoading}
              />
            ) : (
              <input
                type={item.type}
                id={item.id}
                onChange={handleOnChange}
                value={formData[item.name as keyof typeof formData]}
                name={item.name}
                placeholder={item.placeholder}
                className={inputStyles}
                disabled={isLoading}
              />
            )}
            {!item.isFileUpload && (
              <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
            )}
          </div>
        ))}

        {parsedEmails.length > 0 && (
          <div className="bg-green-50 border-2 border-green-300 p-4 rounded">
            <p className="font-bold text-green-900 mb-2">
              ✓ {parsedEmails.length} email(s) parsed
            </p>
            <div className="max-h-32 overflow-y-auto text-xs text-green-800">
              <p className="text-green-700 mb-2">Sample emails:</p>
              <ul>
                {parsedEmails.slice(0, 5).map((email, idx) => (
                  <li key={idx} className="font-mono">
                    • {email}
                  </li>
                ))}
              </ul>
              {parsedEmails.length > 5 && (
                <p className="text-green-700 mt-2">
                  + {parsedEmails.length - 5} more email(s)
                </p>
              )}
            </div>
          </div>
        )}

        {progress && isLoading && (
          <div className="bg-gray-50 border-2 border-black p-6">
            <h3 className="font-bold mb-2">Sending Progress...</h3>
            <div className="w-full bg-gray-200 h-4 mb-2 border border-black">
              <div
                className="bg-black h-full transition-all duration-300"
                style={{
                  width: `${((progress.sent + progress.failed) / progress.total) * 100}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between text-sm font-mono text-gray-700">
              <span>
                Sent:{" "}
                <span className="text-green-600 font-bold">
                  {progress.sent}
                </span>
              </span>
              <span>
                Failed:{" "}
                <span className="text-red-600 font-bold">
                  {progress.failed}
                </span>
              </span>
              <span>Total: {progress.total}</span>
            </div>
            {progress.currentEmail && (
              <p className="text-xs text-gray-500 mt-2 truncate">
                Processing: {progress.currentEmail}
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || parsedEmails.length === 0}
          className={`w-full font-black text-lg py-4 border-2 transition-all duration-300 ${
            isLoading || parsedEmails.length === 0
              ? "bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed"
              : "bg-black hover:bg-gray-800 text-white border-black"
          }`}
        >
          {isLoading ? "PROCESSING..." : "SEND EMAILS"}
        </button>
      </form>

      {alertState.show && (
        <Alert
          type={alertState.type}
          message={alertState.message}
          onClose={() => setAlertState({ ...alertState, show: false })}
          autoClose={true}
          duration={4000}
        />
      )}

      {emailResult && (
        <div className="bg-white text-black p-8 border-2 border-black space-y-4">
          <h2 className="text-2xl font-black mb-4">Send Report</h2>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 p-4 border border-green-200">
              <p className="text-sm text-green-700 font-bold">
                Successfully Sent
              </p>
              <p className="text-3xl font-black text-green-900">
                {emailResult.sent}
              </p>
            </div>
            <div className="bg-red-50 p-4 border border-red-200">
              <p className="text-sm text-red-700 font-bold">Failed</p>
              <p className="text-3xl font-black text-red-900">
                {emailResult.total - emailResult.sent}
              </p>
            </div>
          </div>

          {emailResult.successfulEmails &&
            emailResult.successfulEmails.length > 0 && (
              <div>
                <h3 className="font-bold text-lg mb-2 text-green-700">
                  Successful Recipients:
                </h3>
                <ul className="list-disc list-inside max-h-40 overflow-y-auto bg-gray-50 p-4 border border-gray-200 font-mono text-sm">
                  {emailResult.successfulEmails.map((email, idx) => (
                    <li key={idx} className="text-gray-700">
                      {email}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {emailResult.errors && emailResult.errors.length > 0 && (
            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2 text-red-700">Errors:</h3>
              <ul className="list-none max-h-40 overflow-y-auto bg-red-50 p-4 border border-red-200 text-sm">
                {emailResult.errors.map((err, idx) => (
                  <li key={idx} className="mb-2">
                    <span className="font-bold text-red-800">{err.email}</span>:{" "}
                    <span className="text-red-600">{err.error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainSendEmail;
