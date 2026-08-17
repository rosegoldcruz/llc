'use client';

/**
 * Analytics boundary.
 *
 * No tracking library is installed. This is the single place events are
 * emitted from, so adding a provider later means editing one file. Events go
 * to window.dataLayer (GTM) and window.va (Vercel Analytics) when either is
 * present, and are silently dropped when neither is.
 */

export type AnalyticsEvent =
  | 'submit_project_click'
  | 'submit_project_started'
  | 'submit_project_completed'
  | 'contact_completed'
  | 'partner_inquiry_completed'
  | 'invite_to_bid_click'
  | 'phone_click'
  | 'email_click';

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    va?: (event: string, name: string, props?: Props) => void;
  }
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === 'undefined') return;

  try {
    window.dataLayer?.push({ event, ...props });
    window.va?.('event', event, props);
  } catch {
    // Analytics must never break the page.
  }
}
