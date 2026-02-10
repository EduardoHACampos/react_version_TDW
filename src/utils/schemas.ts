import { z } from "zod";

/* * Join The Hunt Schema
 * Validation for the simple newsletter signup.
 * Esquema "Join The Hunt"
 * Validação para o cadastro simples na newsletter.
 */
export const joinHuntSchema = z.object({
  name: z.string().min(2, "Name is required / Nome é obrigatório"),
  email: z.string().email("Invalid email address / Endereço de email inválido"),
});

/* * Contact Form Schema
 * Validation rules for the General Contact form.
 * Esquema do Formulário de Contato
 * Regras de validação para o formulário de Contato Geral.
 */
export const contactSchema = z.object({
  name: z.string().min(3, "Name is required / Nome é obrigatório"),
  email: z.string().email("Invalid email / Email inválido"),
  message: z
    .string()
    .min(
      10,
      "Message must be at least 10 characters / Mensagem deve ter pelo menos 10 caracteres",
    ),
});

/* * Apply Form Schema
 * Validation rules for the Job Application form.
 * Esquema do Formulário de Candidatura
 * Regras de validação para o formulário de Vagas.
 */
export const applicationSchema = z.object({
  name: z.string().min(3, "Name is required / Nome é obrigatório"),
  email: z.string().email("Invalid email / Email inválido"),
  portfolioLink: z.string().url("Invalid URL / URL inválida"),
  message: z.string().min(10, "Message is too short / Mensagem muito curta"),
});
