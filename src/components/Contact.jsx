import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';
import { ComicText } from './ui/comic-text';
import config from '../config/api';

// Central Theme Configuration
const THEME_COLORS = {
  primary: {
    light: 'bg-purple-500',
    main: 'purple-600',
    dark: 'purple-700',
  },
  secondary: {
    light: 'bg-blue-500',
    main: 'blue-600',
    dark: 'blue-700',
  },
  accent: {
    light: 'bg-cyan-500',
    main: 'cyan-600',
    dark: 'cyan-700',
  },
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { theme, colors } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${config.baseUrl}/email/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    { 
      icon: FiMail, 
      label: 'Email', 
      value: 'sanjusazid0@gmail.com',
      href: 'mailto:sanjusazid0@gmail.com'
    },
    { 
      icon: FiPhone, 
      label: 'Phone', 
      value: '+91 7893160318',
      href: 'tel:+917893160318'
    },
    { 
      icon: FiMapPin, 
      label: 'Location', 
      value: 'Andhra Pradesh, India',
      href: '#'
    },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/shaiksajidhussain', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/shaiksajidhussain', label: 'LinkedIn' },
    { icon: FaYoutube, href: 'https://www.youtube.com/@codewithsanjuu', label: 'YouTube' },
    { icon: FaXTwitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          style={{
            scale,
            opacity,
            y,
          }}
        >
          {/* Header */}
          <motion.div className="text-center mb-16">
            <h2
              className="text-5xl sm:text-6xl font-bold mb-4"
              style={{
                color: theme === 'dark' ? '#ffffff' : '#1f2937',
              }}
            >
              Let's Connect
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{
                color: theme === 'dark' ? '#d1d5db' : '#6b7280',
              }}
            >
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </motion.div>

          {/* Main Container */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Get in Touch Card */}
            <motion.div
              className="p-8 rounded-2xl transition-all"
              style={{
                backgroundColor: theme === 'dark' ? '#27272a' : '#f9fafb',
                border: `2px solid ${theme === 'dark' ? '#3f3f46' : '#e5e7eb'}`,
              }}
              whileHover={{
                borderColor: colors.primary,
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.3)',
                  }}
                >
                  <FiMail className="w-6 h-6" style={{ color: colors.primary }} />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{
                    color: theme === 'dark' ? '#ffffff' : '#1f2937',
                  }}
                >
                  Get in Touch
                </h3>
              </div>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-4 p-4 rounded-xl transition-all"
                      style={{
                        backgroundColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.15)',
                      }}
                    >
                      <div
                        className="p-3 rounded-lg"
                        style={{
                          backgroundColor: theme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.4)',
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <p
                          className="text-xs uppercase tracking-wider"
                          style={{
                            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
                          }}
                        >
                          {info.label}
                        </p>
                        <p
                          className="font-medium"
                          style={{
                            color: theme === 'dark' ? '#ffffff' : '#1f2937',
                          }}
                        >
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white transition-all"
                      style={{
                        backgroundColor: colors.primary,
                      }}
                      title={link.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Send Message Form Card */}
            <motion.div
              className="p-8 rounded-2xl transition-all"
              style={{
                backgroundColor: theme === 'dark' ? '#27272a' : '#f9fafb',
                border: `2px solid ${theme === 'dark' ? '#3f3f46' : '#e5e7eb'}`,
              }}
              whileHover={{
                borderColor: colors.primary,
              }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <FiSend className="w-6 h-6" style={{ color: colors.primary }} />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{
                    color: theme === 'dark' ? '#ffffff' : '#1f2937',
                  }}
                >
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div>
                    <label
                      className="text-sm font-medium mb-2 block"
                      style={{
                        color: theme === 'dark' ? '#d1d5db' : '#374151',
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: theme === 'dark' ? '#3f3f46' : '#f3f4f6',
                        borderColor: theme === 'dark' ? '#52525b' : '#e5e7eb',
                        color: theme === 'dark' ? '#ffffff' : '#1f2937',
                      }}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      className="text-sm font-medium mb-2 block"
                      style={{
                        color: theme === 'dark' ? '#d1d5db' : '#374151',
                      }}
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: theme === 'dark' ? '#3f3f46' : '#f3f4f6',
                        borderColor: theme === 'dark' ? '#52525b' : '#e5e7eb',
                        color: theme === 'dark' ? '#ffffff' : '#1f2937',
                      }}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    className="text-sm font-medium mb-2 block"
                    style={{
                      color: theme === 'dark' ? '#d1d5db' : '#374151',
                    }}
                  >
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 resize-none"
                    style={{
                      backgroundColor: theme === 'dark' ? '#3f3f46' : '#f3f4f6',
                      borderColor: theme === 'dark' ? '#52525b' : '#e5e7eb',
                      color: theme === 'dark' ? '#ffffff' : '#1f2937',
                    }}
                  />
                </div>

                {/* Success Message */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 rounded-lg border flex flex-col items-center justify-center gap-4"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                      borderColor: 'rgba(34, 197, 94, 0.5)',
                    }}
                  >
                    <ComicText fontSize={5}>SUBMITTED!</ComicText>
                    <p
                      className="text-center"
                      style={{
                        color: theme === 'dark' ? '#86efac' : '#166534',
                      }}
                    >
                      Message sent successfully! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.dark})`,
                    boxShadow: `0 0 20px ${colors.primary}80`,
                  }}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                  {!loading && <FiSend size={20} className="group-hover:translate-x-1 transition-transform" />}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

