"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  LuArrowRight, LuBadgeCheck, LuBookOpenCheck, LuCreditCard, LuFilePen, LuHeadset, LuMapPin, LuSearch,
  LuShieldCheck, LuSparkles, LuUserCheck, LuUsers, LuZap,
} from "react-icons/lu";
import TuitionCard from "@/components/TuitionCard";
import TutorCard from "@/components/TutorCard";
import Loading from "@/components/Loading";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { useApi } from "@/lib/useApi";
import heroImg from "@/public/images/hero-students.webp";
import ctaImg from "@/public/images/cta-sunset.webp";

const ease = [0.2, 0.8, 0.2, 1];
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } };

const steps = [
  { Icon: LuFilePen, title: "Post or Browse", text: "Students post a tuition requirement. Tutors browse approved tuitions that fit them." },
  { Icon: LuUserCheck, title: "Apply & Choose", text: "Tutors apply with qualifications and expected salary. Students review and accept the best fit." },
  { Icon: LuCreditCard, title: "Pay & Start", text: "Pay securely through Stripe. The tutor is confirmed only after the payment succeeds." },
];

const features = [
  { Icon: LuBadgeCheck, title: "Verified Tutors", text: "Admins review tutors and tuition posts so only legitimate listings go live." },
  { Icon: LuShieldCheck, title: "Secure Payments", text: "Stripe-powered checkout with a transparent payment and revenue history." },
  { Icon: LuZap, title: "Fast Matching", text: "Smart search, filters and sorting help you find the right match in minutes." },
  { Icon: LuHeadset, title: "Admin Oversight", text: "Admins monitor activity, handle disputes and keep the platform trustworthy." },
];

function Section({ eyebrow, title, sub, href, children }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
      <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <span className="eyebrow mb-3">
              <LuSparkles className="icon-anim" /> {eyebrow}
            </span>
          )}
          <h2 className="section-title">{title}</h2>
          <p className="section-sub mt-2 max-w-xl">{sub}</p>
        </div>
        {href && (
          <Link href={href} className="btn btn-outline btn-primary btn-sm group rounded-full">
            View All <LuArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </Reveal>
      {children}
    </section>
  );
}

function CardGrid({ state, empty, render }) {
  if (state.loading) return <Loading fullScreen={false} />;
  const items = state.data?.items || [];
  if (!items.length) {
    return <p className="rounded-box border border-dashed border-base-300 p-10 text-center text-base-content/60">{empty}</p>;
  }
  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <StaggerItem key={item._id} className={`h-full ${i >= 4 ? "hidden lg:block" : ""}`}>
          {render(item)}
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function IconTile({ Icon, delay = 0, size = "size-14 text-2xl" }) {
  return (
    <span className={`icon-tile ${size} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110`}>
      <Icon className="icon-anim" style={{ animationDelay: `${delay}s` }} />
    </span>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const tuitions = useApi("/tuitions?limit=8&sort=newest");
  const tutors = useApi("/tutors?limit=8");

  const search = (e) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (subject.trim()) sp.set("q", subject.trim());
    if (location.trim()) sp.set("location", location.trim());
    router.push(`/tuitions?${sp.toString()}`);
  };

  return (
    <>
      <section className="hero-bg relative overflow-hidden">
        <div className="grid-pattern absolute inset-0" />
        <span className="blob -left-20 top-20 size-72 bg-primary/35" />
        <span className="blob right-0 top-0 size-80 bg-secondary/30 [animation-delay:-5s]" />
        <span className="blob bottom-0 left-1/3 size-64 bg-accent/25 [animation-delay:-9s]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
          <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}>
            <motion.span variants={fadeUp} className="eyebrow mb-5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Learn · Teach · Grow
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl font-extrabold leading-[1.1] tracking-tight text-neutral sm:text-5xl lg:text-6xl">
              Find the right tutor for a <span className="text-gradient">brighter future</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="section-sub mt-5 max-w-lg text-lg">
              E-TuitionBD connects students with verified tutors, with secure payments and a simple workflow for better learning.
            </motion.p>

            <motion.form
              variants={fadeUp}
              onSubmit={search}
              className="glass mt-8 flex flex-col gap-2 rounded-2xl border border-base-300 p-2 shadow-xl shadow-primary/5 sm:flex-row"
            >
              <label className="flex flex-1 items-center gap-2 rounded-xl px-3">
                <LuSearch className="shrink-0 text-primary" />
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject (e.g. Math)"
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </label>
              <label className="flex flex-1 items-center gap-2 rounded-xl px-3 sm:border-l sm:border-base-300">
                <LuMapPin className="shrink-0 text-primary" />
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location (e.g. Dhaka)"
                  className="w-full bg-transparent py-3 text-sm outline-none"
                />
              </label>
              <button className="btn btn-primary shine rounded-xl px-6">Search</button>
            </motion.form>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <Link href="/register" className="btn btn-primary shine group rounded-full px-6 shadow-lg shadow-primary/30">
                Get Started <LuArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/tutors" className="btn btn-ghost rounded-full border border-base-300 px-6">
                Browse Tutors
              </Link>
            </motion.div>

            <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-base-content/70">
              {["Verified tutors", "Stripe-secured payments", "Admin-reviewed posts"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <LuBadgeCheck className="text-accent" /> {t}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="bg-brand absolute -inset-3 rounded-[2.4rem] opacity-40 blur-2xl" />
            <div className="relative overflow-hidden rounded-4xl border-4 border-base-100 shadow-2xl">
              <Image
                src={heroImg}
                alt="Students learning together"
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 512px, 100vw"
                className="h-80 w-full object-cover sm:h-112"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 grid grid-cols-2 gap-3">
                {[
                  [LuUsers, tutors.data?.total, "Verified Tutors"],
                  [LuBookOpenCheck, tuitions.data?.total, "Open Tuitions"],
                ].map(([Icon, value, label], i) => (
                  <div key={label} className="rounded-2xl border border-white/20 bg-white/15 p-3 text-white backdrop-blur-md">
                    <Icon className="icon-anim text-lg" style={{ animationDelay: `${i * 0.6}s` }} />
                    <p className="mt-1 text-3xl font-extrabold leading-none">{value ?? "—"}</p>
                    <p className="mt-1 text-xs text-white/85">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="glass absolute -left-3 top-8 flex items-center gap-3 rounded-2xl border border-base-300 p-3 pr-5 shadow-xl sm:-left-8"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-success/15 text-lg text-success">
                <LuUserCheck />
              </span>
              <span>
                <span className="block text-sm font-bold text-neutral">Tutor approved!</span>
                <span className="block text-xs text-base-content/60">Payment verified</span>
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="glass absolute -right-2 -top-5 flex items-center gap-2 rounded-2xl border border-base-300 px-4 py-3 shadow-xl sm:-right-6"
            >
              <LuShieldCheck className="text-lg text-primary" />
              <span className="text-sm font-bold text-neutral">Secured by Stripe</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section eyebrow="Fresh opportunities" title="Latest Tuition Posts" sub="Freshly approved tuitions looking for tutors." href="/tuitions">
        <CardGrid state={tuitions} empty="No tuition posts yet." render={(t) => <TuitionCard tuition={t} />} />
      </Section>

      <div className="relative bg-base-200">
        <Section eyebrow="Simple process" title="How the Platform Works" sub="Three simple steps from requirement to class.">
          <Stagger className="relative grid gap-6 md:grid-cols-3">
            <div className="bg-brand absolute left-[16%] right-[16%] top-12 hidden h-0.5 opacity-30 md:block" />
            {steps.map(({ Icon, title, text }, i) => (
              <StaggerItem key={title}>
                <div className="card-modern group relative h-full p-7 text-center">
                  <span className="relative mx-auto block w-fit">
                    <IconTile Icon={Icon} delay={i * 0.5} size="size-16 text-2xl" />
                    <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-secondary text-xs font-extrabold text-secondary-content ring-4 ring-base-100">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-neutral">{title}</h3>
                  <p className="section-sub mt-2 text-sm leading-relaxed">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      </div>

      <Section eyebrow="Meet the experts" title="Latest Tutors" sub="Meet tutors who recently joined E-TuitionBD." href="/tutors">
        <CardGrid state={tutors} empty="No tutors yet." render={(t) => <TutorCard tutor={t} />} />
      </Section>

      <div className="bg-base-200">
        <Section eyebrow="Why E-TuitionBD" title="Why Choose Us" sub="Built to make tuition simple, safe and transparent.">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ Icon, title, text }, i) => (
              <StaggerItem key={title}>
                <div className="card-modern group h-full p-6">
                  <IconTile Icon={Icon} delay={i * 0.4} size="size-12 text-xl" />
                  <h3 className="mt-5 font-bold text-neutral">{title}</h3>
                  <p className="section-sub mt-2 text-sm leading-relaxed">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-4xl px-6 py-16 text-center text-white shadow-2xl shadow-primary/20 sm:px-16">
            <Image src={ctaImg} alt="" fill placeholder="blur" sizes="(min-width: 1280px) 1248px, 100vw" className="object-cover" />
            <div className="bg-brand absolute inset-0 opacity-80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-black/30" />
            <div className="relative">
              <LuSparkles className="icon-anim mx-auto text-4xl text-amber-200" />
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to start learning?</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/90">
                Join E-TuitionBD today. Post your first tuition or apply as a tutor in just a few minutes.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/register" className="btn rounded-full border-0 bg-white px-7 text-primary shadow-lg hover:bg-white/90">
                  Create Free Account
                </Link>
                <Link href="/tuitions" className="btn btn-ghost rounded-full border border-white/50 px-7 text-white hover:bg-white/10">
                  Explore Tuitions
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
