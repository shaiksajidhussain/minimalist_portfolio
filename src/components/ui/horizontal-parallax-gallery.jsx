import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export const HorizontalParallaxGallery = ({ items = [] }) => {
  const { colors } = useTheme();
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const imgWrappers = useRef([]);

  useEffect(() => {
    if (!scrollerRef.current || !containerRef.current) return;

    const scroller = scrollerRef.current;
    const container = containerRef.current;

    // Create ScrollTrigger animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        markers: false,
      },
    });

    // Animate horizontal scroll based on vertical scroll
    tl.fromTo(
      scroller,
      {
        x: 0,
      },
      {
        x: -scroller.scrollWidth + window.innerWidth,
      },
      0
    );

    // Parallax effect for each image wrapper
    imgWrappers.current.forEach((wrapper, index) => {
      const depth = wrapper.getAttribute('data-depth') || 0;
      const offset = depth * 20;

      tl.fromTo(
        wrapper,
        {
          y: 0,
        },
        {
          y: offset,
        },
        0
      );
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [items]);

  const defaultItems = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop',
      alt: 'Gallery Image 1',
      depth: -2,
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
      alt: 'Gallery Image 2',
      depth: 1,
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1516321318423-f06f70e504b0?w=500&h=500&fit=crop',
      alt: 'Gallery Image 3',
      depth: -1,
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1559056169-641ef2588331?w=500&h=500&fit=crop',
      alt: 'Gallery Image 4',
      depth: 2,
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=500&h=500&fit=crop',
      alt: 'Gallery Image 5',
      depth: -1,
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1535016120754-fd45532a3f6f?w=500&h=500&fit=crop',
      alt: 'Gallery Image 6',
      depth: 1,
    },
  ];

  const galleryItems = items.length > 0 ? items : defaultItems;

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-br" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div
        ref={scrollerRef}
        className="flex gap-8 p-8 h-full items-center"
        style={{
          width: 'fit-content',
        }}
      >
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => {
              if (el) imgWrappers.current[index] = el;
            }}
            data-depth={item.depth || 0}
            className="flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 group cursor-pointer"
            style={{
              width: '45vh',
              height: '55vh',
              borderWidth: '3px',
              borderColor: colors.primary,
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter saturate-40 sepia-30 hue-rotate-5 group-hover:filter-none"
                style={{
                  filter: 'saturate(40%) sepia(30%) hue-rotate(5deg)',
                }}
              />
              <div className="absolute inset-0 group-hover:opacity-0 transition-opacity duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-8 flex items-center gap-2 text-gray-600 dark:text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 animate-bounce"
          viewBox="0 0 100 100"
          fill="currentColor"
        >
          <path d="M50,67.1c-0.6,0-1.2-0.2-1.8-0.7c-3.8-3.8-7.7-7.7-11.5-11.5c-2.3-2.3,1.2-5.8,3.5-3.5c2.5,2.5,4.9,4.9,7.4,7.4c0-13.7,0-27.4,0-41.2c0-0.6,0.2-1.2,0.5-1.5c0,0,0,0,0,0c0.4-0.6,1.1-1,2-0.9c13.7,0.3,26.4,7.2,33.5,19.1C96.5,55.9,84.7,85,60.2,91.6C35.5,98.2,11.6,79.1,11.1,54c-0.1-3.2,4.9-3.2,5,0c0.3,13.8,8.4,26.4,21.3,31.5c12.5,5,27.1,1.9,36.6-7.5c9.5-9.5,12.5-24.1,7.5-36.6c-4.8-12.1-16.3-20.1-29-21.2c0,12.8,0,25.5,0,38.3c2.5-2.5,4.9-4.9,7.4-7.4c2.3-2.3,5.8,1.3,3.5,3.5c-3.9,3.9-7.8,7.8-11.8,11.8C51.2,66.9,50.6,67.1,50,67.1z" />
        </svg>
        <span className="text-sm font-medium">Scroll to explore</span>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-current to-transparent" style={{ backgroundColor: 'var(--bg-color)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-current to-transparent" style={{ backgroundColor: 'var(--bg-color)' }} />
      </div>
    </div>
  );
};

export default HorizontalParallaxGallery;
