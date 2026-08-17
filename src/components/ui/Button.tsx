import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-sm font-mono text-[0.75rem] uppercase tracking-label transition-colors disabled:cursor-not-allowed disabled:opacity-50';

const sizes: Record<Size, string> = {
  md: 'px-5 py-3',
  lg: 'px-7 py-4',
};

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-warm-50 hover:bg-vulpine-700',
  secondary: 'border border-graphite-600/30 text-ink hover:border-ink hover:bg-warm-100',
  ghost: 'text-ink underline underline-offset-4 hover:text-vulpine-700',
  onDark: 'bg-vulpine text-ink hover:bg-warm-50',
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps & { href: string } & React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}
