"use client";

import Link from "next/link";
import { LuHouse, LuRotateCw, LuTriangleAlert } from "react-icons/lu";
import ErrorScreen from "@/components/ErrorScreen";

export default function Error({ reset }) {
  return (
    <ErrorScreen
      code="500"
      icon={LuTriangleAlert}
      title="Something went wrong"
      message="We hit an unexpected problem while loading this page. Please try again, or head back home."
    >
      <button onClick={() => reset()} className="btn btn-primary">
        <LuRotateCw /> Try Again
      </button>
      <Link href="/" className="btn btn-outline btn-primary">
        <LuHouse /> Back to Home
      </Link>
    </ErrorScreen>
  );
}
