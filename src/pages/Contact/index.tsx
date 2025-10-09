import { useState } from "react";
import { submitContactForm } from "../../services/api";
import { toast } from "react-toastify";
import * as S from "./styles";

// Importando os componentes reutilizáveis necessários
import Modal, { FormField } from "../../components/common/Modal";
import SectionTextBlock from "../../components/common/SectionTextBlock";

const Contact = () => {
  // Estado para controlar a visibilidade do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Definição dos campos que o modal de contato irá renderizar
  const contactModalFields: FormField[] = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "message", label: "Message", type: "textarea", required: true },
  ];

  // Função para lidar com o envio do formulário, passada para o modal
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
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    // Usamos um fragmento para renderizar a página e o modal no mesmo nível
    <>
      <S.PageContainer>
        {/* Usando o SectionTextBlock com os textos atualizados */}
        <SectionTextBlock
          mobileWidth="320px"
          desktopWidth="460px"
          title="Make Your Mark"
          p1="The frontier isn’t built alone. Whether you’re looking to invest, collaborate, or ride alongside us, there’s a seat for you by the campfire."
          p2={
            <>
              <S.ModalTrigger onClick={() => setIsModalOpen(true)}>
                CONTACT
              </S.ModalTrigger>{" "}
            </>
          }
        />
      </S.PageContainer>

      {/* O Modal é renderizado aqui, mas controlado pelo estado 'isModalOpen' */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="CONTACT US"
        subtitle="Fill out the form below"
        fields={contactModalFields}
        buttonText="SEND"
        onSubmit={handleFormSubmit}
      />
    </>
  );
};

export default Contact;
