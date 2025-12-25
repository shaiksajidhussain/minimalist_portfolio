"use client";
import { useEffect, useRef } from "react";

export const TextGenerateEffect = ({ words, className = "", duration = 0.5, filter = true }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const wordArray = words.split(" ");
    ref.current.innerHTML = "";

    wordArray.forEach((word, idx) => {
      const span = document.createElement("span");
      span.innerHTML = word + " ";
      span.style.opacity = "0";
      span.style.animation = `fadeIn ${duration}s ease-in forwards`;
      span.style.animationDelay = `${idx * (duration / 2)}s`;

      if (filter) {
        span.style.filter = "blur(10px)";
        span.style.animation = `fadeInBlur ${duration}s ease-in forwards`;
        span.style.animationDelay = `${idx * (duration / 2)}s`;
      }

      ref.current.appendChild(span);
    });

    // Add keyframes to document
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
      }
      @keyframes fadeInBlur {
        0% {
          opacity: 0;
          filter: blur(10px);
        }
        100% {
          opacity: 1;
          filter: blur(0px);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [words, duration, filter]);

  return <div ref={ref} className={className} />;
};
