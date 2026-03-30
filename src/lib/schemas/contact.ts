import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid work email"),
  company: z.string(),
  headache: z.string().min(10, "Please tell us more (at least 10 characters)"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
