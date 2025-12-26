import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export const Carousel = ({ items }) => {
  const [expanded, setExpanded] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  useOutsideClick(ref, () => setExpanded(null));

  return (
    <div className="w-full py-10 md:py-20">
      <div
        className="flex gap-4 overflow-x-auto pb-4 px-4 md:px-0 justify-center md:justify-start hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            onClick={() => {
              setExpanded(index);
              setActiveIndex(index);
            }}
            className="flex-shrink-0"
            ref={expanded === index ? ref : null}
          >
            <motion.div
              animate={{ width: expanded === index ? "100%" : "auto" }}
              className="relative group cursor-pointer"
            >
              {item}
            </motion.div>
          </motion.div>
        ))}
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {items[expanded]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Card = ({ card, index, primaryColor = "#3b82f6" }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative h-auto min-h-64 w-56 md:h-80 md:w-80 bg-gradient-to-br from-white to-gray-50 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer p-6 md:p-8 border transition-all duration-300"
      style={{
        borderColor: hovered ? primaryColor : "rgba(209, 213, 219, 0.5)",
        boxShadow: hovered ? `0 20px 40px ${primaryColor}20` : "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      {/* Content */}
      <motion.div className="relative h-full flex flex-col justify-between">
        <div>
          <p className="text-xs md:text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: primaryColor }}>
            {card.category}
          </p>
          <h3 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {card.title}
          </h3>
        </div>
        
        {card.description && (
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
            {card.description}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};
