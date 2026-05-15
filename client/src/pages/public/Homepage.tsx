import React, { useState } from "react";

export default function Homepage() {
  const [formData, setFormData] = useState({
    userEmail: "",
    appName: "",
    appPassword: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleInputChange2 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (
      !formData.userEmail ||
      !formData.appName ||
      !formData.appPassword ||
      !uploadedFile
    ) {
      alert("Please fill in all fields and upload a file");
      return;
    }
    console.log("Form Data:", { ...formData, file: uploadedFile.name });
    alert("Ready to send emails! Check console for details.");
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-4 border-black p-12 md:p-16">
        <div className="relative z-10 text-center border-b-4 border-black pb-12 mb-12">
          <h1
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Smart Email Marketing
          </h1>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-black max-w-2xl mx-auto mb-8 leading-relaxed">
            Parse PDF & Excel files, extract email addresses, and send
            personalized campaigns using custom templates in seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border-2 border-black">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white font-bold transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <div className="group relative overflow-hidden bg-white border-2 border-black p-8 hover:bg-gray-50 transition-all duration-300">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-black flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
              </svg>
            </div>
            <h3
              className="text-xl font-black text-black mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Parse Files
            </h3>
            <p className="text-black leading-relaxed">
              Upload PDF or Excel files and instantly extract all email
              addresses with precision.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="group relative overflow-hidden bg-white border-2 border-black p-8 hover:bg-gray-50 transition-all duration-300">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-black flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
            </div>
            <h3
              className="text-xl font-black text-black mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Send Emails
            </h3>
            <p className="text-black leading-relaxed">
              Send bulk emails to all extracted recipients using your custom
              email templates.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="group relative overflow-hidden bg-white border-2 border-black p-8 hover:bg-gray-50 transition-all duration-300">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-black flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 17v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <h3
              className="text-xl font-black text-black mb-2"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Fast & Reliable
            </h3>
            <p className="text-black leading-relaxed">
              Lightning-fast processing with reliable delivery tracking and
              detailed reports.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="bg-black text-white border-4 border-black p-12 md:p-16">
        <div className="text-center mb-12 border-b-2 border-white pb-8">
          <h2
            className="text-4xl font-black text-white mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Ready to Get Started?
          </h2>
          <p className="text-white text-lg">
            Configure your email settings and upload your file to begin sending
            emails
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Form Section */}
          <div className="bg-white text-black p-8 space-y-6">
            {/* App Name */}
            <div>
              <label className="block font-bold mb-3 text-lg">App Name</label>
              <input
                type="text"
                name="appName"
                value={formData.appName}
                onChange={handleInputChange}
                placeholder="My Email Campaign"
                className="w-full px-4 py-3 border-2  focus:border-black outline-none transition-colors font-mono"
              />
              <p className="text-gray-400 text-sm mt-2">
                Name of your application or campaign
              </p>
            </div>

            {/* Google App Password */}
            <div>
              <label className="block font-bold mb-3 text-lg">
                Google App Password
              </label>
              <input
                type="text"
                name="appPassword"
                value={formData.appPassword}
                onChange={handleInputChange}
                placeholder="Your 16-character app password"
                className="w-full px-4 py-3 border-2  focus:border-black outline-none transition-colors font-mono"
              />
              <p className="text-gray-400 text-sm mt-2">
                Get this from your Google Account → Security → App passwords
              </p>
            </div>

            {/* User Email */}
            <div>
              <label className="block font-bold mb-3 text-lg">
                Email Address
              </label>
              <input
                type="email"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="your-email@gmail.com"
                className="w-full px-4 py-3 border-2  focus:border-black outline-none transition-colors font-mono"
              />
              <p className="text-gray-400 text-sm mt-2">
                The email address from which to send the emails
              </p>
            </div>

            {/* email subject*/}
            <div>
              <label className="block font-bold mb-3 text-lg">
                Subject of your Email
              </label>
              <input
                type="text"
                name="subject"
                value={formData.appPassword}
                onChange={handleInputChange}
                placeholder="Greeting"
                className="w-full px-4 py-3 border-2  focus:border-black outline-none transition-colors font-mono"
              />
              <p className="text-gray-400 text-sm mt-2">
                Write your Subject for the email
              </p>
            </div>

            {/* Body of the Email*/}
            <div>
              <label className="block font-bold mb-3 text-lg">
                Body of your Email
              </label>
              <textarea
                id="emailBody"
                name="emailBody"
                value={formData.appPassword}
                onChange={handleInputChange2}
                placeholder="<h1>hello<h1>"
                className="w-full px-4 py-3 border-2  focus:border-black outline-none transition-colors font-mono"
              ></textarea>
              <p className="text-gray-400 text-sm mt-2">
                You can use given tempate or else put HTML for email body
              </p>
            </div>

            {/* File Upload */}
            <div>
              <label className="block  font-bold mb-3 text-lg">
                Upload File
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  accept=".pdf,.xlsx,.csv"
                  className="hidden"
                />
                <label
                  htmlFor="fileInput"
                  className="block bg-white border-4 border-dashed border-white p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer"
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
                    ></path>
                  </svg>
                  <div>
                    <p className="text-xl font-black text-black mb-1">
                      {uploadedFile ? uploadedFile.name : "Drop files here"}
                    </p>
                    <p className="text-gray-600 text-sm">or click to browse</p>
                    <p className="text-gray-500 text-xs mt-2">
                      Supported: PDF, XLSX, CSV
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-white hover:bg-gray-200 text-black font-black text-lg py-4 border-2 border-white transition-all duration-300"
            >
              SEND EMAILS
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
