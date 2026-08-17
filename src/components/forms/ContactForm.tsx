'use client';

import { useRef, useState } from 'react';
import { contactSchema, fieldErrors, INQUIRY_TYPES } from '@/lib/schemas';
import { track } from '@/lib/analytics';
import { TextField, TextArea, SelectField, Honeypot, FormStatus } from './Field';

const initial = { name: '', company: '', email: '', phone: '', inquiryType: '', message: '' };

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const statusRef = useRef<HTMLDivElement>(null);

  function set(field: keyof typeof initial, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => (e[field] ? { ...e, [field]: '' } : e));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = contactSchema.safeParse({ ...values, smsConsent, website: honeypot });

    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus('error');
      setMessage('Check the highlighted fields and send again.');
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus('error');
        setMessage(result.error ?? 'The message could not be sent. Try again in a moment.');
        statusRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }

      track('contact_completed', { inquiryType: parsed.data.inquiryType });
      setStatus('success');
      setValues(initial);
    } catch {
      setStatus('error');
      setMessage('The message could not be sent. Check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <FormStatus tone="success">
        <p className="font-display text-lg tracking-tightest">Message sent.</p>
        <p className="mt-2 text-graphite-600">
          Our team will review it and follow up. If the inquiry has plans or a bid package attached to it, send it
          through the project form instead.
        </p>
      </FormStatus>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div ref={statusRef}>{status === 'error' && message ? <FormStatus tone="error">{message}</FormStatus> : null}</div>

      <fieldset disabled={status === 'submitting'} className="mt-6 grid gap-6 sm:grid-cols-2">
        <TextField label="Name" name="name" required autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} error={errors.name} />
        <TextField label="Company" name="company" autoComplete="organization" value={values.company} onChange={(e) => set('company', e.target.value)} error={errors.company} />
        <TextField label="Email" name="email" type="email" required autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} error={errors.email} />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} />
        <SelectField className="sm:col-span-2" label="Inquiry type" name="inquiryType" required options={INQUIRY_TYPES} placeholder="Select an inquiry type" value={values.inquiryType} onChange={(e) => set('inquiryType', e.target.value)} error={errors.inquiryType} />
        <TextArea className="sm:col-span-2" label="Message" name="message" required value={values.message} onChange={(e) => set('message', e.target.value)} error={errors.message} />
      </fieldset>

      <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm text-graphite-600">
        <input type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#C2410C]" />
        <span>
          I agree to receive calls and text messages from Vulpine about my inquiry. Message and data rates may apply.
          Reply STOP to opt out. Reply HELP for help.
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 inline-flex items-center justify-center rounded-sm bg-ink px-7 py-4 font-mono text-[0.75rem] uppercase tracking-label text-warm-50 transition-colors hover:bg-vulpine-700 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
