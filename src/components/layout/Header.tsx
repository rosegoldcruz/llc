import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Wordmark } from './Wordmark';
import { MobileNav } from './MobileNav';
import { NavLink } from './NavLink';
import { SubmitProjectLink } from './SubmitProjectLink';
import { nav } from '@/data/site';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-warm-300 bg-warm-50/95 backdrop-blur supports-[backdrop-filter]:bg-warm-50/80">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden font-mono text-[0.6875rem] uppercase tracking-label text-graphite-500 transition-colors hover:text-ink lg:inline-block"
          >
            Contact
          </Link>
          <SubmitProjectLink location="header" className="hidden sm:inline-flex" />
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
