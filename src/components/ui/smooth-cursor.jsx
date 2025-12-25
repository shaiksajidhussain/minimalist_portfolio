"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const SmoothCursor = ({
  cursor,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
  primaryColor = "#FF6B6B",
}) => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRotation = useRef(0);

  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Calculate rotation based on movement
      const dx = e.clientX - (cursorX.get?.() || e.clientX);
      const dy = e.clientY - (cursorY.get?.() || e.clientY);
      cursorRotation.current = Math.atan2(dy, dx) * (180 / Math.PI);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        input,
        textarea,
        select {
          cursor: text !important;
        }
      `}</style>

      <motion.div
        style={{
          x: springX,
          y: springY,
          pointerEvents: "none",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
      >
        {cursor ? (
          cursor
        ) : (
          <DefaultCursorSVG primaryColor={primaryColor} />
        )}
      </motion.div>
    </>
  );
};

const DefaultCursorSVG = ({ primaryColor = "#FF6B6B" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* macOS-style cursor arrow */}
    <path
      d="M6 2L18 14L11 15L10 22L8 20L4 24L6 2Z"
      fill={primaryColor}
      stroke={primaryColor}
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
);
