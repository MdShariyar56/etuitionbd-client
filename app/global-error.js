"use client";

import "./globals.css";
import { FaArrowRotateRight, FaTriangleExclamation } from "react-icons/fa6";
import ErrorScreen from "@/components/ErrorScreen";

export default function GlobalError({ reset }) {
  return (
    <html lang="en" data-theme="etuition">
      <body className="flex min-h-screen flex-col">
        <ErrorScreen
          code="500"
          icon={FaTriangleExclamation}
          title="Something went wrong"
          message="The application ran into a serious problem. Please reload the page."
        >
          <button onClick={() => reset()} className="btn btn-primary">
            <FaArrowRotateRight /> Reload
          </button>
        </ErrorScreen>
      </body>
    </html>
  );
}
