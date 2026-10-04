import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuBadgeCheck, LuHandshake, LuShieldCheck, LuSparkles, LuTarget } from "react-icons/lu";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";
import classroomImg from "@/public/images/about-classroom.webp";

export const metadata = { title: "About | E-TuitionBD" };

const points = [
  { Icon: LuTarget, title: "Our Mission", text: "Make it easy for every student in Bangladesh to find a qualified, verified tutor." },
  {
    Icon: LuHandshake,
    title: "How We Help",
    text: "Students post requirements, tutors apply, and admins review everything so the platform stays trustworthy.",
  },
  {
    Icon: LuShieldCheck,
    title: "Transparent Payments",
    text: "Payments run through Stripe and every transaction appears in a clear history for students, tutors and admins.",
  },
];

const values = ["Verified tutors and admin-reviewed posts", "Secure, server-verified Stripe payments", "Clear dashboards for every role"];

export default function AboutPage() {
  return (
    <>
      <section className="hero-bg relative overflow-hidden py-20 text-center">
        <div className="grid-pattern absolute inset-0" />
        <span className="blob -left-10 top-0 size-72 bg-primary/30" />
        <span className="blob -right-10 bottom-0 size-72 bg-secondary/25 [animation-delay:-6s]" />
        <Reveal className="relative mx-auto max-w-3xl px-4">
          <span className="eyebrow mb-4">
            <LuSparkles className="icon-anim" /> About us
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral sm:text-5xl">
            About <span className="text-gradient">E-TuitionBD</span>
          </h1>
          <p className="section-sub mt-4 text-lg">
            A complete tuition management platform connecting students, tutors and admins in one place.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <Reveal>
          <div className="group relative">
            <div className="bg-brand absolute -inset-3 rounded-[2.2rem] opacity-30 blur-2xl" />
            <div className="relative overflow-hidden rounded-4xl border-4 border-base-100 shadow-2xl">
              <Image
                src={classroomImg}
                alt="Teacher with students in a classroom"
                placeholder="blur"
                sizes="(min-width: 1024px) 560px, 100vw"
                className="img-zoom h-80 w-full object-cover sm:h-96"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="section-title">
            Learning made <span className="text-gradient">simple and safe</span>
          </h2>
          <p className="section-sub mt-4 leading-relaxed">
            Finding a good tutor should not depend on luck. E-TuitionBD brings students and tutors together on one trusted
            platform, with every post reviewed and every payment verified.
          </p>
          <ul className="mt-6 space-y-3">
            {values.map((v, i) => (
              <li key={v} className="flex items-center gap-3 font-medium text-neutral">
                <LuBadgeCheck className="icon-anim shrink-0 text-xl text-accent" style={{ animationDelay: `${i * 0.4}s` }} /> {v}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {points.map(({ Icon, title, text }, i) => (
            <StaggerItem key={title}>
              <div className="card-modern group h-full p-7">
                <span className="icon-tile size-12 text-xl group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="icon-anim" style={{ animationDelay: `${i * 0.5}s` }} />
                </span>
                <h2 className="mt-5 text-lg font-bold text-neutral">{title}</h2>
                <p className="section-sub mt-2 text-sm leading-relaxed">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 text-center">
          <Link href="/register" className="btn btn-primary shine group rounded-full px-7 shadow-lg shadow-primary/25">
            Join E-TuitionBD <LuArrowRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
