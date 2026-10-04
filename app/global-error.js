"use client";

import "./globals.css";
import { LuRotateCw, LuTriangleAlert } from "react-icons/lu";
import ErrorScreen from "@/components/ErrorScreen";

export default function GlobalError({ reset }) {
  return (
    <html lang="en" data-theme="etuition">
      <body className="flex min-h-screen flex-col">
        <ErrorScreen
          code="500"
          icon={LuTriangleAlert}
          title="Something went wrong"
          message="The application ran into a serious problem. Please reload the page."
        >
          <button onClick={() => reset()} className="btn btn-primary">
            <LuRotateCw /> Reload
          </button>
        </ErrorScreen>
      </body>
    </html>
  );
}
