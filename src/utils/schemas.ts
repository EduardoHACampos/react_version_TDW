import { z } from "zod";

const smartUrl = z
  .string()
  .transform((val) => {
    if (!val) return "";
    if (!val.startsWith("http")) {
      return `https://${val}`;
    }
    return val;
  })
  .pipe(
    z.union([
      z
        .url("Invalid URL format")
        .refine((val) => val.includes("."), {
          message: "URL must have a domain (e.g. .com)",
        }),
      z.literal(""),
    ]),
  );

export const joinHuntSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  portfolio: smartUrl.optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
