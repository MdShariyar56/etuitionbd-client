"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { LuLayoutDashboard, LuLogOut, LuMenu, LuUserCog } from "react-icons/lu";
import Logo from "./Logo";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";
import { dashboardPath, useAuth } from "@/context/AuthContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/tuitions", label: "Tuitions" },
  { href: "/tutors", label: "Tutors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.3 });

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="glass sticky top-0 z-50 border-b border-base-300/70">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-1">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-square btn-sm" aria-label="Open menu">
              <LuMenu className="text-lg" />
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-10 mt-3 w-60 gap-1 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={isActive(l.href) ? "bg-primary/10 font-bold text-primary" : "font-medium"}>
                    {l.label}
                  </Link>
                </li>
              ))}
              {!loading && !user && (
                <>
                  <li className="my-1 border-t border-base-300" />
                  <li>
                    <Link href="/login" className="font-medium">Login</Link>
                  </li>
                  <li>
                    <Link href="/register" className="font-medium text-primary">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Logo />
        </div>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`relative block rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    active ? "text-primary" : "text-base-content/70 hover:text-neutral"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/20"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {loading ? (
            <span className="loading loading-dots loading-sm text-primary" />
          ) : user ? (
            <>
              <Link href={dashboardPath(user.role)} className="btn btn-primary btn-sm hidden rounded-full sm:inline-flex">
                <LuLayoutDashboard /> Dashboard
              </Link>
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="Profile menu">
                  <Avatar src={user.photoURL} name={user.name} className="ring-2 ring-primary/30" />
                </button>
                <ul tabIndex={0} className="menu dropdown-content z-10 mt-3 w-60 gap-1 rounded-box border border-base-300 bg-base-100 p-2 shadow-xl">
                  <li className="pointer-events-none mb-1 border-b border-base-300 px-3 pb-3 pt-2">
                    <span className="block truncate p-0 font-bold text-neutral">{user.name}</span>
                    <span className="block truncate p-0 text-xs capitalize text-base-content/60">{user.role}</span>
                  </li>
                  <li>
                    <Link href={dashboardPath(user.role)}>
                      <LuLayoutDashboard /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard/profile">
                      <LuUserCog /> Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={logout} className="text-error">
                      <LuLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm hidden rounded-full sm:inline-flex">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm shine rounded-full shadow-lg shadow-primary/25">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      <motion.div style={{ scaleX: progress }} className="bg-brand absolute bottom-0 left-0 h-0.5 w-full origin-left" />
    </header>
  );
}
