import { z } from "zod";

const portfolioLinkSchema = z.string().trim().refine((value) => {
  if (!value) {
    return true;
  }

  const normalizedValue =
    value.startsWith("http://") || value.startsWith("https://")
      ? value
      : `https://${value}`;

  try {
    new URL(normalizedValue);
    return true;
  } catch {
    return false;
  }
}, "Invalid link format (use example.com or https://example.com)");

export const joinHuntSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
});

export const contactSchema = z.object({
  name: z.string().trim().min(3, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  portfolioLink: portfolioLinkSchema.optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export const applicationSchema = z.object({
  name: z.string().trim().min(3, "Name is required"),
  email: z.string().trim().email("Invalid email address"),
  portfolioLink: portfolioLinkSchema.optional(),
  message: z.string().trim().min(10, "Message is too short"),
});