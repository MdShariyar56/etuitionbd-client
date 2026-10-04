"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMagnifyingGlass, FaFilePen, FaUserCheck, FaCreditCard, FaShieldHalved, FaBolt, FaHeadset, FaCircleCheck, FaArrowRight,
} from "react-icons/fa6";
import TuitionCard from "@/components/TuitionCard";
import TutorCard from "@/components/TutorCard";
import Loading from "@/components/Loading";
import { useApi } from "@/lib/useApi";

const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0 } };

const steps = [
  { Icon: FaFilePen, title: "Post or Browse", text: "Students post a tuition requirement. Tutors browse approved tuitions that fit them." },
  { Icon: FaUserCheck, title: "Apply & Choose", text: "Tutors apply with qualifications and expected salary. Students review and accept the best fit." },
  { Icon: FaCreditCard, title: "Pay & Start", text: "Pay securely through Stripe. The tutor is confirmed only after the payment succeeds." },
];

const features = [
  { Icon: FaCircleCheck, title: "Verified Tutors", text: "Admins review tutors and tuition posts so only legitimate listings go live." },
  { Icon: FaShieldHalved, title: "Secure Payments", text: "Stripe-powered checkout with a transparent payment and revenue history." },
  { Icon: FaBolt, title: "Fast Matching", text: "Smart search, filters and sorting help you find the right match in minutes." },
  { Icon: FaHeadset, title: "Admin Oversight", text: "Admins monitor activity, handle disputes and keep the platform trustworthy." },
];

function Section({ title, sub, href, children }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="section-title">{title}</h2>
          <p className="section-sub mt-1">{sub}</p>
        </div>
        {href && (
          <Link href={href} className="btn btn-outline btn-primary btn-sm">
            View All <FaArrowRight />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [location, setLocation] = useState("");
  const tuitions = useApi("/tuitions?limit=4&sort=newest");
  const tutors = useApi("/tutors?limit=4");

  const search = (e) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (subject.trim()) sp.set("q", subject.trim());
    if (location.trim()) sp.set("location", location.trim());
    router.push(`/tuitions?${sp.toString()}`);
  };

  return (
    <>
      <section className="hero-bg overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}>
            <motion.span variants={fadeUp} className="badge badge-primary badge-soft mb-4 px-3 py-3 font-semibold">
              Learn · Teach · Grow
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl font-extrabold leading-tight tracking-tight text-neutral sm:text-5xl">
              Find the Right Tutor for a <span className="text-primary">Brighter Future</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="section-sub mt-4 max-w-lg text-lg">
              E-TuitionBD connects students with verified tutors, with secure payments and a simple workflow for better learning.
            </motion.p>
            <motion.form variants={fadeUp} onSubmit={search} className="mt-8 flex flex-col gap-2 rounded-box border border-base-300 bg-base-100 p-2 shadow-md sm:flex-row">
              <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject (e.g. Math)" className="input input-ghost flex-1 focus:outline-none" />
              <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (e.g. Mirpur)" className="input input-ghost flex-1 focus:outline-none" />
              <button className="btn btn-primary">
                <FaMagnifyingGlass /> Search
              </button>
            </motion.form>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <Link href="/register" className="btn btn-primary">Get Started</Link>
              <Link href="/tutors" className="btn btn-outline btn-primary">Browse Tutors</Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="rounded-3xl bg-primary p-8 text-primary-content shadow-2xl">
              <p className="text-sm uppercase tracking-widest text-white/70">Live on the platform</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-extrabold">{tutors.data?.total ?? "—"}</p>
                  <p className="text-sm text-white/75">Verified Tutors</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-3xl font-extrabold">{tuitions.data?.total ?? "—"}</p>
                  <p className="text-sm text-white/75">Open Tuitions</p>
                </div>
              </div>
              <p className="mt-6 flex items-center gap-2 text-sm text-white/85">
                <FaShieldHalved /> Payments protected by Stripe
              </p>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl border border-base-300 bg-base-100 p-3 shadow-lg"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-secondary/20 text-secondary"><FaUserCheck /></span>
              <span className="text-sm font-bold text-neutral">Tutor approved!</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Section title="Latest Tuition Posts" sub="Freshly approved tuitions looking for tutors." href="/tuitions">
        {tuitions.loading ? <Loading fullScreen={false} /> : tuitions.data?.items?.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tuitions.data.items.map((t) => <TuitionCard key={t._id} tuition={t} />)}
          </div>
        ) : <p className="rounded-box bg-base-200 p-8 text-center text-base-content/60">No tuition posts yet.</p>}
      </Section>

      <Section title="How the Platform Works" sub="Three simple steps from requirement to class.">
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map(({ Icon, title, text }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative rounded-box border border-base-300 bg-base-100 p-6 shadow-sm"
            >
              <span className="absolute right-5 top-4 text-5xl font-extrabold text-primary/10">0{i + 1}</span>
              <span className="grid size-12 place-items-center rounded-xl bg-primary text-primary-content"><Icon className="text-xl" /></span>
              <h3 className="mt-4 text-lg font-bold text-neutral">{title}</h3>
              <p className="section-sub mt-1 text-sm">{text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section title="Latest Tutors" sub="Meet tutors who recently joined E-TuitionBD." href="/tutors">
        {tutors.loading ? <Loading fullScreen={false} /> : tutors.data?.items?.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tutors.data.items.map((t) => <TutorCard key={t._id} tutor={t} />)}
          </div>
        ) : <p className="rounded-box bg-base-200 p-8 text-center text-base-content/60">No tutors yet.</p>}
      </Section>

      <div className="bg-base-200">
        <Section title="Why Choose Us" sub="Built to make tuition simple, safe and transparent.">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ Icon, title, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-box bg-base-100 p-6 shadow-sm"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent"><Icon className="text-xl" /></span>
                <h3 className="mt-4 font-bold text-neutral">{title}</h3>
                <p className="section-sub mt-1 text-sm">{text}</p>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}
