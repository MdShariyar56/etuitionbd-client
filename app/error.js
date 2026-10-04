"use client";

import Link from "next/link";
import { FaArrowRotateRight, FaHouse, FaTriangleExclamation } from "react-icons/fa6";
import ErrorScreen from "@/components/ErrorScreen";

export default function Error({ reset }) {
  return (
    <ErrorScreen
      code="500"
      icon={FaTriangleExclamation}
      title="Something went wrong"
      message="We hit an unexpected problem while loading this page. Please try again, or head back home."
    >
      <button onClick={() => reset()} className="btn btn-primary">
        <FaArrowRotateRight /> Try Again
      </button>
      <Link href="/" className="btn btn-outline btn-primary">
        <FaHouse /> Back to Home
      </Link>
    </ErrorScreen>
  );
}
