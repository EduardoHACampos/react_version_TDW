import { z } from "zod";

/* * Join The Hunt Schema
 * Validation for the simple newsletter signup.
 */
export const joinHuntSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
});

/* * Contact Form Schema
 * Validation rules for the General Contact form.
 */
export const contactSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().trim().min(3).max(150),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/* * Apply Form Schema
 * Validation rules for the Job Application form.
 */
export const applicationSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  portfolioLink: z
    .string()
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
      "Invalid link format (use example.com)"
    ),
  message: z.string().min(10, "Message is too short"),
});
