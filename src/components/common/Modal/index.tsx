import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ZodSchema } from "zod"; 
import * as S from "./styles";

import closeIcon from "../../../assets/xmark.svg";
import Button from "../Button";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  fields: FormField[];
  buttonText: string;
  onSubmit: (formData: Record<string, string>) => Promise<void>;
  successMessage?: string;
  errorMessage?: string;
  validationSchema?: ZodSchema;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  fields,
  buttonText,
  onSubmit,
  successMessage = "Sent successfully!",
  errorMessage = "An error occurred. Please try again.",
  validationSchema, // Recebendo o schema
}: ModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const initialFormState = fields.reduce(
        (acc, field) => {
          acc[field.name] = "";
          return acc;
        },
        {} as Record<string, string>,
      );
      setFormData(initialFormState);
      setErrors({}); // Limpa erros
      setSubmissionStatus("idle");
    }
  }, [isOpen, fields]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validationSchema) {
      const result = validationSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as string;
          fieldErrors[fieldName] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }
    }

    setIsSubmitting(true);
    setSubmissionStatus("idle");
    try {
      await onSubmit(formData);
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <S.Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <S.ModalContainer
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <S.CloseButton onClick={onClose} aria-label="Close modal">
              <img src={closeIcon} alt="Close" />
            </S.CloseButton>

            <S.ModalHeader>
              <h2>{title}</h2>
              {subtitle && <p>{subtitle}</p>}
            </S.ModalHeader>

            {submissionStatus !== "success" && submissionStatus !== "error" && (
              <S.Form onSubmit={handleSubmit}>
                {fields.map((field) => (
                  <S.FormGroup key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    {field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        rows={5}
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        // required={field.required}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                      />
                    )}
                    {errors[field.name] && (
                      <S.ErrorMessage>{errors[field.name]}</S.ErrorMessage>
                    )}
                  </S.FormGroup>
                ))}
                <Button
                  text={isSubmitting ? "Sending..." : buttonText}
                  type="submit"
                  disabled={isSubmitting}
                />
              </S.Form>
            )}

            {submissionStatus === "success" && (
              <S.FeedbackMessage type="success">
                {successMessage}
              </S.FeedbackMessage>
            )}
            {submissionStatus === "error" && (
              <S.FeedbackMessage type="error">{errorMessage}</S.FeedbackMessage>
            )}
          </S.ModalContainer>
        </S.Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;
