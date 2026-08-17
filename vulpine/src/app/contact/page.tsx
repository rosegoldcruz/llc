import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ContactForm } from '@/components/forms/ContactForm';
import { EmailLink, PhoneLink } from '@/components/layout/ContactLink';
import { contact } from '@/data/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact',
  description:
    'Contact Vulpine about interior finishes supply, project pricing, bid invitations, or partnership opportunities.',
  path: '/contact',
});

export default function ContactPage() {
  const hasDetails = Boolean(contact.email || contact.phone || contact.address.length);

  return (
    <section className="bg-warm-50 py-12 lg:py-16">
      <Container>
        <Breadcrumbs trail={[{ label: 'Contact', href: '/contact' }]} />

        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">Contact</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tightest text-ink sm:text-5xl">
              Talk to Vulpine.
            </h1>
            <p className="mt-6 leading-relaxed text-graphite-600">
              General questions, product questions, or anything that does not fit a project form.
            </p>

            {hasDetails ? (
              <address className="mt-10 space-y-4 border-t border-warm-300 pt-8 not-italic">
                {contact.email ? (
                  <div>
                    <p className="eyebrow">Email</p>
                    <p className="mt-1 text-ink">
                      <EmailLink email={contact.email} />
                    </p>
                  </div>
                ) : null}
                {contact.phone && contact.phoneDisplay ? (
                  <div>
                    <p className="eyebrow">Phone</p>
                    <p className="mt-1 text-ink">
                      <PhoneLink phone={contact.phone} display={contact.phoneDisplay} />
                    </p>
                  </div>
                ) : null}
                {contact.address.length ? (
                  <div>
                    <p className="eyebrow">Address</p>
                    <p className="mt-1 leading-relaxed text-ink">
                      {contact.address.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </p>
                  </div>
                ) : null}
              </address>
            ) : null}

            <div className="mt-10 space-y-px border border-warm-300 bg-warm-300">
              <Link href="/submit-project" className="block bg-warm-100 p-6 transition-colors hover:bg-warm-200">
                <p className="eyebrow">Have a project?</p>
                <p className="mt-2 font-display text-lg tracking-tightest text-ink">Submit a Project →</p>
                <p className="mt-2 text-sm text-graphite-600">Send plans, specifications, or a bid package.</p>
              </Link>
              <Link href="/partners#contact-partnerships" className="block bg-warm-100 p-6 transition-colors hover:bg-warm-200">
                <p className="eyebrow">Supply or partner?</p>
                <p className="mt-2 font-display text-lg tracking-tightest text-ink">Contact Partnerships →</p>
                <p className="mt-2 text-sm text-graphite-600">Manufacturing, distribution, logistics, and project relationships.</p>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
