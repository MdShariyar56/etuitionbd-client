import Link from "next/link";
import { FaArrowRight, FaBullseye, FaHandshake, FaShieldHalved } from "react-icons/fa6";
import Reveal, { Stagger, StaggerItem } from "@/components/Reveal";

export const metadata = { title: "About | E-TuitionBD" };

const points = [
  { Icon: FaBullseye, title: "Our Mission", text: "Make it easy for every student in Bangladesh to find a qualified, verified tutor." },
  {
    Icon: FaHandshake,
    title: "How We Help",
    text: "Students post requirements, tutors apply, and admins review everything so the platform stays trustworthy.",
  },
  {
    Icon: FaShieldHalved,
    title: "Transparent Payments",
    text: "Payments run through Stripe and every transaction appears in a clear history for students, tutors and admins.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="hero-bg relative overflow-hidden py-20 text-center">
        <div className="grid-pattern absolute inset-0" />
        <span className="blob -left-10 top-0 size-72 bg-primary/30" />
        <span className="blob -right-10 bottom-0 size-72 bg-accent/25 [animation-delay:-6s]" />
        <Reveal className="relative mx-auto max-w-3xl px-4">
          <span className="eyebrow mb-4">About us</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-neutral sm:text-5xl">
            About <span className="text-gradient">E-TuitionBD</span>
          </h1>
          <p className="section-sub mt-4 text-lg">
            A complete tuition management platform connecting students, tutors and admins in one place.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {points.map(({ Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="card-modern group h-full p-7">
                <span className="icon-tile size-12 text-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon />
                </span>
                <h2 className="mt-5 text-lg font-bold text-neutral">{title}</h2>
                <p className="section-sub mt-2 text-sm leading-relaxed">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-12 text-center">
          <Link href="/register" className="btn btn-primary shine rounded-full px-7 shadow-lg shadow-primary/25">
            Join E-TuitionBD <FaArrowRight />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
