import { useState } from 'react';
import Layout from '../components/Layout';
import BlurHeading from '../components/BlurHeading';
import { BRAND } from '../content';
import config from '../../config/api';
import { usePageMeta } from '../usePageMeta';

const EMPTY = {
  name: '',
  email: '',
  details: '',
};

const ContactPage = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  usePageMeta({
    title: 'Contact | Sajid',
    description: 'Start a project with Sajid. Share your name, email, and what the project needs to do.',
    path: '/contact',
  });

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (form.name.trim().length < 2) next.name = 'Add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Use a work email we can reply to.';
    if (form.details.trim().length < 10) next.details = 'Add a short note about the project.';
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus('sending');
    setMessage('');
    const body = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.details.trim(),
    };

    try {
      const response = await fetch(`${config.baseUrl}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error('Request failed');
      setForm(EMPTY);
      setStatus('sent');
      setMessage('Received. We will reply to the email you entered.');
    } catch {
      setStatus('error');
      setMessage(`The message did not send. Email ${BRAND.email} directly and we will pick it up from there.`);
    }
  };

  return (
    <Layout>
      <header className="wrap page-hero">
        <p className="kicker">Contact</p>
        <BlurHeading as="h1" className="page-title" text="Tell us what the first release has to do." />
        <p className="lede">
          Name, email, and a short note about the project are enough to start.
        </p>
      </header>
      <div className="wrap split" style={{ paddingBottom: '5rem' }}>
        <form className="form" onSubmit={onSubmit} noValidate>
          <label className="field">
            <span>Name</span>
            <input name="name" value={form.name} onChange={update} autoComplete="name" aria-invalid={Boolean(errors.name)} />
            {errors.name ? <span className="field-error">{errors.name}</span> : null}
          </label>
          <label className="field">
            <span>Work email</span>
            <input name="email" type="email" value={form.email} onChange={update} autoComplete="email" aria-invalid={Boolean(errors.email)} />
            {errors.email ? <span className="field-error">{errors.email}</span> : null}
          </label>
          <label className="field">
            <span>Project details</span>
            <textarea name="details" value={form.details} onChange={update} aria-invalid={Boolean(errors.details)} />
            {errors.details ? <span className="field-error">{errors.details}</span> : null}
          </label>
          <button className="btn btn-solid" type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send the brief'}
          </button>
          {message ? (
            <p className={`banner ${status === 'error' ? 'is-error' : ''}`} role="status">
              {message}
            </p>
          ) : null}
          <p className="form-note">
            The form sends your brief through the existing email endpoint. It is used to reply
            to the project, not added to a public list.
          </p>
        </form>
        <aside className="prose">
          <p>
            <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </p>
          <p>
            <a href={BRAND.phoneHref}>{BRAND.phone}</a>
          </p>
          <p>{BRAND.region}</p>
          <p>If the form cannot reach the server, the email address above is the fallback.</p>
        </aside>
      </div>
    </Layout>
  );
};

export default ContactPage;
