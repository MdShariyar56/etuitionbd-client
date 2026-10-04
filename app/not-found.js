import Link from "next/link";
import { FaCompass, FaHouse } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import ErrorScreen from "@/components/ErrorScreen";

export const metadata = { title: "Page not found | E-TuitionBD" };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <ErrorScreen
        code="404"
        icon={FaCompass}
        title="Page not found"
        message="Oops! The page you are looking for doesn't exist or may have been moved. Let's get you back on track."
      >
        <Link href="/" className="btn btn-primary">
          <FaHouse /> Back to Home
        </Link>
        <Link href="/tuitions" className="btn btn-outline btn-primary">
          Browse Tuitions
        </Link>
      </ErrorScreen>
    </>
  );
}
