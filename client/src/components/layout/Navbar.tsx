import { Mail } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky  max-w-350 mx-auto top-0 z-50 bg-white border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-325 mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="text-2xl md:text-4xl font-black tracking-tighter text-black hover:text-gray-700 transition-colors"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {import.meta.env.VITE_STORE_NAME || "Mailer"}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <a
            href={`mailto:${import.meta.env.VITE_DEVELOPER_GMAIL}`}
            className="flex items-center justify-center gap-2 cursor-pointer border-2 border-black bg-white hover:bg-black hover:text-white text-black p-2 md:px-4 md:py-1.5 transition-all duration-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            title={import.meta.env.VITE_DEVELOPER_GMAIL}
          >
            <Mail className="w-5 h-5" strokeWidth={2.5} />
            <span className="hidden lg:inline font-bold text-sm">
              {import.meta.env.VITE_DEVELOPER_GMAIL}
            </span>
          </a>
          <div className="flex items-center h-[32px] w-[114px]">
            <iframe
              src="https://github.com/sponsors/anandpandey2005/button"
              title="Sponsor anandpandey2005"
              height="32"
              width="114"
              style={{ border: 0, borderRadius: "6px" }}
            ></iframe>
          </div>
        </div>
      </div>
    </nav>
  );
}
