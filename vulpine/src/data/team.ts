export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public/images/team. Null renders initials instead. */
  headshot: string | null;
  linkedin?: string;
};

/**
 * TEAM
 *
 * Intentionally empty until titles, bios, and headshots are approved.
 *
 * The team section on /about hides itself entirely while this array is empty —
 * no placeholder faces, no invented titles.
 *
 * Approved for inclusion once copy is signed off (per brief): Daniel Cruz and
 * Mike Musonda. Fill in the exact role and a 2-3 sentence bio for each, drop
 * headshots in /public/images/team, and uncomment:
 *
 * {
 *   name: 'Daniel Cruz',
 *   role: '',                     // exact approved title
 *   bio: '',                      // 2-3 sentences, approved copy
 *   headshot: '/images/team/daniel-cruz.jpg',
 *   linkedin: '',
 * },
 * {
 *   name: 'Mike Musonda',
 *   role: '',
 *   bio: '',
 *   headshot: '/images/team/mike-musonda.jpg',
 *   linkedin: '',
 * },
 */
export const team: TeamMember[] = [];
