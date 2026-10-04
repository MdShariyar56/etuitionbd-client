"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  FaBars, FaBookOpen, FaSquarePlus, FaUsers, FaCreditCard, FaUserGear, FaRightFromBracket, FaHouse,
  FaClipboardList, FaChalkboardUser, FaChartLine, FaFileInvoiceDollar, FaListCheck, FaUserCheck,
} from "react-icons/fa6";
import Avatar from "@/components/Avatar";
import Loading from "@/components/Loading";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { dashboardPath, useAuth } from "@/context/AuthContext";

const menus = {
  student: [
    { href: "/dashboard/student/my-tuitions", label: "My Tuitions", Icon: FaBookOpen },
    { href: "/dashboard/student/post-tuition", label: "Post New Tuition", Icon: FaSquarePlus },
    { href: "/dashboard/student/applied-tutors", label: "Applied Tutors", Icon: FaUserCheck },
    { href: "/dashboard/payments", label: "Payments", Icon: FaCreditCard },
    { href: "/dashboard/profile", label: "Profile Settings", Icon: FaUserGear },
  ],
  tutor: [
    { href: "/dashboard/tutor/applications", label: "My Applications", Icon: FaClipboardList },
    { href: "/dashboard/tutor/ongoing", label: "Ongoing Tuitions", Icon: FaChalkboardUser },
    { href: "/dashboard/payments", label: "Revenue History", Icon: FaCreditCard },
    { href: "/dashboard/profile", label: "Profile Settings", Icon: FaUserGear },
  ],
  admin: [
    { href: "/dashboard/admin", label: "Overview", Icon: FaChartLine },
    { href: "/dashboard/admin/users", label: "User Management", Icon: FaUsers },
    { href: "/dashboard/admin/tuitions", label: "Tuition Management", Icon: FaListCheck },
    { href: "/dashboard/admin/reports", label: "Reports & Analytics", Icon: FaFileInvoiceDollar },
    { href: "/dashboard/profile", label: "Profile Settings", Icon: FaUserGear },
  ],
};

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const segment = pathname.split("/")[2];
  const wrongRole = user && ["student", "tutor", "admin"].includes(segment) && segment !== user.role;

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    else if (wrongRole) router.replace(dashboardPath(user.role));
  }, [loading, user, wrongRole, pathname, router]);

  if (loading || !user || wrongRole) return <Loading />;

  const items = menus[user.role] || [];
  const isActive = (href) => (href === "/dashboard/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <div className="drawer lg:drawer-open">
      <input id="dash-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex min-h-screen flex-col bg-base-200">
        <header className="glass sticky top-0 z-30 flex items-center justify-between border-b border-base-300/70 px-4 py-3">
          <div className="flex items-center gap-2">
            <label htmlFor="dash-drawer" className="btn btn-ghost btn-square btn-sm lg:hidden" aria-label="Open sidebar">
              <FaBars />
            </label>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-base-content/50">Welcome back</p>
              <p className="font-extrabold capitalize leading-tight text-neutral">{user.role} Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold leading-tight text-neutral">{user.name}</p>
              <p className="text-xs capitalize text-base-content/60">{user.role}</p>
            </div>
            <Avatar src={user.photoURL} name={user.name} className="ring-2 ring-primary/30" />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="dash-drawer" className="drawer-overlay" aria-label="Close sidebar" />
        <aside className="sidebar-surface flex min-h-full w-68 flex-col p-4">
          <div className="mb-6 px-2"><Logo light /></div>
          <ul className="menu w-full flex-1 gap-1 p-0">
            {items.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => (document.getElementById("dash-drawer").checked = false)}
                  className={`gap-3 rounded-xl py-2.5 transition-all duration-200 ${
                    isActive(href)
                      ? "bg-brand font-semibold text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-400 hover:translate-x-1 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon /> {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
            <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <Avatar src={user.photoURL} name={user.name} size="size-9" />
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{user.name}</p>
                <p className="truncate text-xs capitalize text-slate-400">{user.role}</p>
              </div>
            </div>
            <Link href="/" className="btn btn-ghost btn-sm w-full justify-start gap-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white"><FaHouse /> Back to Site</Link>
            <button onClick={logout} className="btn btn-ghost btn-sm w-full justify-start gap-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white">
              <FaRightFromBracket /> Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
