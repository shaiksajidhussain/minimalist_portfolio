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
      className="relative overflow-hidden bg-[#f4efe6] pt-24 sm:pt-28 lg:pt-32"
    >
      <div className="relative mx-auto grid max-w-6xl grid-cols-12 items-start gap-x-10 gap-y-10 px-6">
        <div className="relative z-10 col-span-12 lg:col-span-6 lg:pb-28">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              02 — About
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#d4af37]">
              Hyderabad · Remote
            </p>
          </div>
          <h2 className="font-serif text-[2.6rem] leading-[0.95] tracking-tight text-[#1c1917] sm:text-6xl lg:text-7xl">
            Still building
            <br />
            <em>what&apos;s next.</em>
          </h2>
          <p className="mt-8 max-w-xl text-[1.15rem] leading-[1.65] text-[#1c1917] sm:text-xl">
            Hello, I&apos;m Shaik Sajid Hussain. Three years across product and
            engineering — from SaaS platforms and learning systems to shipping
            React Native apps.
          </p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-zinc-500 sm:text-base">
            React, React Native, and Node.js — performance, clean UI, and
            architecture that scales.
          </p>
          <div className="mt-10 grid max-w-xl grid-cols-3 border-t border-[#1c1917]/10 pt-7">
            {STATS.map((stat) => (
              <div key={stat.label} className="pr-4">
                <p className="font-serif text-4xl tracking-tight text-[#1c1917] sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <figure className="about-portrait relative z-20 col-span-12 mx-auto w-full max-w-md lg:col-span-6 lg:mx-0 lg:mt-6 lg:max-w-[26rem] lg:justify-self-end">
          <div
            className="gold-plate pointer-events-none absolute inset-y-8 -right-4 left-12 sm:-right-6"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-[1.4rem] border-[10px] border-[#fffcf7] shadow-[0_24px_60px_rgba(28,25,23,0.14)]">
            <img
              src={PHOTO}
              alt="Shaik Sajid Hussain"
              className="aspect-[3/4] w-full object-cover object-top"
            />
          </div>
        </figure>
      </div>

      <div className="about-name-band relative z-[1]">
        <p
          className="about-name select-none text-center font-serif leading-none text-[#1c1917]"
          aria-hidden
        >
          Sajid
        </p>
      </div>
    </section>
  );
};

export default About;
