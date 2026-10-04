import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube, FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";
import Logo from "./Logo";

const social = [
  { Icon: FaFacebookF, label: "Facebook", href: "https://facebook.com" },
  { Icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: FaXTwitter, label: "X", href: "https://x.com" },
  { Icon: FaYoutube, label: "YouTube", href: "https://youtube.com" },
];

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light tagline />
          <p className="text-sm leading-relaxed text-neutral-content/75">
            E-TuitionBD is a modern tuition management platform that connects students with verified tutors,
            with transparent payments and structured communication.
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-neutral-content/75">
            {[["Home", "/"], ["Tuitions", "/tuitions"], ["Tutors", "/tutors"], ["About", "/about"], ["Contact", "/contact"]].map(([l, h]) => (
              <li key={h}>
                <Link href={h} className="transition hover:text-white">{l}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-white">Contact Info</h4>
          <ul className="space-y-3 text-sm text-neutral-content/75">
            <li className="flex items-start gap-2.5"><FaLocationDot className="mt-0.5 shrink-0" /> Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2.5"><FaPhone className="shrink-0" /> +880 1700 000000</li>
            <li className="flex items-center gap-2.5"><FaEnvelope className="shrink-0" /> support@etuitionbd.com</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-bold text-white">Follow Us</h4>
          <div className="flex gap-3">
            {social.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-accent"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-neutral-content/60">
        © {new Date().getFullYear()} E-TuitionBD. All rights reserved.
      </div>
    </footer>
  );
}
