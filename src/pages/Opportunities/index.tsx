import { useState, useRef } from "react";
import { toast } from "react-toastify";
import * as S from "./styles";
import Modal, { FormField } from "../../components/common/Modal";
import Button from "../../components/common/Button";
import SectionTextBlock from "../../components/common/SectionTextBlock";
import JobList from "../../components/common/JobList"; // Importa o componente unificado
import { Job } from "../../services/api"; // Importa a interface Job

const Opportunities = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const jobsSectionRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const handleScrollToJobs = () => {
    jobsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const modalFields: FormField[] = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "portfolio", label: "Portfolio", type: "text" },
    { name: "message", label: "Message", type: "textarea", required: true },
  ];

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
        <JobList onJobClick={handleOpenModal} />
      </S.JobsSection>

      <Modal
        isOpen={!!selectedJob}
        onClose={handleCloseModal}
        title={selectedJob?.title || ""}
        subtitle={selectedJob?.description || ""}
        fields={modalFields}
        buttonText="Send"
        onSubmit={async (formData) => {
          console.log(
            `Submitting application for ${selectedJob?.title}:`,
            formData
          );
          toast.success(
            `Application for ${selectedJob?.title} sent successfully!`
          );
          handleCloseModal();
        }}
        successMessage="Application sent successfully!"
      />
    </>
  );
};

export default Opportunities;
