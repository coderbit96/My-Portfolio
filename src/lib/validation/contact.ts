import { z } from "zod";

/**
 * Shared contact-form schema, used by both the client form (React Hook
 * Form's zodResolver) and the /api/contact route handler, so validation
 * rules exist in exactly one place.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(100, "Name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .email("Enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(3, "Give it a short subject.")
    .max(150, "Subject is too long."),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(5000, "Message is too long."),
  // Honeypot: real visitors never see or fill this field. Deliberately not
  // constrained here (a length limit would make Zod reject the request
  // outright) — the route handler checks this value itself so it can
  // return a normal-looking success response instead of an error, which
  // would tip a bot off that it was detected.
  company: z.string().optional().or(z.literal(""))
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
