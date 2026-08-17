import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { site, contact, footerNav } from '@/data/site';
import { EmailLink, PhoneLink } from './ContactLink';

export function Footer() {
  const year = new Date().getFullYear();
  const hasContact = Boolean(contact.email || contact.phone || contact.address.length);

  return (
    <footer className="on-dark border-t border-white/10 bg-graphite-900 text-warm-300">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-2xl font-bold tracking-tightest text-warm-50">
              Vulpine<span className="text-vulpine">.</span>
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-warm-400">{site.tagline}</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-warm-300">{site.shortDescription}</p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} className="lg:col-span-2" aria-label={group.heading}>
              <h2 className="eyebrow-dark">{group.heading}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-warm-300 transition-colors hover:text-vulpine">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-3">
            <h2 className="eyebrow-dark">Contact</h2>
            {hasContact ? (
              <address className="mt-5 space-y-3 text-sm not-italic text-warm-300">
                {contact.email ? (
                  <p>
                    <EmailLink email={contact.email} />
                  </p>
                ) : null}
                {contact.phone && contact.phoneDisplay ? (
                  <p>
                    <PhoneLink phone={contact.phone} display={contact.phoneDisplay} />
                  </p>
                ) : null}
                {contact.address.length ? (
                  <p className="leading-relaxed">
                    {contact.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                ) : null}
              </address>
            ) : (
              <p className="mt-5 text-sm text-warm-300">
                <Link href="/contact" className="underline underline-offset-4 hover:text-vulpine">
                  Send a message
                </Link>
              </p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 font-mono text-[0.6875rem] uppercase tracking-label text-warm-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.legalName || site.name}. All rights reserved.
          </p>
          <p>Interior finishes supply</p>
        </div>
      </Container>
    </footer>
  );
}
