import { Link } from "react-router-dom";
import Logo from "./Logo";

function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-[calc(100vh-90px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-[440px]">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="rounded-[22px] border border-gray-border bg-white p-7 shadow-[0_8px_32px_rgba(26,35,64,0.08)] sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-[24px] font-bold text-navy">{title}</h1>
            {subtitle && (
              <p className="mt-2 text-sm text-gray-muted">{subtitle}</p>
            )}
          </div>

          {children}
        </div>

        {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
      </div>
    </div>
  );
}

export function AuthLink({ to, children }) {
  return (
    <Link to={to} className="font-semibold text-orange transition hover:text-orange-dark">
      {children}
    </Link>
  );
}

export default AuthLayout;
