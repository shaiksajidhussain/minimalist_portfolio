import { useState } from 'react';
import { useRef } from 'react';
import { FiMail, FiLinkedin, FiGithub, FiSend, FiPhone, FiMapPin } from 'react-icons/fi';
import { FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';
import config from '../config/api';
import { RevealHeading, useTextReveal } from '../hooks/useTextReveal.jsx';

const Contact = () => {
  const { colors } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const sectionRef = useRef(null);
  useTextReveal(sectionRef);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${config.baseUrl}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: FiMail, label: 'Email', value: 'sanjusazid0@gmail.com', href: 'mailto:sanjusazid0@gmail.com' },
    { icon: FiPhone, label: 'Phone', value: '+91 7893160318', href: 'tel:+917893160318' },
    { icon: FiMapPin, label: 'Location', value: 'Andhra Pradesh, India', href: '#' },
  ];

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/shaiksajidhussain', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/shaiksajidhussain', label: 'LinkedIn' },
    { icon: FaYoutube, href: 'https://www.youtube.com/@codewithsanjuu', label: 'YouTube' },
    { icon: FaXTwitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  const fieldClass =
    'w-full px-4 py-3 rounded-lg border border-[var(--line)] bg-[var(--cream)] text-[var(--ink)] placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--gold)]';

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <RevealHeading className="text-4xl sm:text-5xl font-semibold text-[var(--ink)] mb-4">
            Let&apos;s Connect
          </RevealHeading>
          <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto" data-reveal-copy>
            Have a project in mind or want to collaborate? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 liquid-card" data-reveal-block>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.primary}22` }}>
                <FiMail className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <h3 className="text-2xl font-semibold text-[var(--ink)]">Get in Touch</h3>
            </div>

            <div className="space-y-4 mb-8">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-center gap-4 rounded-xl bg-[var(--cream)] p-4 transition-colors hover:bg-[var(--gold-light)]"
                  >
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${colors.primary}22` }}>
                      <Icon className="w-5 h-5" style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-zinc-500">{info.label}</p>
                      <p className="font-medium text-[var(--ink)]">{info.value}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--ink)] transition-opacity hover:opacity-90"
                    style={{ backgroundColor: colors.primary }}
                    title={link.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="p-8 liquid-card" data-reveal-block>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl" style={{ backgroundColor: `${colors.primary}22` }}>
                <FiSend className="w-5 h-5" style={{ color: colors.primary }} />
              </div>
              <h3 className="text-2xl font-semibold text-[var(--ink)]">Send a Message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm font-medium mb-2 block text-[var(--muted)]">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block text-[var(--muted)]">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block text-[var(--muted)]">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={5}
                  className={`${fieldClass} resize-none`}
                />
              </div>

              {submitted && (
                <div className="p-4 rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm">
                  Message sent successfully. I'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold text-[var(--ink)] disabled:opacity-70"
                style={{ backgroundColor: colors.primary }}
              >
                {loading ? 'Sending...' : 'Send Message'}
                {!loading && <FiSend size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
