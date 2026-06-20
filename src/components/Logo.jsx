function Logo({ variant = "default" }) {
  const isLight = variant === "light";

  return (
    <a href="/" className="flex items-center gap-2.5 shrink-0 group">
      <div className="leading-none">
        <span
          className={`block text-[22px] font-extrabold tracking-tight uppercase ${
            isLight ? "text-white" : "text-orange"
          }`}
        >
          GHAZI
        </span>
        <span
          className={`block text-[11px] font-semibold tracking-[0.12em] uppercase ${
            isLight ? "text-orange" : "text-orange"
          }`}
        >
          Restaurant
        </span>
      </div>
      <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange to-orange-dark shadow-md shadow-orange/25 ring-2 ring-orange/20 transition-transform group-hover:scale-105">
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 text-white"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 4c-1.5 3-4 5.5-4 9.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-2.5-6.5-4-9.5z" />
          <ellipse cx="16" cy="22" rx="8" ry="4" opacity="0.85" />
          <path
            d="M10 14c-2 1-3 3-3 5 0 3.3 2.7 6 6 6h10c3.3 0 6-2.7 6-6 0-2-1-4-3-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </a>
  );
}

export default Logo;
