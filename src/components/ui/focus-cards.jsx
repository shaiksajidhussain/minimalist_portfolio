"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const FocusCards = ({ cards, className, onCardClick }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => onCardClick && card.project && onCardClick(card.project)}
        >
          <AnimatedCard
            card={card}
            index={idx}
            hoveredIndex={hoveredIndex}
          />
        </div>
      ))}
    </div>
  );
};

export const AnimatedCard = ({ card, index, hoveredIndex }) => {
  return (
    <motion.div
      layout
      initial={{ scale: 1 }}
      animate={{
        scale: hoveredIndex === index ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="relative overflow-hidden rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 h-full min-h-[300px]"
    >
      <div className="relative h-full w-full overflow-hidden min-h-[300px]">
        <motion.img
          src={card.src}
          alt={card.title}
          className="h-full w-full object-cover min-h-[300px]"
          initial={{ scale: 1 }}
          animate={{
            scale: hoveredIndex === index ? 1.1 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{
            opacity: hoveredIndex === index ? 1 : 0.7,
          }}
          transition={{ duration: 0.3 }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.h3
            className="text-white text-xl font-bold mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{
              y: hoveredIndex === index ? 0 : 20,
              opacity: hoveredIndex === index ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {card.title}
          </motion.h3>
          {card.description && (
            <motion.p
              className="text-white/80 text-sm"
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: hoveredIndex === index ? 0 : 20,
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {card.description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

