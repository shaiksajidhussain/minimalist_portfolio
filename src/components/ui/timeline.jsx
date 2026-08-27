export const Timeline = ({ data, primaryColor = '#d97757' }) => {
  return (
    <div className="relative w-full">
      <div
        className="absolute left-0 md:left-32 top-0 bottom-0 w-px"
        style={{ backgroundColor: `${primaryColor}40` }}
      />

      {data.map((item, index) => (
        <div key={`${item.company}-${index}`} className="relative mb-12 md:mb-16 pl-8 md:pl-44">
          <div
            className="absolute left-[-5px] md:left-[120px] top-2 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: primaryColor }}
          />
          <div className="border border-zinc-200 rounded-xl p-6 bg-white">
            <h3 className="text-xl font-semibold text-zinc-900 mb-1">{item.role}</h3>
            <p className="text-sm font-medium" style={{ color: primaryColor }}>
              {item.company}
            </p>
            {item.duration && <p className="text-xs text-zinc-500 mt-1 mb-4">{item.duration}</p>}

            {item.points?.length > 0 && (
              <ul className="space-y-2 mb-5">
                {item.points.slice(0, 4).map((point) => (
                  <li key={point} className="text-sm text-zinc-400 flex gap-2">
                    <span style={{ color: primaryColor }}>–</span>
                    {point}
                  </li>
                ))}
              </ul>
            )}

            {item.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs rounded-md"
                    style={{
                      backgroundColor: `${primaryColor}18`,
                      color: primaryColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
