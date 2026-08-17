'use client';

import { useState } from 'react';
import { partnerSchema, fieldErrors, COMPANY_TYPES } from '@/lib/schemas';
import { track } from '@/lib/analytics';
import { TextField, TextArea, SelectField, Honeypot, FormStatus } from './Field';

const initial = {
  name: '',
  company: '',
  role: '',
  email: '',
  phone: '',
  companyType: '',
  marketsServed: '',
  productCategory: '',
  message: '',
};

export function PartnerForm() {
  const [values, setValues] = useState(initial);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');

  function set(field: keyof typeof initial, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => (e[field] ? { ...e, [field]: '' } : e));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = partnerSchema.safeParse({ ...values, website: honeypot });

    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus('error');
      setMessage('Check the highlighted fields and send again.');
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/partner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        setStatus('error');
        setMessage(result.error ?? 'The inquiry could not be sent. Try again in a moment.');
        return;
      }

      track('partner_inquiry_completed', { companyType: parsed.data.companyType });
      setStatus('success');
      setValues(initial);
    } catch {
      setStatus('error');
      setMessage('The inquiry could not be sent. Check your connection and try again.');
    }
  }

  if (status === 'success') {
    return (
      <FormStatus tone="success">
        <p className="font-display text-lg tracking-tightest">Inquiry sent.</p>
        <p className="mt-2 text-graphite-600">Our team will review it and follow up on next steps.</p>
      </FormStatus>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot value={honeypot} onChange={setHoneypot} />
      {status === 'error' && message ? <FormStatus tone="error">{message}</FormStatus> : null}

      <fieldset disabled={status === 'submitting'} className="mt-6 grid gap-6 sm:grid-cols-2">
        <TextField label="Name" name="name" required autoComplete="name" value={values.name} onChange={(e) => set('name', e.target.value)} error={errors.name} />
        <TextField label="Role" name="role" required autoComplete="organization-title" value={values.role} onChange={(e) => set('role', e.target.value)} error={errors.role} />
        <TextField label="Company" name="company" required autoComplete="organization" value={values.company} onChange={(e) => set('company', e.target.value)} error={errors.company} />
        <SelectField label="Company type" name="companyType" required options={COMPANY_TYPES} placeholder="Select a company type" value={values.companyType} onChange={(e) => set('companyType', e.target.value)} error={errors.companyType} />
        <TextField label="Email" name="email" type="email" required autoComplete="email" value={values.email} onChange={(e) => set('email', e.target.value)} error={errors.email} />
        <TextField label="Phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} />
        <TextField label="Markets served" name="marketsServed" value={values.marketsServed} onChange={(e) => set('marketsServed', e.target.value)} error={errors.marketsServed} hint="Regions, states, or project markets." />
        <TextField label="Product / service category" name="productCategory" value={values.productCategory} onChange={(e) => set('productCategory', e.target.value)} error={errors.productCategory} hint="Cabinets, flooring, doors, freight, and so on." />
        <TextArea className="sm:col-span-2" label="Message" name="message" required value={values.message} onChange={(e) => set('message', e.target.value)} error={errors.message} />
      </fieldset>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-8 inline-flex items-center justify-center rounded-sm bg-ink px-7 py-4 font-mono text-[0.75rem] uppercase tracking-label text-warm-50 transition-colors hover:bg-vulpine-700 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending…' : 'Contact Partnerships'}
      </button>
    </form>
  );
}
