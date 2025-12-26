import React from 'react';

export const ComicText = ({ 
  children, 
  fontSize = 4, 
  className = '',
  style = {} 
}) => {
  const baseSize = fontSize * 16;
  
  return (
    <div
      className={`comic-text ${className}`}
      style={{
        fontSize: `${baseSize}px`,
        fontWeight: 'bold',
        fontFamily: '"Comic Sans MS", "Trebuchet MS", cursive',
        color: '#ffffff',
        textShadow: `
          3px 3px 0px #000,
          6px 6px 0px rgba(0,0,0,0.5),
          -2px -2px 0px rgba(255,255,255,0.5),
          2px 2px 0px rgba(255,215,0,0.8)
        `,
        letterSpacing: '2px',
        transform: 'skew(-5deg) rotate(2deg)',
        display: 'inline-block',
        animation: 'comic-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        ...style
      }}
    >
      <style>{`
        @keyframes comic-pop {
          0% {
            transform: skew(-5deg) rotate(2deg) scale(0.3);
            opacity: 0;
          }
          50% {
            transform: skew(-2deg) rotate(-1deg) scale(1.1);
          }
          100% {
            transform: skew(-5deg) rotate(2deg) scale(1);
            opacity: 1;
          }
        }
      `}</style>
      {children}
    </div>
  );
};
