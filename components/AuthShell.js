"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LuBadgeCheck, LuGraduationCap, LuShieldCheck, LuSparkles } from "react-icons/lu";
import authImg from "@/public/images/auth-study.webp";

const perks = [
  [LuBadgeCheck, "Verified tutors only"],
  [LuShieldCheck, "Secure Stripe payments"],
  [LuSparkles, "Simple, transparent workflow"],
];

export default function AuthShell({ title, sub, children }) {
  return (
    <div className="hero-bg relative grid min-h-[calc(100vh-4rem)] place-items-center overflow-hidden px-4 py-12">
      <div className="grid-pattern absolute inset-0" />
      <span className="blob -left-16 top-10 size-72 bg-primary/30" />
      <span className="blob -right-16 bottom-0 size-80 bg-secondary/25 [animation-delay:-6s]" />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass relative grid w-full max-w-5xl overflow-hidden rounded-[1.75rem] border border-base-300 shadow-2xl shadow-primary/10 lg:grid-cols-2"
      >
        <div className="relative hidden min-h-144 lg:block">
          <Image src={authImg} alt="Student studying at a desk" fill placeholder="blur" sizes="512px" className="object-cover" />
          <div className="bg-brand absolute inset-0 opacity-70 mix-blend-multiply" />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-8 bottom-8 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/80">Learn · Teach · Grow</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight">Your learning journey starts here.</h2>
            <ul className="mt-5 space-y-2.5">
              {perks.map(([Icon, text], i) => (
                <li key={text} className="flex items-center gap-3 text-sm font-medium">
                  <span className="grid size-8 place-items-center rounded-lg bg-white/20 backdrop-blur">
                    <Icon className="icon-anim" style={{ animationDelay: `${i * 0.5}s` }} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-7 sm:p-10">
          <span className="bg-brand mx-auto mb-5 grid size-14 place-items-center rounded-2xl text-2xl text-white shadow-lg shadow-primary/30">
            <LuGraduationCap className="icon-anim" />
          </span>
          <h1 className="text-center text-2xl font-extrabold tracking-tight text-neutral sm:text-3xl">{title}</h1>
          <p className="section-sub mt-1 text-center text-sm">{sub}</p>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
