"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars } from "react-icons/fa6";
import Logo from "./Logo";
import Avatar from "./Avatar";
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

  const items = links.map((l) => {
    const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
    return (
      <li key={l.href}>
        <Link href={l.href} className={active ? "font-bold text-primary" : "font-medium"}>
          {l.label}
        </Link>
      </li>
    );
  });

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost btn-square lg:hidden" aria-label="Open menu">
              <FaBars />
            </button>
            <ul tabIndex={0} className="menu dropdown-content z-10 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
              {items}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">{items}</ul>
        </div>
        <div className="navbar-end gap-2">
          {loading ? (
            <span className="loading loading-dots loading-sm text-primary" />
          ) : user ? (
            <>
              <Link href={dashboardPath(user.role)} className="btn btn-primary btn-sm hidden sm:inline-flex">
                Dashboard
              </Link>
              <div className="dropdown dropdown-end">
                <button tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="Profile menu">
                  <Avatar src={user.photoURL} name={user.name} />
                </button>
                <ul tabIndex={0} className="menu dropdown-content z-10 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                  <li className="menu-title normal-case">
                    <span className="block truncate font-bold text-neutral">{user.name}</span>
                    <span className="block truncate text-xs font-normal capitalize">{user.role}</span>
                  </li>
                  <li>
                    <Link href={dashboardPath(user.role)}>Dashboard</Link>
                  </li>
                  <li>
                    <Link href="/dashboard/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={logout} className="text-error">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
