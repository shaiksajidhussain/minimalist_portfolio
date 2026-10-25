import { useState } from 'react';
import Layout from '../components/Layout';
import BlurHeading from '../components/BlurHeading';
import { BRAND, BUDGETS, SERVICES } from '../content';
import config from '../../config/api';
import { usePageMeta } from '../usePageMeta';

const EMPTY = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  details: '',
};

const ContactPage = () => {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  usePageMeta({
    title: 'Contact | Sajid',
    description: 'Start a project with Sajid. Share the service, the context, and what the first release needs to do.',
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
    if (!form.service) next.service = 'Choose a service.';
    if (form.details.trim().length < 20) next.details = 'Add a few sentences about the project.';
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
      message: [
        form.company.trim() && `Company: ${form.company.trim()}`,
        `Service: ${form.service}`,
        form.budget && `Budget: ${form.budget}`,
        '',
        form.details.trim(),
      ]
        .filter(Boolean)
        .join('\n'),
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
          A short brief is enough: who it is for, what is broken today, and which service you need.
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
            <span>Company or website, optional</span>
            <input name="company" value={form.company} onChange={update} autoComplete="organization" />
          </label>
          <label className="field">
            <span>Service required</span>
            <select name="service" value={form.service} onChange={update} aria-invalid={Boolean(errors.service)}>
              <option value="">Select a service</option>
              {SERVICES.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            {errors.service ? <span className="field-error">{errors.service}</span> : null}
          </label>
          <label className="field">
            <span>Approximate budget, optional</span>
            <select name="budget" value={form.budget} onChange={update}>
              <option value="">Select a range</option>
              {BUDGETS.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
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
            The form sends your brief to the studio inbox through the existing email endpoint. It is used to reply
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
