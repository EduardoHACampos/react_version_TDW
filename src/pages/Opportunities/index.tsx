import { useState, useRef } from "react";
import { toast } from "react-toastify";
import * as S from "./styles";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import SectionTextBlock from "../../components/common/SectionTextBlock";
// import JobList from '../../components/common/JobList'; // Componente real comentado
import JobListMock from "../../components/common/JobListMockup"; //  Importar o mockup

// Interface para os dados da vaga, usada no estado do modal
interface JobData {
  id: number;
  title: string;
  description: string;
}

const Opportunities = () => {
  // 2. O estado agora espera os dados da vaga (JobData)
  const [selectedJob, setSelectedJob] = useState<JobData | null>(null);
  const jobsSectionRef = useRef<HTMLDivElement>(null);

  // 3. A função para abrir o modal agora recebe os dados do mockup
  const handleOpenModal = (job: JobData) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleScrollToJobs = () => {
    jobsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <S.IntroSection>
        <SectionTextBlock
          mobileWidth="320px"
          desktopWidth="465px"
          title="Stake Your Claim in The Dark West"
          p1="The Dark West isn’t just a game — it’s a frontier, and we need those ready to carve their name into it."
        >
        <S.ScrollButtonContainer>
          <Button text="OPPORTUNITY" onClick={handleScrollToJobs} />
          </S.ScrollButtonContainer>
        </SectionTextBlock>
      </S.IntroSection>

      <S.JobsSection ref={jobsSectionRef}>
        {/* <JobList onJobClick={handleOpenModal} /> */}{" "}
        {/* Componente real comentado */}
        <JobListMock onJobClick={handleOpenModal} /> {/* Usando o mockup */}
      </S.JobsSection>

      {/*  O Modal é configurado com os campos de formulário corretos */}
      <Modal
        isOpen={!!selectedJob}
        onClose={handleCloseModal}
        title={selectedJob?.title || ""}
        subtitle={selectedJob?.description || ""}
        fields={[
          { name: "name", label: "Name", type: "text", required: true },
          { name: "email", label: "Email", type: "email", required: true },
          { name: "portfolio", label: "Portfolio", type: "text" },
          {
            name: "message",
            label: "Message",
            type: "textarea",
            required: true,
          },
        ]}
        buttonText="Send"
        onSubmit={async (formData) => {
          // A lógica de envio real ficaria aqui
          console.log(
            `Submitting application for ${selectedJob?.title}:`,
            formData
          );
          toast.success(
            `Application for ${selectedJob?.title} sent successfully!`
          );
          handleCloseModal(); // Fecha o modal após o envio
        }}
        successMessage="Application sent successfully!"
      />
    </>
  );
};

export default Opportunities;
