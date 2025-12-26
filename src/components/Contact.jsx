import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';
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
  glass: {
    light: {
      bg: 'bg-white/40',
      border: 'border-white/60',
      hover: 'hover:bg-white/50',
      shadow: '0 8px 32px 0 rgba(139, 92, 246, 0.15)',
    },
    dark: {
      bg: 'bg-white/10',
      border: 'border-white/20',
      hover: 'hover:bg-white/15',
      shadow: '0 8px 32px 0 rgba(139, 92, 246, 0.1)',
    },
  },
  input: {
    light: {
      bg: 'bg-white/30',
      border: 'border-white/40',
      text: 'text-gray-900',
      placeholder: 'placeholder-gray-500',
      focus: 'focus:ring-purple-600',
    },
    dark: {
      bg: 'bg-white/10',
      border: 'border-white/20',
      text: 'text-white',
      placeholder: 'placeholder-gray-400',
      focus: 'focus:ring-purple-500',
    },
  },
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const glassStyle = THEME_COLORS.glass[theme];
  const inputStyle = THEME_COLORS.input[theme];

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
    { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaXTwitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Let's Connect
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>

          {/* Main Container */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Get in Touch Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`p-8 rounded-2xl backdrop-blur-xl border ${glassStyle.bg} ${glassStyle.border} ${glassStyle.hover} transition-all duration-300 group`}
              style={{ boxShadow: glassStyle.shadow }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-500/30'}`}>
                  <FiMail className={`w-6 h-6 text-${THEME_COLORS.primary.main}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
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
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        theme === 'dark'
                          ? 'bg-purple-500/10 hover:bg-purple-500/20'
                          : 'bg-purple-500/15 hover:bg-purple-500/25'
                      }`}
                    >
                      <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-500/30' : 'bg-purple-500/40'}`}>
                        <Icon className={`w-5 h-5 text-${THEME_COLORS.primary.main}`} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          {info.label}
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">
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
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all ${
                        theme === 'dark'
                          ? 'bg-white/10 hover:bg-white/20'
                          : 'bg-white/20 hover:bg-white/30'
                      }`}
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
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`p-8 rounded-2xl backdrop-blur-xl border ${glassStyle.bg} ${glassStyle.border} ${glassStyle.hover} transition-all duration-300`}
              style={{ boxShadow: glassStyle.shadow }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-xl ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/30'}`}>
                  <FiSend className={`w-6 h-6 text-${THEME_COLORS.secondary.main}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name Field */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all focus:outline-none focus:ring-2 ${inputStyle.bg} ${inputStyle.border} ${inputStyle.text} ${inputStyle.placeholder} ${inputStyle.focus}`}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all focus:outline-none focus:ring-2 ${inputStyle.bg} ${inputStyle.border} ${inputStyle.text} ${inputStyle.placeholder} ${inputStyle.focus}`}
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg backdrop-blur-sm border transition-all focus:outline-none focus:ring-2 resize-none ${inputStyle.bg} ${inputStyle.border} ${inputStyle.text} ${inputStyle.placeholder} ${inputStyle.focus}`}
                  />
                </div>

                {/* Success Message */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-lg bg-green-500/20 border border-green-500/50 text-green-700 dark:text-green-300"
                  >
                    ✓ Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-purple-500/50"
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

