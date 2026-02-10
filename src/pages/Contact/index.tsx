import { useState } from "react";
import { submitContactForm } from "../../services/api";
import { toast } from "react-toastify";
import * as S from "./styles";

// Importando os componentes reutilizáveis necessários
import Modal, { FormField } from "../../components/common/Modal";
import SectionTextBlock from "../../components/common/SectionTextBlock";
import { contactSchema } from "../../utils/schemas";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const contactModalFields: FormField[] = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "message", label: "Message", type: "textarea", required: true },
  ];

  const handleFormSubmit = async (formData: Record<string, string>) => {
    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      toast.success("Message sent successfully!");
      setIsModalOpen(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <S.PageContainer>
        <SectionTextBlock
          mobileWidth="320px"
          desktopWidth="460px"
          title="Make Your Mark"
          p1="The frontier isn’t built alone. Whether you’re looking to invest, collaborate, or ride alongside us, there’s a seat for you by the campfire."
          p2={
            <>
              {/* 👇 ESTRUTURA NOVA: FLIP CONTAINER NO MEIO DO TEXTO */}
              <S.ModalTrigger onClick={() => setIsModalOpen(true)}>
                <span className="flip-container">
                  <span className="front">CONTACT</span>
                  <span className="back">CONTACT</span>
                </span>
              </S.ModalTrigger>{" "}
            </>
          }
        />
      </S.PageContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="CONTACT US"
        subtitle="Fill out the form below"
        fields={contactModalFields}
        buttonText="SEND"
        onSubmit={handleFormSubmit}
        validationSchema={contactSchema}
      />
    </>
  );
};

export default Contact;
