"use client";

import { useState } from "react";
import { LuMail, LuMapPin, LuPhone, LuSend, LuSparkles } from "react-icons/lu";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import { alertSuccess } from "@/lib/alert";

const info = [
  [LuMapPin, "Address", "Dhaka, Bangladesh"],
  [LuMail, "Email", "support@etuitionbd.com"],
  [LuPhone, "Phone", "+880 1700 000000"],
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    alertSuccess("Message sent!", "Thanks for reaching out. We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="hero-bg relative overflow-hidden">
      <div className="grid-pattern absolute inset-0" />
      <span className="blob -right-16 top-10 size-72 bg-primary/30" />
      <div className="relative mx-auto max-w-5xl px-4 py-16">
        <Reveal className="text-center">
          <span className="eyebrow mb-4">
            <LuSparkles className="icon-anim" /> Contact
          </span>
          <h1 className="section-title">
            Get in <span className="text-gradient">touch</span>
          </h1>
          <p className="section-sub mt-2">We&apos;d love to hear from you. Feel free to reach out!</p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-[1fr_1.4fr]">
          <Stagger className="space-y-4">
            {info.map(([Icon, label, value], i) => (
              <StaggerItem key={label}>
                <div className="card-modern group flex items-center gap-4 p-5">
                  <span className="icon-tile size-12 text-lg transition-transform duration-300 group-hover:scale-110">
                    <Icon className="icon-anim" style={{ animationDelay: `${i * 0.5}s` }} />
                  </span>
                  <div>
                    <p className="text-sm text-base-content/60">{label}</p>
                    <p className="font-semibold text-neutral">{value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.15}>
            <form onSubmit={submit} className="glass space-y-4 rounded-3xl border border-base-300 p-7 shadow-xl shadow-primary/5">
              <input required value={form.name} onChange={set("name")} placeholder="Your name" className="input input-bordered w-full" />
              <input type="email" required value={form.email} onChange={set("email")} placeholder="Email address" className="input input-bordered w-full" />
              <textarea
                required
                value={form.message}
                onChange={set("message")}
                placeholder="How can we help?"
                rows={5}
                className="textarea textarea-bordered w-full"
              />
              <button className="btn btn-primary shine group w-full rounded-full shadow-lg shadow-primary/25">
                <LuSend className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /> Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
