import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import * as S from "./styles";

import closeIcon from "../../../assets/xmark.svg";
import Button from "../Button";

// --- Tipagem para a configuração dinâmica do Modal ---

// Define o tipo de cada campo do formulário
export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  placeholder?: string;
  required?: boolean;
}

// Define todas as props que o Modal pode receber
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
}

const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  fields,
  buttonText,
  onSubmit,
  successMessage = "Enviado com sucesso!",
  errorMessage = "Ocorreu um erro. Tente novamente.",
}: ModalProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Reseta o formulário quando o modal é fechado ou reaberto
  useEffect(() => {
    if (isOpen) {
      const initialFormState = fields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {} as Record<string, string>);
      setFormData(initialFormState);
      setSubmissionStatus("idle");
    }
  }, [isOpen, fields]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
            <S.CloseButton onClick={onClose} aria-label="Fechar modal">
              <img src={closeIcon} alt="Fechar" />
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
                        required={field.required}
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
                        required={field.required}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                      />
                    )}
                  </S.FormGroup>
                ))}
                <Button
                  text={isSubmitting ? "Enviando..." : buttonText}
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
