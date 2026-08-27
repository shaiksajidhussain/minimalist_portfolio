import { FiPause, FiPlay } from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { useLetterPop } from '../hooks/useLetterPop';
import { gsap, useGSAP } from '../lib/gsap';
import LetterHeadline from './LetterHeadline';
import config from '../config/api';

const TRACK_SRC = '/Code.mp3';

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const PHOTO =
  'https://res.cloudinary.com/dgus6y6lm/image/upload/v1766677763/Sajid_Professional_vncuym.png';

const ROTATING_WORDS = ['Codes', 'Builds'];

const RotatingWords = ({ words, className }) => {
  const slotRef = useRef(null);

  useGSAP(
    () => {
      const lines = slotRef.current
        ? Array.from(slotRef.current.querySelectorAll('.hero-word-line'))
        : [];
      if (lines.length < 2) return;

      gsap.set(lines, { autoAlpha: 0, yPercent: 40 });
      gsap.set(lines[0], { autoAlpha: 1, yPercent: 0 });

      let index = 0;
      const swap = () => {
        const current = lines[index];
        index = (index + 1) % lines.length;
        const next = lines[index];

        gsap
          .timeline()
          .to(current, {
            yPercent: -40,
            autoAlpha: 0,
            duration: 0.4,
            ease: 'power3.in',
          })
          .fromTo(
            next,
            { yPercent: 40, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'power3.out' },
            0.05
          );
      };

      const id = window.setInterval(swap, 2000);
      return () => window.clearInterval(id);
    },
    { scope: slotRef }
  );

  return (
    <div ref={slotRef} className="hero-line hero-rotating-slot">
      {words.map((word) => (
        <LetterHeadline key={word} text={word} className={`hero-word-line ${className}`} />
      ))}
    </div>
  );
};

const Hero = () => {
  const rootRef = useRef(null);
  const cassetteRef = useRef(null);
  const photoRef = useRef(null);
  const audioRef = useRef(null);
  const playingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [resumeUrl, setResumeUrl] = useState(null);
  useLetterPop(rootRef);

  useEffect(() => {
    const fetchAndIncrementViews = async () => {
      try {
        const response = await fetch(`${config.views}/hero`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        setViewCount(data.count);
      } catch {
        setViewCount(2700);
      }
    };

    const fetchResume = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/resumes`);
        const resumes = await response.json();
        if (resumes?.length) setResumeUrl(resumes[0].url);
      } catch {
        /* ignore */
      }
    };

    fetchAndIncrementViews();
    fetchResume();

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const toggleTrack = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        /* autoplay block or missing file */
      }
    } else {
      audio.pause();
    }
  };

  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  useGSAP(
    (_, contextSafe) => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          motionOk: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const { reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.set(['.hero-intro', '.hero-line', '.hero-cassette', '.hero-photo', '.hero-sun', '.cloud-svg', '.hero-plane'], {
              autoAlpha: 1,
              y: 0,
              x: 0,
              scale: 1,
              rotation: 0,
            });
            return;
          }

          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          tl.from('.hero-sun', { autoAlpha: 0, scale: 0.6, duration: 0.7 }, 0)
            .from('.hero-intro', { y: 16, autoAlpha: 0, duration: 0.5 }, 0.1)
            .from('.hero-line', { y: 48, autoAlpha: 0, duration: 0.85, stagger: 0.12 }, 0.15)
            .from('.hero-cassette', { y: 24, autoAlpha: 0, scale: 0.92, duration: 0.6 }, 0.35)
            .fromTo(
              '.hero-photo',
              { y: 80, autoAlpha: 0, rotation: 12 },
              { y: 0, autoAlpha: 1, rotation: -6, duration: 0.9 },
              0.28
            )
            .from('.cloud-svg', { y: 60, autoAlpha: 0, duration: 0.9 }, 0.2)
            .from('.hero-plane', { autoAlpha: 0, duration: 0.3 }, 0.7);

          const path = rootRef.current?.querySelector('#plane-path');
          const plane = rootRef.current?.querySelector('.hero-plane');
          if (path && plane) {
            gsap.to(plane, {
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                autoRotate: true,
              },
              duration: 3.2,
              ease: 'power1.inOut',
              delay: 0.8,
            });
          }

          gsap.to('.hero-sun', {
            rotation: 8,
            yoyo: true,
            repeat: -1,
            duration: 8,
            ease: 'sine.inOut',
          });

          gsap.to('.cloud-svg', {
            y: 48,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
          });

          const cassette = cassetteRef.current;
          const photo = photoRef.current;
          const reels = cassette?.querySelectorAll('.cassette-reel');

          const hoverIn = contextSafe(() => {
            gsap.to(cassette, { scale: 1.04, duration: 0.28, ease: 'power2.out' });
            if (!playingRef.current) {
              gsap.to(reels, { rotation: '+=28', duration: 0.45, ease: 'power2.out', stagger: 0.04 });
            }
          });
          const hoverOut = contextSafe(() => {
            gsap.to(cassette, { scale: 1, duration: 0.28, ease: 'power2.out' });
          });

          const photoIn = contextSafe(() => {
            gsap.to(photo, { scale: 1.05, rotation: -2, duration: 0.35, ease: 'power2.out' });
          });
          const photoOut = contextSafe(() => {
            gsap.to(photo, { scale: 1, rotation: -6, duration: 0.35, ease: 'power2.out' });
          });

          cassette?.addEventListener('mouseenter', hoverIn);
          cassette?.addEventListener('mouseleave', hoverOut);
          photo?.addEventListener('mouseenter', photoIn);
          photo?.addEventListener('mouseleave', photoOut);

          return () => {
            cassette?.removeEventListener('mouseenter', hoverIn);
            cassette?.removeEventListener('mouseleave', hoverOut);
            photo?.removeEventListener('mouseenter', photoIn);
            photo?.removeEventListener('mouseleave', photoOut);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-40"
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #7eb8e6 0%, #a9d4f0 42%, #d5eaf8 78%, #f4efe6 100%)',
        }}
      />
      <div className="hero-grain" />

      <div
        className="hero-sun pointer-events-none absolute top-10 right-[7%] w-24 h-24 sm:w-36 sm:h-36 rounded-full"
        style={{
          background: 'repeating-linear-gradient(-32deg, #f0c93a 0 11px, #fff4c4 11px 15px)',
        }}
        aria-hidden
      />

      <p className="hidden lg:block absolute left-6 top-[42%] font-mono text-[11px] tracking-[0.28em] uppercase text-white/80 -rotate-90 origin-center">
        Code / Product / Craft
      </p>

      <svg
        className="pointer-events-none absolute inset-0 w-full h-full z-[1]"
        viewBox="0 0 1440 900"
        fill="none"
        aria-hidden
      >
        <path
          id="plane-path"
          d="M120 520 C 280 430, 420 610, 620 500 S 980 390, 1180 470"
          stroke="#1c1917"
          strokeWidth="1.4"
          strokeDasharray="6 8"
          opacity="0.35"
        />
      </svg>

      <div
        className="hero-plane absolute z-[2] w-8 h-8 text-[#e7b8a4]"
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.5 11.4 21 3.2l-6.2 18.2-4.1-6.3-6.2-3.7Z" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
        <p className="hero-intro font-mono text-[11px] sm:text-xs tracking-[0.14em] uppercase text-white mb-6">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f0c93a] mr-2 align-middle" />
          Hello, I&apos;m Shaik Sajid Hussain. A —
        </p>

        <h1 className="sr-only">Developer who Codes</h1>

        <LetterHeadline
          text="Developer who"
          className="hero-line font-serif leading-[0.9] tracking-tight whitespace-nowrap text-[8.2vw] sm:text-[9.5vw] lg:text-[7.2rem]"
        />

        <div className="relative z-20 my-3 sm:my-4">
          <audio
            ref={audioRef}
            src={TRACK_SRC}
            preload="metadata"
            onPlay={() => {
              playingRef.current = true;
              setPlaying(true);
            }}
            onPause={() => {
              playingRef.current = false;
              setPlaying(false);
            }}
            onEnded={() => {
              playingRef.current = false;
              setPlaying(false);
              setCurrentTime(0);
            }}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
          />
          <button
            ref={cassetteRef}
            type="button"
            onClick={toggleTrack}
            className="hero-cassette group mx-auto flex items-center gap-3 sm:gap-4 liquid-card rounded-full text-zinc-950 pl-2 pr-2 py-2 max-w-[92vw] sm:max-w-md"
            aria-label={playing ? 'Pause track' : 'Play From idea to launch'}
          >
            <span className={`cassette-reel w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0 ${playing ? 'is-spinning' : ''}`} />

            <span className="flex-1 min-w-0 text-left py-1">
              <span className="block text-xs sm:text-sm font-medium truncate">
                From idea to launch
              </span>
              <span className="mt-1.5 flex items-center gap-2">
                <span className="font-mono text-[10px] text-zinc-500 tabular-nums">
                  {formatTime(currentTime)}
                </span>
                <span className="flex-1 h-px bg-zinc-400/70 relative">
                  <span
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-zinc-950"
                    style={{ left: `${progress}%` }}
                  />
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  {viewCount.toLocaleString()}
                </span>
              </span>
            </span>

            <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-950 text-[#f4efe6] flex items-center justify-center shrink-0">
              {playing ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
            </span>

            <span className={`cassette-reel hidden sm:block w-12 h-12 sm:w-14 sm:h-14 rounded-full shrink-0 ${playing ? 'is-spinning' : ''}`} />
          </button>
        </div>

        <RotatingWords
          words={ROTATING_WORDS}
          className="font-serif leading-[0.9] tracking-tight whitespace-nowrap text-[12vw] sm:text-[11vw] lg:text-[8rem]"
        />

        {resumeUrl && (
          <button
            onClick={() => window.open(resumeUrl, '_blank')}
            className="hero-intro mt-8 font-mono text-[11px] tracking-[0.16em] uppercase text-white/70 hover:text-white"
          >
            View resume
          </button>
        )}
      </div>

      <div
        ref={photoRef}
        className="hero-photo absolute z-20 right-[6%] bottom-[16%] sm:bottom-[18%] w-28 h-36 sm:w-40 sm:h-52 rounded-2xl overflow-hidden border-[6px] border-[#f4efe6] shadow-[0_18px_40px_rgba(28,25,23,0.18)]"
      >
        <img src={PHOTO} alt="Shaik Sajid Hussain" className="w-full h-full object-cover object-top" />
      </div>

      <svg
        className="cloud-svg pointer-events-none absolute bottom-0 left-0 w-full h-[32vh] min-h-[180px] z-10 text-[#f4efe6]"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0 280V118c90-48 170-4 270 10 130 18 210-52 350-34 160 20 230 88 390 70 140-16 200-86 330-72 70 8 70 40 100 28v160H0Z"
        />
      </svg>
    </section>
  );
};

export default Hero;
