import React, { useRef } from "react";
import { motion } from "framer-motion";

export const Timeline = ({ data, primaryColor = "#3b82f6", secondaryColor = "#1e40af" }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);

  return (
    <div className="w-full" ref={containerRef} style={{ perspective: "1200px" }}>
      <div ref={ref} className="relative w-full">
        {/* Timeline line */}
        <div 
          className="absolute left-0 md:left-32 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b from-transparent via-blue-500 to-transparent"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent, ${primaryColor}, transparent)`
          }}
        />

        {data.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} primaryColor={primaryColor} secondaryColor={secondaryColor} />
        ))}
      </div>
    </div>
  );
};

const TimelineItem = ({ item, index, primaryColor, secondaryColor }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative mb-24 md:mb-32"
    >
      <div className="flex flex-col md:flex-row md:items-center">
        {/* Left content (hidden on mobile, shown on desktop) */}
        <div className="hidden md:block md:w-1/2 pr-12">
          {isEven && <TimelineContent item={item} primaryColor={primaryColor} secondaryColor={secondaryColor} />}
        </div>

        {/* Right content */}
        <div className="md:w-1/2 pl-16 md:pl-12">
          {!isEven && <TimelineContent item={item} primaryColor={primaryColor} secondaryColor={secondaryColor} isMobileOnly={true} />}
          {isEven && <TimelineContent item={item} primaryColor={primaryColor} secondaryColor={secondaryColor} isMobileOnly={false} hideOnDesktop={true} />}
        </div>
      </div>
    </motion.div>
  );
};

const TimelineContent = ({ item, isMobileOnly, hideOnDesktop, primaryColor, secondaryColor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`relative ${hideOnDesktop ? "md:hidden" : ""}`}
      style={{ 
        perspective: "1200px",
        transformStyle: "preserve-3d"
      }}
    >
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900 rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-500"
        style={{
          boxShadow: `0 20px 40px rgba(0,0,0,0.1), 0 0 60px ${primaryColor}26`,
          borderColor: primaryColor,
          transform: "translateZ(50px)"
        }}
      >
        {/* Title */}
        <div className="mb-4">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
          >
            {item.title}
          </motion.h3>
          
          {item.role && (
            <h4 className="text-lg md:text-xl font-semibold dark:text-white" style={{ color: primaryColor }}>
              {item.role}
            </h4>
          )}
          
          {item.company && (
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
              {item.company}
            </p>
          )}
          
          {item.duration && (
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {item.duration}
            </p>
          )}
        </div>

        {/* Points */}
        {item.points && item.points.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-2 mb-6 max-h-48 md:max-h-none overflow-y-auto md:overflow-visible"
          >
            {item.points.map((point, idx) => (
              <li
                key={idx}
                className="text-sm md:text-base text-gray-700 dark:text-gray-300 flex items-start gap-3 group"
              >
                <span className="font-bold mt-1 group-hover:scale-125 transition-transform" style={{ color: primaryColor }}>
                  ✓
                </span>
                <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {point}
                </span>
              </li>
            ))}
          </motion.ul>
        )}

        {/* Technologies */}
        {item.technologies && item.technologies.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="pt-4 border-t border-gray-200 dark:border-zinc-700"
          >
            <p className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
              Technologies Used
            </p>
            <div className="flex flex-wrap gap-2">
              {item.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs md:text-sm rounded-lg font-medium transition-colors cursor-default"
                  style={{
                    backgroundColor: `${primaryColor}20`,
                    color: primaryColor,
                    border: `1px solid ${primaryColor}40`
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Projects */}
        {item.projects && item.projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-4 border-t border-gray-200 dark:border-zinc-700"
          >
            <p className="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
              Key Projects
            </p>
            <div className="space-y-2">
              {item.projects.map((project, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm md:text-base text-gray-700 dark:text-gray-300 hover:transition-colors group"
                  style={{ "--hover-color": primaryColor }}
                >
                  <span className="group-hover:translate-x-1 transition-transform" style={{ color: primaryColor }}>
                    →
                  </span>
                  {project}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {item.content && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-700"
          >
            {item.content}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
