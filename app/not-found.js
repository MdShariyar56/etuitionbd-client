import Link from "next/link";
import { LuCompass, LuHouse } from "react-icons/lu";
import Navbar from "@/components/Navbar";
import ErrorScreen from "@/components/ErrorScreen";

export const metadata = { title: "Page not found | E-TuitionBD" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <ErrorScreen
        code="404"
        icon={LuCompass}
        title="Page not found"
        message="Oops! The page you are looking for doesn't exist or may have been moved. Let's get you back on track."
      >
        <Link href="/" className="btn btn-primary">
          <LuHouse /> Back to Home
        </Link>
        <Link href="/tuitions" className="btn btn-outline btn-primary">
          Browse Tuitions
        </Link>
      </ErrorScreen>
    </>
  );
}
