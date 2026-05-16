import React, {
  useState,
  type ReactEventHandler,
  type ReactHTMLElement,
} from "react";
import Alert from "../ui/Alert";

const MainSendEmail = () => {
  let [formData, setFormData] = useState({
    appName: "",
    appPassword: "",
    emailBody: "",
    subject: "",
    userEmail: "",
  });

  const [alertState, setAlertState] = useState<{
    show: boolean;
    type: "success" | "error" | "warning" | "info";
    message: string;
  }>({
    show: false,
    type: "info",
    message: "",
  });
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    let { name, value } = e.target;
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

    const fileInput = e.currentTarget.elements.namedItem(
      "fileInput",
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    const submitData = new FormData();
    submitData.append("appName", formData.appName);
    submitData.append("appPassword", formData.appPassword);
    submitData.append("userEmail", formData.userEmail);
    submitData.append("subject", formData.subject);
    submitData.append("emailBody", formData.emailBody);
    if (file) {
      submitData.append("file", file);
    }

    fetch("/api/send-emails", {
      method: "POST",
      body: submitData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        setAlertState({
          show: true,
          type: "success",
          message: "Emails sent successfully!",
        });
        setFormData({
          appName: "",
          appPassword: "",
          emailBody: "",
          subject: "",
          userEmail: "",
        });
        fileInput.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlertState({
          show: true,
          type: "error",
          message: "Error sending emails",
        });
      });
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
                />
                <label
                  htmlFor={item.id}
                  className="block bg-gray-50 border-4 border-dashed border-gray-300 p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer"
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
                    <p className="text-gray-600 text-sm">or click to browse</p>
                    <p className="text-gray-500 text-xs mt-2">{item.desc}</p>
                  </div>
                </label>
              </div>
            ) : item.isTextArea ? (
              <textarea
                id={item.id}
                name={item.name}
                onChange={handleOnChange}
                placeholder={item.placeholder}
                rows={4}
                className={inputStyles}
              />
            ) : (
              <input
                type={item.type}
                id={item.id}
                onChange={handleOnChange}
                name={item.name}
                placeholder={item.placeholder}
                className={inputStyles}
              />
            )}
            {!item.isFileUpload && (
              <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-800 text-white font-black text-lg py-4 border-2 border-black transition-all duration-300"
        >
          SEND EMAILS
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
    </div>
  );
};

export default MainSendEmail;
