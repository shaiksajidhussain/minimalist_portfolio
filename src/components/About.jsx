const PHOTO =
  'https://res.cloudinary.com/dgus6y6lm/image/upload/v1766677763/Sajid_Professional_vncuym.png';

const STATS = [
  { value: '03', label: 'Years in' },
  { value: 'RN', label: 'Apps shipped' },
  { value: 'JS', label: 'End to end' },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-x-hidden bg-[var(--cream)] pt-24 sm:pt-28 lg:pt-32"
    >
      <div className="relative mx-auto grid max-w-6xl grid-cols-12 items-start gap-x-6 gap-y-10 px-5 sm:gap-x-10 sm:px-6">
        <div className="relative z-10 col-span-12 min-w-0 lg:col-span-6 lg:pb-28">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500 sm:text-[11px] sm:tracking-[0.2em]">
              02 — About
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--gold)] sm:text-[11px] sm:tracking-[0.16em]">
              Hyderabad · Remote
            </p>
          </div>
          <h2 className="font-serif text-[2.15rem] leading-[1.05] tracking-tight text-[var(--ink)] sm:text-6xl lg:text-7xl">
            Still building
            <br />
            <em>what&apos;s next.</em>
          </h2>
          <p className="mt-8 max-w-xl text-[1.05rem] leading-[1.7] break-words text-[var(--ink)] sm:text-xl sm:leading-[1.65]">
            Hello, I&apos;m Shaik Sajid Hussain. Three years across product and
            engineering — from SaaS platforms and learning systems to shipping
            React Native apps.
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed break-words text-zinc-500 sm:text-base">
            React, React Native, and Node.js — performance, clean UI, and
            architecture that scales.
          </p>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-2 border-t border-[var(--line)] pt-7 sm:gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <p className="font-serif text-3xl tracking-tight text-[var(--ink)] sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-[9px] uppercase leading-snug tracking-[0.1em] text-zinc-500 sm:text-[10px] sm:tracking-[0.16em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <figure className="about-portrait relative z-20 col-span-12 mx-auto w-full max-w-md min-w-0 lg:col-span-6 lg:mx-0 lg:mt-6 lg:max-w-[26rem] lg:justify-self-end">
          <div
            className="gold-plate pointer-events-none absolute inset-y-8 left-10 right-0 sm:-right-6 sm:left-12"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-[1.4rem] border-8 border-[var(--card)] shadow-[0_24px_60px_rgba(28,25,23,0.14)] sm:border-[10px]">
            <img
              src={PHOTO}
              alt="Shaik Sajid Hussain"
              className="aspect-[3/4] w-full object-cover object-top"
            />
          </div>
        </figure>
      </div>

      <div className="about-name-band relative z-[1] overflow-hidden px-2">
        <p
          className="about-name select-none text-center font-serif leading-none text-[var(--ink)]"
          aria-hidden
        >
          Sajid
        </p>
      </div>
    </section>
  );
};

export default About;
