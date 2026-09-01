import { EXPERIENCE } from '../data/experience';

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[var(--cream)] pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12 max-w-2xl lg:mb-16">
          <div className="mb-6 flex max-w-xl items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              07 — Experience
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--gold)]">
              2022 — now
            </p>
          </div>
          <h2 className="font-serif text-[2.6rem] leading-[0.95] tracking-tight text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Roles
            <br />
            <em>I&apos;ve held.</em>
          </h2>
          <p className="mt-8 max-w-xl text-[1.15rem] leading-[1.65] text-[var(--ink)] sm:text-xl">
            From internships to leading a team of seven — the work, not the
            titles.
          </p>
        </header>

        <ol>
          {EXPERIENCE.map((item) => (
            <li
              key={item.company}
              className="grid grid-cols-12 gap-x-6 gap-y-3 border-t border-[var(--line)] py-10 sm:py-12"
            >
              <div className="col-span-12 sm:col-span-4 lg:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--gold)]">
                  {item.kicker}
                </p>
                <p className="mt-3 font-serif text-2xl leading-snug tracking-tight text-[var(--ink)] sm:text-3xl">
                  {item.duration}
                </p>
              </div>

              <div className="col-span-12 sm:col-span-8 lg:col-span-9">
                <h3 className="font-serif text-3xl tracking-tight text-[var(--ink)] sm:text-4xl">
                  {item.company}
                </h3>
                <p className="mt-2 text-[1.05rem] text-zinc-600">{item.role}</p>
                <ul className="mt-6 max-w-2xl space-y-2.5">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="grid grid-cols-[0.7rem_1fr] gap-2 text-[0.98rem] leading-relaxed text-[var(--ink-soft)]"
                    >
                      <span className="mt-2 block h-1 w-1 rounded-full bg-[var(--gold)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                {item.technologies?.length ? (
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    {item.technologies.join(' · ')}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
