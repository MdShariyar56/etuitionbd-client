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
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-base-300 bg-base-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <label htmlFor="dash-drawer" className="btn btn-ghost btn-square btn-sm lg:hidden" aria-label="Open sidebar">
              <FaBars />
            </label>
            <p className="font-bold capitalize text-neutral">{user.role} Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold leading-tight text-neutral">{user.name}</p>
              <p className="text-xs capitalize text-base-content/60">{user.role}</p>
            </div>
            <Avatar src={user.photoURL} name={user.name} />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="dash-drawer" className="drawer-overlay" aria-label="Close sidebar" />
        <aside className="flex min-h-full w-64 flex-col bg-neutral p-4 text-neutral-content">
          <div className="mb-6 px-2"><Logo light /></div>
          <ul className="menu w-full flex-1 gap-1 p-0">
            {items.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => (document.getElementById("dash-drawer").checked = false)}
                  className={`gap-3 rounded-lg py-2.5 ${isActive(href) ? "bg-primary font-semibold text-white" : "hover:bg-white/10"}`}
                >
                  <Icon /> {label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-white/10 pt-4">
            <Link href="/" className="btn btn-ghost btn-sm w-full justify-start gap-3 text-neutral-content"><FaHouse /> Back to Site</Link>
            <button onClick={logout} className="btn btn-ghost btn-sm w-full justify-start gap-3 text-neutral-content">
              <FaRightFromBracket /> Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
