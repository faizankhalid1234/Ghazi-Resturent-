import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Logo from "./Logo";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Offers", href: "/offers" },
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
];

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaWhatsapp, href: "https://wa.me/", label: "WhatsApp" },
];

function Footer() {
  return (
    <footer className="mt-16 bg-navy text-white">
      <div className="mx-auto max-w-[1320px] px-4 py-14 md:px-5 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              مطعم غازي — Authentic Saudi & Arabic cuisine. Fresh platters, rice
              deals, and family meals delivered to your door.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm transition hover:bg-orange hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-orange"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange">
              Contact Info
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>Riyadh, Saudi Arabia</li>
              <li>
                <a href="tel:+966500000000" className="hover:text-orange">
                  +966 50 000 0000
                </a>
              </li>
              <li>
                <a href="mailto:info@ghazirestaurant.com" className="hover:text-orange">
                  info@ghazirestaurant.com
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-orange">
              Working Hours
            </h3>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li className="flex justify-between gap-4">
                <span>Sun – Thu</span>
                <span>11:00 AM – 12:00 AM</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Fri – Sat</span>
                <span>1:00 PM – 1:00 AM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} GHAZI RESTAURANT — مطعم غازي. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
