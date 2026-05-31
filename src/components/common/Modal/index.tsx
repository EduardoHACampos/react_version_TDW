import { ReactNode, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { ZodSchema } from "zod";
import * as S from "./styles";
import { ApiClientError } from "../../../services/httpClient";

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
  onSubmit: (formData: Record<string, string>) => Promise<void | string>;
  successMessage?: string;
  errorMessage?: string;
  validationSchema?: ZodSchema;
  footerContent?: ReactNode;
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
  validationSchema,
  footerContent,
}: ModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState(errorMessage);
  const [resolvedSuccessMessage, setResolvedSuccessMessage] = useState(
    successMessage,
  );
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
      setErrors({});
      setSubmissionMessage(errorMessage);
      setResolvedSuccessMessage(successMessage);
      setSubmissionStatus("idle");
    }
  }, [isOpen, fields, errorMessage, successMessage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (submissionStatus === "error") {
      setSubmissionStatus("idle");
      setSubmissionMessage(errorMessage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const sanitizedFormData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, value.trim()]),
    ) as Record<string, string>;

    if (validationSchema) {
      const result = validationSchema.safeParse(sanitizedFormData);

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

    setFormData(sanitizedFormData);
    setErrors({});
    setIsSubmitting(true);
    setSubmissionStatus("idle");

    try {
      const result = await onSubmit(sanitizedFormData);
      setResolvedSuccessMessage(
        typeof result === "string" && result.trim() ? result.trim() : successMessage,
      );
      setSubmissionStatus("success");
    } catch (error) {
      if (error instanceof ApiClientError && error.fieldErrors) {
        const hasFieldErrors = Object.keys(error.fieldErrors).length > 0;

        if (hasFieldErrors) {
          setErrors((prev) => ({ ...prev, ...error.fieldErrors }));
          setSubmissionMessage("Please review the highlighted fields.");
        } else {
          setSubmissionMessage(error.message);
        }
      } else if (error instanceof Error && error.message) {
        setSubmissionMessage(error.message);
      } else {
        setSubmissionMessage(errorMessage);
      }

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

            {submissionStatus !== "success" && (
              <>
                {submissionStatus === "error" && (
                  <S.FeedbackMessage type="error">
                    {submissionMessage}
                  </S.FeedbackMessage>
                )}

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
              </>
            )}

            {submissionStatus === "success" && (
              <S.FeedbackMessage type="success">
                {resolvedSuccessMessage}
              </S.FeedbackMessage>
            )}

            {footerContent && <S.FooterContent>{footerContent}</S.FooterContent>}
          </S.ModalContainer>
        </S.Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;
