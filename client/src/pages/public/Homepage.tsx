import { MainSendEmail } from "../../components";

export default function Homepage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-4 border-black p-12 md:p-16">
        <div className="relative z-10 text-center border-b-4 border-black pb-12 mb-12">
          <h1
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-black"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Mass Email Send
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
        <MainSendEmail></MainSendEmail>
      </section>

      {/* Sponsorship & Open Source Section */}
      <section className="bg-white border-4 border-black p-12 md:p-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-black text-black mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Support This Open Source Project
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-lg text-black mb-12 leading-relaxed">
            This tool is 100% free and open source. If you find it useful for
            your campaigns, consider sponsoring the development by scanning the
            QR code below, or check out the code on GitHub!
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            {/* QR Code */}
            <div className="border-4 border-black p-4 bg-white hover:bg-gray-50 transition-colors duration-300 w-64 h-64 shrink-0 relative">
              <img
                src="/makeSponser.jpeg"
                alt="Sponsorship QR Code"
                className="w-full h-full object-contain"
              />
              <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 font-bold whitespace-nowrap border-2 border-black">
                Scan to Donate
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4 w-full md:w-auto">
              <a
                href="https://github.com/anandpandey2005/Mailer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-bold text-lg hover:bg-gray-800 transition-all duration-300 border-4 border-black"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Star on GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/anandpandey2005/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg hover:bg-gray-50 transition-all duration-300 border-4 border-black"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
