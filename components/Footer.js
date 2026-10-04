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

const quick = [
  ["Home", "/"],
  ["Tuitions", "/tuitions"],
  ["Tutors", "/tutors"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="footer-surface relative mt-10">
      <div className="bg-brand absolute inset-x-0 top-0 h-px opacity-70" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo light tagline />
          <p className="text-sm leading-relaxed text-slate-400">
            E-TuitionBD is a modern tuition management platform that connects students with verified tutors, with
            transparent payments and structured communication.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {quick.map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="inline-flex items-center gap-2 text-slate-400 transition hover:translate-x-1 hover:text-white">
                  <span className="size-1.5 rounded-full bg-indigo-400" /> {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Contact Info</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <FaLocationDot className="mt-0.5 shrink-0 text-indigo-400" /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="shrink-0 text-indigo-400" /> +880 1700 000000
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="shrink-0 text-indigo-400" /> support@etuitionbd.com
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">Follow Us</h4>
          <p className="mb-4 text-sm text-slate-400">Stay updated with new tuitions and tutors.</p>
          <div className="flex flex-wrap gap-3">
            {social.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/30"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} E-TuitionBD. All rights reserved.
      </div>
    </footer>
  );
}
