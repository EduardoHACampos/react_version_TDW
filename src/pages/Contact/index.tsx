import { useState, useRef } from "react";
import { submitContactForm } from "../../services/api";
import { toast } from "react-toastify";
import * as S from "./styles";

import Modal, { FormField } from "../../components/common/Modal";
import SectionTextBlock from "../../components/common/SectionTextBlock";
import { contactSchema } from "../../utils/schemas";
import RuneCanvas, {
  RuneCanvasHandle,
} from "../../components/common/RuneCanvas";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const runeRef = useRef<RuneCanvasHandle>(null);

  const contactModalFields: FormField[] = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "subject", label: "Subject", type: "text", required: true },
    { name: "message", label: "Message", type: "textarea", required: true },
  ];

  const handleFormSubmit = async (formData: Record<string, string>) => {
    await submitContactForm({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });

    toast.success("Message sent successfully!");
    setIsModalOpen(false);
  };

  return (
    <>
      <S.PageContainer>
        <SectionTextBlock
          mobileWidth="320px"
          desktopWidth="460px"
          title="Make Your Mark"
          p1="The frontier isn't built alone. Whether you're looking to invest, collaborate, or ride alongside us, there's a seat for you by the campfire."
          p2={
            <S.ModalTrigger
              role="button"
              tabIndex={0}
              onClick={() => setIsModalOpen(true)}
              onMouseEnter={() => runeRef.current?.kick(6)}
              onFocus={() => runeRef.current?.kick(6)}
            >
              <span className="flip-container">
                <span className="front">CONTACT</span>
                <span className="back" aria-hidden="true">
                  <RuneCanvas
                    ref={runeRef}
                    text="CONTACT"
                    size={24}
                    color="currentColor"
                  />
                </span>
              </span>
            </S.ModalTrigger>
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
