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
  message: z.string().min(10, "Message must be at least 10 characters"),
});

/* * Apply Form Schema
 * Validation rules for the Job Application form.
 */
export const applicationSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
  portfolioLink: z.string().url("Invalid URL"),
  message: z.string().min(10, "Message is too short"),
});
