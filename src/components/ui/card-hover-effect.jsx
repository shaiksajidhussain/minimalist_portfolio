export const HoverEffect = ({ items = [], className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
      {items.map((item) => (
        <div
          key={item.title}
          className="p-6 rounded-xl border border-zinc-200 bg-white transition-colors duration-200 hover:border-[var(--color-primary)]"
        >
          <h3 className="text-lg font-semibold mb-2 text-zinc-900">
            {item.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
        </div>
      ))}
    </div>
  );
};
