import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="hero-bg grid flex-1 place-items-center px-4 py-20 text-center">
        <div>
          <p className="text-8xl font-black text-primary">404</p>
          <h1 className="mt-2 text-3xl font-extrabold text-neutral">Page Not Found</h1>
          <p className="section-sub mx-auto mt-2 max-w-md">
            Oops! The page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="btn btn-primary mt-8">Go Back Home</Link>
        </div>
      </main>
    </>
  );
}
