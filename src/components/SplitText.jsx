import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts && document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!ref.current || !fontsLoaded || animationCompletedRef.current) return;

    const element = ref.current;
    const words = text.split(' ');
    const chars = text.split('');
    
    // Clear existing content
    element.innerHTML = '';

    let elements = [];
    
    if (splitType === 'chars') {
      // Split by characters
      chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        element.appendChild(span);
        elements.push(span);
      });
    } else if (splitType === 'words') {
      // Split by words
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.marginRight = index < words.length - 1 ? '0.25em' : '0';
        element.appendChild(span);
        elements.push(span);
      });
    }

    // Set initial styles
    elements.forEach((el, index) => {
      gsap.set(el, {
        opacity: from.opacity || 0,
        y: from.y || 40,
        x: from.x || 0,
        scale: from.scale || 1,
        rotation: from.rotation || 0
      });
    });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
        once: true
      },
      onComplete: () => {
        animationCompletedRef.current = true;
        if (onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }
      }
    });

    // Animate each element
    elements.forEach((el, index) => {
      tl.to(el, {
        opacity: to.opacity !== undefined ? to.opacity : 1,
        y: to.y !== undefined ? to.y : 0,
        x: to.x !== undefined ? to.x : 0,
        scale: to.scale !== undefined ? to.scale : 1,
        rotation: to.rotation !== undefined ? to.rotation : 0,
        duration: duration,
        ease: ease
      }, index * (delay / 1000));
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [text, splitType, delay, duration, ease, from, to, fontsLoaded, onLetterAnimationComplete]);

  const Tag = tag;
  const style = {
    textAlign: textAlign
  };

  return (
    <Tag ref={ref} className={className} style={style}>
      {text}
    </Tag>
  );
};

export default SplitText;

