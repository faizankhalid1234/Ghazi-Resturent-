import { useState, useRef, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
];

function LanguageDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-[42px] items-center gap-2 rounded-full border border-gray-border bg-white px-4 text-sm font-medium text-navy shadow-sm transition hover:border-orange/30 hover:shadow-md"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-base leading-none">{selected.flag}</span>
        <span>{selected.label}</span>
        <IoChevronDown
          className={`h-4 w-4 text-gray-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 top-[calc(100%+8px)] z-50 min-w-[200px] overflow-hidden rounded-xl border border-gray-border bg-white py-1 shadow-lg"
        >
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                type="button"
                role="option"
                aria-selected={selected.code === lang.code}
                onClick={() => {
                  setSelected(lang);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition hover:bg-orange-light ${
                  selected.code === lang.code
                    ? "bg-orange-light text-orange"
                    : "text-navy"
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LanguageDropdown;
