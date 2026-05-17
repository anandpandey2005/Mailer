import { MainSendEmail } from "../../components";
import { Megaphone, UserCheck, FileText, Mail, Zap, Lock } from "lucide-react";
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
            <button
              onClick={() => document.getElementById('get-started')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-bold transition-all duration-300 border-2 border-black"
            >
              Get Started
            </button>
            <button
              onClick={() => document.getElementById('learn-more')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white font-bold transition-all duration-300"
            >
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
              <FileText className="w-6 h-6 text-white" />
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
              <Mail className="w-6 h-6 text-white" />
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
              <Zap className="w-6 h-6 text-white" />
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

      {/* Privacy Guarantee Section */}
      <section id="learn-more" className="bg-[#ffeb3b] border-4 border-black p-12 md:p-16 text-center transform hover:-translate-y-1 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="w-20 h-20 bg-white border-4 border-black rounded-full flex items-center justify-center mx-auto mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Lock className="w-10 h-10 text-black" strokeWidth={3} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-black mb-8" style={{ fontFamily: "Georgia, serif" }}>
            100% Privacy Guarantee
          </h2>
          <p className="text-xl md:text-2xl text-black font-bold leading-relaxed mb-8">
            We are not storing any sensitive data. After you send your list of emails once, it all gets erased from our servers.
          </p>
          <div className="bg-white border-4 border-black p-6 inline-block shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-lg md:text-xl text-black font-black">
              So please don't worry about providing your email password. It will not get leaked—that's my guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="get-started" className="bg-black text-white border-4 border-black p-12 md:p-16">
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
      <section className="bg-white border-4 border-black p-8 md:p-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-black text-black mb-6"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Support This Open Source Project
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-lg text-black mb-12 leading-relaxed max-w-3xl mx-auto text-left md:text-center">
            This tool is 100% free and open-source. However, to take it live, we
            need your help! Free-tier cloud hosting blocks the critical SMTP
            ports required to send emails. Upgrading to a reliable production
            server costs <strong>$7/month</strong>.
            <br />
            <br />
            By sponsoring, you help unlock a powerful automation platform:
          </p>
          {/* Feature Highlight Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12 text-left">
            {/* Marketers & Brands Card */}
            <div className="border-2 border-black p-4 bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="font-black text-xl mb-2 flex items-center gap-2">
                <span className="p-1.5 bg-white border-2 border-black inline-flex items-center justify-center rounded-sm shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  <Megaphone className="w-5 h-5 text-black" strokeWidth={2.5} />
                </span>
                For Marketers & Brands
              </h3>
              <p className="text-sm text-gray-800">
                Upload a lead file, write your copy, and completely automate
                your email marketing and branding campaigns at scale without
                manual hassle.
              </p>
            </div>

            {/* Freshers & Job Seekers Card */}
            <div className="border-2 border-black p-4 bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <h3 className="font-black text-xl mb-2 flex items-center gap-2">
                <span className="p-1.5 bg-white border-2 border-black inline-flex items-center justify-center rounded-sm shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  <UserCheck className="w-5 h-5 text-black" strokeWidth={2.5} />
                </span>
                For Freshers & Job Seekers
              </h3>
              <p className="text-sm text-gray-800">
                Extract or upload curated lists of HR contacts, then blast your
                personalized resume and application messages directly to dozens
                of recruiters instantly.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            {/* GitHub Sponsor Widget Container */}
            <div className="relative border-4 border-black p-2 bg-white hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 w-full sm:w-[320px] md:w-[350px] overflow-hidden">
              <div className="w-full overflow-x-auto overflow-y-auto scrollbar-none flex justify-center items-center">
                <iframe
                  src="https://github.com/sponsors/anandpandey2005/card"
                  title="Sponsor anandpandey2005"
                  className="w-75 h-42 shrink-0"
                  style={{ border: 0 }}
                ></iframe>
              </div>
              <div className="absolute -bottom-1  left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 text-sm font-bold whitespace-nowrap border-2 border-black tracking-wide">
                Make Sponsored
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 w-full sm:w-[320px] md:w-[350px]">
              <a
                href="https://github.com/anandpandey2005/Mailer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-black text-white font-bold text-lg hover:shadow-[6px_6px_0px_0px_rgba(156,163,175,1)] transition-all duration-300 border-4 border-black"
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
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 border-4 border-black"
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
