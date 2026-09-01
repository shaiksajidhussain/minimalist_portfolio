import { FiClock, FiGlobe, FiMail } from 'react-icons/fi';
import { useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { RevealHeading, useTextReveal } from '../hooks/useTextReveal.jsx';

const Availability = () => {
  const { colors } = useTheme();
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  const details = [
    {
      icon: FiGlobe,
      title: 'Location',
      description: 'Available for Freelance & Remote Projects',
    },
    {
      icon: FiClock,
      title: 'Time Zone',
      description: 'IST (UTC +5:30) - Flexible overlap',
    },
    {
      icon: FiMail,
      title: 'Response Time',
      description: 'Within 24 hours',
    },
  ];

  return (
    <section ref={sectionRef} id="availability" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <RevealHeading className="text-4xl sm:text-5xl font-semibold text-[var(--ink)] mb-4">
            Availability
          </RevealHeading>
          <p className="text-lg text-[var(--muted)]" data-reveal-copy>
            Ready to start your next project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {details.map((detail) => {
            const Icon = detail.icon;
            return (
              <div key={detail.title} className="text-center liquid-card p-6" data-reveal-block>
                <div className="flex justify-center mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center border"
                    style={{
                      backgroundColor: `${colors.primary}18`,
                      borderColor: `${colors.primary}40`,
                    }}
                  >
                    <Icon className="w-6 h-6" style={{ color: colors.primary }} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[var(--ink)] mb-2">{detail.title}</h3>
                <p className="text-[var(--muted)]">{detail.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Availability;
