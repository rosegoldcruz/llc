import { cn } from '@/lib/cn';

export function Container({
  children,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer' | 'nav' | 'main';
}) {
  return (
    <Tag className={cn('mx-auto w-full max-w-container px-5 sm:px-8 lg:px-12', className)}>
      {children}
    </Tag>
  );
}
