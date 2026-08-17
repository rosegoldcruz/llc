'use client';

import { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PROJECT_TYPES, SCOPE_OPTIONS, projectSubmissionSchema, fieldErrors } from '@/lib/schemas';
import { track } from '@/lib/analytics';
import { TextField, TextArea, SelectField, CheckboxGroup, Honeypot, FormStatus } from './Field';
import { FileUpload, type UploadedFile } from './FileUpload';
import { SubmissionSuccess } from './SubmissionSuccess';

const initial = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  projectName: '',
  projectAddress: '',
  city: '',
  state: '',
  zip: '',
  projectType: '',
  unitCount: '',
  bidDueDate: '',
  notes: '',
};

export function ProjectSubmissionForm() {
  const [values, setValues] = useState(initial);
  const [scope, setScope] = useState<string[]>([]);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const searchParams = useSearchParams();
  const intent = searchParams.get('intent') === 'bid' ? 'bid' : '';
  const started = useRef(false);
  const errorRef = useRef<HTMLDivElement>(null);

  function set(field: keyof typeof initial, value: string) {
    if (!started.current) {
      started.current = true;
      track('submit_project_started');
    }
    setValues((v) => ({ ...v, [field]: value }));
    setErrors((e) => (e[field] ? { ...e, [field]: '' } : e));
  }

  function toggleScope(option: string) {
    setScope((current) =>
      current.includes(option) ? current.filter((s) => s !== option) : [...current, option],
    );
    setErrors((e) => (e.scope ? { ...e, scope: '' } : e));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');

    const payload = { ...values, scope, files, smsConsent, intent, website: honeypot };
    const parsed = projectSubmissionSchema.safeParse(payload);

    if (!parsed.success) {
      const next = fieldErrors(parsed.error);
      setErrors(next);
      setStatus('error');
      setMessage('Check the highlighted fields and submit again.');
      errorRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
        fields?: Record<string, string>;
      };

      if (!response.ok) {
        if (result.fields) setErrors(result.fields);
        setStatus('error');
        setMessage(result.error ?? 'The submission could not be sent. Try again in a moment.');
        errorRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        return;
      }

      track('submit_project_completed', {
        projectType: parsed.data.projectType,
        files: files.length,
        source: intent === 'bid' ? 'invite_to_bid' : 'submit_project',
      });
      setStatus('success');
    } catch {
      setStatus('error');
      setMessage('The submission could not be sent. Check your connection and try again.');
    }
  }

  if (status === 'success') {
    return <SubmissionSuccess projectName={values.projectName} />;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      <div ref={errorRef}>
        {status === 'error' && message ? <FormStatus tone="error">{message}</FormStatus> : null}
      </div>

      <fieldset className="mt-8" disabled={status === 'submitting'}>
        <legend className="eyebrow border-b border-warm-300 pb-3 w-full">Contact</legend>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <TextField label="First name" name="firstName" required autoComplete="given-name" value={values.firstName} onChange={(e) => set('firstName', e.target.value)} error={errors.firstName} />
          <TextField label="Last name" name="lastName" required autoComplete="family-name" value={values.lastName} onChange={(e) => set('lastName', e.target.value)} error={errors.lastName} />
          <TextField label="Company" name="company" required autoComplete="organization" value={values.company} onChange={(e) => set('company', e.target.value)} error={errors.company} />
          <TextField label="Email" name="email" type="email" required autoComplete="email" inputMode="email" value={values.email} onChange={(e) => set('email', e.target.value)} error={errors.email} />
          <TextField label="Phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" value={values.phone} onChange={(e) => set('phone', e.target.value)} error={errors.phone} />
        </div>
      </fieldset>

      <fieldset className="mt-12" disabled={status === 'submitting'}>
        <legend className="eyebrow border-b border-warm-300 pb-3 w-full">Project</legend>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <TextField className="sm:col-span-2" label="Project name" name="projectName" required value={values.projectName} onChange={(e) => set('projectName', e.target.value)} error={errors.projectName} />
          <TextField className="sm:col-span-2" label="Project address" name="projectAddress" value={values.projectAddress} onChange={(e) => set('projectAddress', e.target.value)} error={errors.projectAddress} />
          <TextField label="City" name="city" value={values.city} onChange={(e) => set('city', e.target.value)} error={errors.city} />
          <div className="grid grid-cols-2 gap-6">
            <TextField label="State" name="state" value={values.state} onChange={(e) => set('state', e.target.value)} error={errors.state} />
            <TextField label="ZIP" name="zip" inputMode="numeric" value={values.zip} onChange={(e) => set('zip', e.target.value)} error={errors.zip} />
          </div>
          <SelectField label="Project type" name="projectType" required options={PROJECT_TYPES} placeholder="Select a project type" value={values.projectType} onChange={(e) => set('projectType', e.target.value)} error={errors.projectType} />
          <TextField label="Approximate unit count" name="unitCount" inputMode="numeric" value={values.unitCount} onChange={(e) => set('unitCount', e.target.value)} error={errors.unitCount} />
          <TextField label="Bid due date" name="bidDueDate" type="date" value={values.bidDueDate} onChange={(e) => set('bidDueDate', e.target.value)} error={errors.bidDueDate} />
        </div>

        <CheckboxGroup className="mt-8" label="Product / scope needed" required options={SCOPE_OPTIONS} selected={scope} onToggle={toggleScope} error={errors.scope} />

        <TextArea className="mt-8" label="Project notes" name="notes" value={values.notes} onChange={(e) => set('notes', e.target.value)} error={errors.notes} hint="Scope boundaries, specification references, phasing, or anything else worth knowing up front." />
      </fieldset>

      <fieldset className="mt-12" disabled={status === 'submitting'}>
        <legend className="eyebrow border-b border-warm-300 pb-3 w-full">Documents</legend>
        <div className="mt-6">
          <FileUpload onChange={setFiles} onBusyChange={setUploading} />
        </div>
      </fieldset>

      <label className="mt-10 flex cursor-pointer items-start gap-3 text-sm text-graphite-600">
        <input type="checkbox" checked={smsConsent} onChange={(e) => setSmsConsent(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#C2410C]" />
        <span>
          I agree to receive calls and text messages from Vulpine about this inquiry. Message and data rates may
          apply. Reply STOP to opt out. Reply HELP for help.
        </span>
      </label>

      <div className="mt-10 flex flex-col gap-4 border-t border-warm-300 pt-8 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting' || uploading}
          className="inline-flex items-center justify-center rounded-sm bg-ink px-7 py-4 font-mono text-[0.75rem] uppercase tracking-label text-warm-50 transition-colors hover:bg-vulpine-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === 'submitting' ? 'Sending…' : 'Submit Project'}
        </button>
        {uploading ? <p className="text-sm text-graphite-500">Waiting for uploads to finish…</p> : null}
      </div>
    </form>
  );
}
