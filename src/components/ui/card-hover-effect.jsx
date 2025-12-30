import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export const HoverEffect = ({ items = [], className = "" }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { colors, theme } = useTheme();
  
  // Fallback colors if theme context not available
  const primaryColor = colors?.primary || "#5227FF";
  const textColor = theme === 'dark' ? '#ffffff' : '#111827';

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item, idx) => (
        <motion.a
          key={idx}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group block p-6 h-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            borderColor: hoveredIndex === idx ? primaryColor : undefined,
            boxShadow: hoveredIndex === idx ? `0 0 20px ${primaryColor}40` : "none",
          }}
        >
          {/* Animated background gradient on hover */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}10 0%, ${primaryColor}05 100%)`,
            }}
            animate={{ opacity: hoveredIndex === idx ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10">
            <motion.h3
              className="text-lg font-semibold mb-2 transition-colors"
              animate={{ color: hoveredIndex === idx ? primaryColor : textColor }}
            >
              {item.title}
            </motion.h3>

            <motion.p
              className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
              animate={{ opacity: hoveredIndex === idx ? 1 : 0.8 }}
            >
              {item.description}
            </motion.p>
          </div>
        </motion.a>
      ))}
    </div>
  );
};
