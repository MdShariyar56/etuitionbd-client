"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaLocationDot, FaPhone, FaEnvelope } from "react-icons/fa6";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    toast.success("Thanks! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  const info = [
    [FaLocationDot, "Address", "Dhaka, Bangladesh"],
    [FaEnvelope, "Email", "support@etuitionbd.com"],
    [FaPhone, "Phone", "+880 1700 000000"],
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="section-title text-center">Get In Touch</h1>
      <p className="section-sub mt-1 text-center">We&apos;d love to hear from you. Feel free to reach out!</p>
      <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {info.map(([Icon, label, value]) => (
            <div key={label} className="flex items-center gap-4 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm">
              <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon /></span>
              <div>
                <p className="text-sm text-base-content/60">{label}</p>
                <p className="font-semibold text-neutral">{value}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="space-y-4 rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
          <input required value={form.name} onChange={set("name")} placeholder="Name" className="input input-bordered w-full" />
          <input type="email" required value={form.email} onChange={set("email")} placeholder="Email" className="input input-bordered w-full" />
          <textarea required value={form.message} onChange={set("message")} placeholder="Message" rows={5} className="textarea textarea-bordered w-full" />
          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>
    </div>
  );
}
