"use client";

import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa6";

export default function AuthShell({ title, sub, wide = false, children }) {
  return (
    <div className="hero-bg relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden px-4 py-14">
      <div className="grid-pattern absolute inset-0" />
      <span className="blob -left-16 top-10 size-72 bg-primary/35" />
      <span className="blob -right-16 bottom-0 size-80 bg-accent/25 [animation-delay:-6s]" />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className={`glass relative w-full ${wide ? "max-w-lg" : "max-w-md"} rounded-[1.75rem] border border-base-300 p-7 shadow-2xl shadow-primary/10 sm:p-10`}
      >
        <span className="bg-brand mx-auto mb-5 grid size-14 place-items-center rounded-2xl text-2xl text-white shadow-lg shadow-primary/30">
          <FaGraduationCap />
        </span>
        <h1 className="text-center text-2xl font-extrabold tracking-tight text-neutral sm:text-3xl">{title}</h1>
        <p className="section-sub mt-1 text-center text-sm">{sub}</p>
        {children}
      </motion.div>
    </div>
  );
}
