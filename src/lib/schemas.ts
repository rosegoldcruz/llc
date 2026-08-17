import { z } from 'zod';

export const PROJECT_TYPES = [
  'Multifamily',
  'Apartment Renovation',
  'New Construction',
  'Commercial',
  'Hospitality',
  'Senior Living',
  'Residential Builder',
  'Other',
] as const;

export const SCOPE_OPTIONS = [
  'Cabinets',
  'Vanities',
  'Countertops',
  'Doors',
  'Windows',
  'Flooring',
  'Wall Panels',
  'Trim & Molding',
  'Multiple Categories',
  'Other',
] as const;

export const INQUIRY_TYPES = [
  'Project Inquiry',
  'Bid Invitation',
  'Product Question',
  'Partnership',
  'General',
] as const;

export const COMPANY_TYPES = [
  'Manufacturer',
  'Distributor',
  'Logistics Provider',
  'Product Representative',
  'Installer / Service Relationship',
  'Builder',
  'Developer',
  'General Contractor',
  'Procurement Professional',
  'Referral / Business Partner',
  'Other',
] as const;

export const ALLOWED_UPLOAD_TYPES: Record<string, string[]> = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'application/zip': ['.zip'],
  'application/x-zip-compressed': ['.zip'],
};

export const ALLOWED_UPLOAD_EXTENSIONS = ['.pdf', '.xlsx', '.xls', '.docx', '.zip'];

/**
 * Per-file limit. Files go browser -> Vercel Blob directly, so this is NOT
 * bound by the ~4.5 MB serverless request body limit. If the deployment target
 * changes, lower this to match what that platform can actually accept.
 */
export const MAX_FILE_BYTES = 50 * 1024 * 1024; // 50 MB
export const MAX_FILES = 8;

const requiredText = (label: string, max = 200) =>
  z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);

const optionalText = (max = 2000) => z.string().trim().max(max).optional().or(z.literal(''));

export const uploadedFileSchema = z.object({
  name: z.string().min(1).max(300),
  url: z.string().url(),
  size: z.number().int().nonnegative(),
});

export const projectSubmissionSchema = z.object({
  firstName: requiredText('First name', 80),
  lastName: requiredText('Last name', 80),
  company: requiredText('Company', 160),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(200),
  phone: requiredText('Phone', 40),
  projectName: requiredText('Project name', 200),
  projectAddress: optionalText(240),
  city: optionalText(120),
  state: optionalText(60),
  zip: optionalText(20),
  projectType: z.enum(PROJECT_TYPES, { errorMap: () => ({ message: 'Select a project type.' }) }),
  unitCount: optionalText(20),
  scope: z.array(z.enum(SCOPE_OPTIONS)).min(1, 'Select at least one scope category.'),
  bidDueDate: optionalText(40),
  notes: optionalText(5000),
  files: z.array(uploadedFileSchema).max(MAX_FILES).optional().default([]),
  smsConsent: z.boolean().optional().default(false),
  /** Set when the visitor arrived via an Invite Vulpine to Bid link. */
  intent: optionalText(20),
  /** Anti-spam. Must stay empty. */
  website: z.literal('').optional(),
});

export type ProjectSubmission = z.infer<typeof projectSubmissionSchema>;

export const contactSchema = z.object({
  name: requiredText('Name', 160),
  company: optionalText(160),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(200),
  phone: optionalText(40),
  inquiryType: z.enum(INQUIRY_TYPES, { errorMap: () => ({ message: 'Select an inquiry type.' }) }),
  message: requiredText('Message', 5000).pipe(z.string().min(10, 'Add a little more detail.')),
  smsConsent: z.boolean().optional().default(false),
  website: z.literal('').optional(),
});

export type ContactMessage = z.infer<typeof contactSchema>;

export const partnerSchema = z.object({
  name: requiredText('Name', 160),
  company: requiredText('Company', 160),
  role: requiredText('Role', 120),
  email: z.string().trim().toLowerCase().email('Enter a valid email address.').max(200),
  phone: optionalText(40),
  companyType: z.enum(COMPANY_TYPES, { errorMap: () => ({ message: 'Select a company type.' }) }),
  marketsServed: optionalText(400),
  productCategory: optionalText(400),
  message: requiredText('Message', 5000).pipe(z.string().min(10, 'Add a little more detail.')),
  website: z.literal('').optional(),
});

export type PartnerInquiry = z.infer<typeof partnerSchema>;

/** Turns a ZodError into a { field: message } map for the forms. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !out[key]) out[key] = issue.message;
  }
  return out;
}
