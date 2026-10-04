export default function ErrorScreen({ code, title, message, icon: Icon, children }) {
  return (
    <main className="hero-bg relative grid flex-1 place-items-center overflow-hidden px-4 py-20 text-center">
      <span className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-accent/15 blur-3xl" />
      <span className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-secondary/20 blur-3xl" />
      <div className="relative">
        <div className="err-float mx-auto mb-5 grid size-20 place-items-center rounded-3xl bg-primary text-4xl text-primary-content shadow-xl shadow-primary/30">
          <Icon />
        </div>
        <p className="bg-gradient-to-r from-primary to-accent bg-clip-text text-8xl font-black leading-none text-transparent sm:text-9xl">
          {code}
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-neutral">{title}</h1>
        <p className="section-sub mx-auto mt-3 max-w-md">{message}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </main>
  );
}
