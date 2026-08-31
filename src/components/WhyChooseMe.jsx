const reasons = [
  {
    number: '01',
    title: 'Three years in product',
    description:
      'SaaS platforms, learning systems, and React Native apps — shipped work, not tutorial stacks.',
  },
  {
    number: '02',
    title: 'Performance as default',
    description:
      'Lighthouse, SEO, and load time are treated as features, not a pass at the end.',
  },
  {
    number: '03',
    title: 'Architecture that lasts',
    description:
      'Maintainable structure so the next person — or future-you — can keep building.',
  },
  {
    number: '04',
    title: 'Direct communication',
    description:
      'You talk to the person writing the code. Updates without theatre.',
  },
  {
    number: '05',
    title: 'Real product surfaces',
    description:
      'Payments, auth, dashboards, and backends that hold actual users.',
  },
];

const WhyChooseMe = () => {
  return (
    <section
      id="why-choose-me"
      className="relative overflow-hidden bg-[#f4efe6] pt-24 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-12 max-w-2xl lg:mb-16">
          <div className="mb-6 flex max-w-xl items-center justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              06 — Why me
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#d4af37]">
              The short list
            </p>
          </div>
          <h2 className="font-serif text-[2.6rem] leading-[0.95] tracking-tight text-[#1c1917] sm:text-6xl lg:text-7xl">
            Why choose
            <br />
            <em>me.</em>
          </h2>
          <p className="mt-8 max-w-xl text-[1.15rem] leading-[1.65] text-[#1c1917] sm:text-xl">
            Not a pitch deck. The reasons people actually hire me to build.
          </p>
        </header>

        <div className="grid grid-cols-12 items-start gap-x-10 gap-y-12">
          <ul className="col-span-12 lg:col-span-8">
            {reasons.map((reason) => (
              <li
                key={reason.number}
                className="group grid grid-cols-[3.25rem_1fr] gap-4 border-t border-[#1c1917]/10 py-7 sm:grid-cols-[4.5rem_1fr] sm:py-8"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#d4af37]">
                  {reason.number}
                </p>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-[#1c1917] sm:text-3xl">
                    {reason.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[1.05rem] leading-relaxed text-zinc-600">
                    {reason.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <aside className="relative col-span-12 lg:col-span-4 lg:mt-2">
            <div
              className="gold-plate pointer-events-none absolute inset-y-6 -right-3 left-8 sm:-right-4"
              aria-hidden
            />
            <div className="relative border-[10px] border-[#fffcf7] bg-[#fffcf7] px-6 py-8 shadow-[0_24px_60px_rgba(28,25,23,0.10)] sm:px-8 sm:py-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                In practice
              </p>
              <p className="mt-6 font-serif text-4xl leading-[0.95] tracking-tight text-[#1c1917] sm:text-5xl">
                03 years
              </p>
              <p className="mt-3 font-serif text-2xl italic text-[#1c1917]/80">
                React, RN, Node — end to end.
              </p>
              <p className="mt-6 text-sm leading-relaxed text-zinc-500">
                Hyderabad · Remote. One builder, from the first screen to the
                database.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
