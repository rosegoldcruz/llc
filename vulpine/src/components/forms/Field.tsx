'use client';

import { useId } from 'react';
import { cn } from '@/lib/cn';

type Common = {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
};

const controlStyles =
  'mt-2 w-full rounded-sm border bg-warm-50 px-3.5 py-3 text-base text-ink transition-colors placeholder:text-warm-400 focus:border-ink';

function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="eyebrow block">
      {label}
      {required ? (
        <span className="ml-1 text-vulpine-700" aria-hidden="true">
          *
        </span>
      ) : (
        <span className="ml-1 normal-case tracking-normal text-warm-400">(optional)</span>
      )}
    </label>
  );
}

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-vulpine-800">
      {message}
    </p>
  );
}

export function TextField({
  label,
  name,
  error,
  required,
  hint,
  className,
  ...rest
}: Common & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlStyles, error ? 'border-vulpine-700' : 'border-warm-300')}
        {...rest}
      />
      {hint ? <p className="mt-2 text-xs text-graphite-500">{hint}</p> : null}
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function TextArea({
  label,
  name,
  error,
  required,
  hint,
  className,
  ...rest
}: Common & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlStyles, 'resize-y', error ? 'border-vulpine-700' : 'border-warm-300')}
        {...rest}
      />
      {hint ? <p className="mt-2 text-xs text-graphite-500">{hint}</p> : null}
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  error,
  required,
  options,
  placeholder,
  className,
  ...rest
}: Common & { options: readonly string[]; placeholder?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <select
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(controlStyles, error ? 'border-vulpine-700' : 'border-warm-300')}
        {...rest}
      >
        <option value="">{placeholder ?? 'Select an option'}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ErrorText id={errorId} message={error} />
    </div>
  );
}

export function CheckboxGroup({
  label,
  error,
  options,
  selected,
  onToggle,
  required,
  className,
}: {
  label: string;
  error?: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  required?: boolean;
  className?: string;
}) {
  return (
    <fieldset className={className}>
      <legend className="eyebrow">
        {label}
        {required ? (
          <span className="ml-1 text-vulpine-700" aria-hidden="true">
            *
          </span>
        ) : null}
      </legend>
      <div className="mt-3 grid gap-px border border-warm-300 bg-warm-300 sm:grid-cols-2">
        {options.map((option) => {
          const checked = selected.includes(option);
          return (
            <label
              key={option}
              className={cn(
                'flex cursor-pointer items-center gap-3 bg-warm-50 px-4 py-3 text-sm transition-colors hover:bg-warm-100',
                checked && 'bg-warm-100',
              )}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggle(option)}
                className="h-4 w-4 shrink-0 accent-[#C2410C]"
              />
              <span className="text-ink">{option}</span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-sm text-vulpine-800">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/** Anti-spam honeypot. Hidden from sighted users and from assistive tech. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export function FormStatus({ tone, children }: { tone: 'error' | 'success'; children: React.ReactNode }) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'border-l-2 px-4 py-3 text-sm',
        tone === 'error' ? 'border-vulpine-700 bg-vulpine/5 text-vulpine-900' : 'border-ink bg-warm-100 text-ink',
      )}
    >
      {children}
    </div>
  );
}
