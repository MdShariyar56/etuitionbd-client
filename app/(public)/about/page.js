import Link from "next/link";

export const metadata = { title: "About | E-TuitionBD" };

const points = [
  ["Our Mission", "Make it easy for every student in Bangladesh to find a qualified, verified tutor."],
  ["How We Help", "Students post requirements, tutors apply, and admins review everything so the platform stays trustworthy."],
  ["Transparent Payments", "Payments run through Stripe and every transaction appears in a clear history for students, tutors and admins."],
];

export default function AboutPage() {
  return (
    <>
      <section className="hero-bg py-16 text-center">
        <div className="mx-auto max-w-3xl px-4">
          <h1 className="text-4xl font-extrabold text-neutral">About E-TuitionBD</h1>
          <p className="section-sub mt-3 text-lg">
            A complete tuition management platform connecting students, tutors and admins in one place.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-14 md:grid-cols-3">
        {points.map(([t, d]) => (
          <div key={t} className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-primary">{t}</h2>
            <p className="section-sub mt-2 text-sm leading-relaxed">{d}</p>
          </div>
        ))}
      </section>
      <div className="pb-16 text-center">
        <Link href="/register" className="btn btn-primary">Join E-TuitionBD</Link>
      </div>
    </>
  );
}
