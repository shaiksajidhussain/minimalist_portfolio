"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const AnimatedTestimonials = ({ testimonials, autoplay = false }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay, testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="w-full">
      <div className="relative h-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute w-full max-w-2xl"
          >
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <img
                  src={testimonials[current].src}
                  alt={testimonials[current].name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 italic">
                "{testimonials[current].quote}"
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {testimonials[current].name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {testimonials[current].designation}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-2 h-2 rounded-full transition ${
                idx === current ? "bg-gray-900 dark:bg-white" : "bg-gray-400 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
