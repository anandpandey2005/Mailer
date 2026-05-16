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
    </div>
  );
}
