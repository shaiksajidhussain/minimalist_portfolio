"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const GRID_PRESETS = {
  "6x4": { rows: 4, cols: 6 },
  "8x8": { rows: 8, cols: 8 },
  "8x3": { rows: 3, cols: 8 },
  "4x6": { rows: 6, cols: 4 },
  "3x8": { rows: 8, cols: 3 },
};

export const PixelImage = ({
  src,
  grid = "8x8",
  customGrid,
  grayscaleAnimation = true,
  pixelFadeInDuration = 1000,
  maxAnimationDelay = 1200,
  colorRevealDelay = 1500,
  className = "",
}) => {
  const containerRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const gridConfig = customGrid || GRID_PRESETS[grid] || GRID_PRESETS["8x8"];
  const { rows, cols } = gridConfig;
  const totalPixels = rows * cols;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    img.src = src;
  }, [src]);

  const pixelWidth = dimensions.width / cols;
  const pixelHeight = dimensions.height / rows;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const pixelVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: pixelFadeInDuration / 1000,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Original Image (hidden, used for reference) */}
      <img src={src} alt="Pixel Image" className="absolute inset-0 opacity-0" />

      {/* Pixelated Grid */}
      {imageLoaded && (
        <motion.div
          className="grid w-full h-full"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Array.from({ length: totalPixels }).map((_, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            const randomDelay = Math.random() * maxAnimationDelay;

            // Calculate background position for the pixel
            const bgPositionX = (col / cols) * 100;
            const bgPositionY = (row / rows) * 100;

            return (
              <motion.div
                key={index}
                className={`relative overflow-hidden ${grayscaleAnimation ? "filter grayscale" : ""}`}
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: `${cols * 100}% ${rows * 100}%`,
                  backgroundPosition: `${bgPositionX}% ${bgPositionY}%`,
                }}
                variants={pixelVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: randomDelay / 1000,
                  duration: pixelFadeInDuration / 1000,
                }}
              >
                {grayscaleAnimation && (
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${src})`,
                      backgroundSize: `${cols * 100}% ${rows * 100}%`,
                      backgroundPosition: `${bgPositionX}% ${bgPositionY}%`,
                      filter: "grayscale(0%)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: (randomDelay + colorRevealDelay) / 1000,
                      duration: 0.5,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Loading State */}
      {!imageLoaded && (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-800 animate-pulse" />
      )}
    </div>
  );
};
