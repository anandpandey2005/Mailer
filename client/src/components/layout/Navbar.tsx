export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black mb-8">
      <div className="max-w-325 mx-auto px-3 py-4 flex justify-between items-center">
        <div
          className="text-4xl font-black tracking-tighter text-black hover:text-gray-700 transition-colors"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {import.meta.env.VITE_STORE_NAME}
        </div>

        <a
          href={`mailto:${import.meta.env.VITE_DEVELOPER_GMAIL}`}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-xs md:text-base font-bold text-black  pl-3">
            {import.meta.env.VITE_DEVELOPER_GMAIL}
          </span>
        </a>
      </div>
    </nav>
  );
}
