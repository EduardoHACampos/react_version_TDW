import { useState, useEffect } from "react";
import { getJobs, Job } from "../../../services/api";
import * as S from "./styles";
import arrowIcon from "../../../assets/Vector2.svg";
import JobCardSkeleton from "./JobCardSkeleton"; // Importar o skeleton

interface JobListProps {
  onJobClick: (job: Job) => void;
}

const JobList = ({ onJobClick }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const allJobs = await getJobs();

        // Simula um tempo de carregamento de 1.5 segundos para que possamos ver o skeleton
        setTimeout(() => {
          setJobs(allJobs.filter((job) => job.isActive));
          setLoading(false);
        }, 1500); // 1.5 segundos de delay para simulação
      } catch (err) {
        setError("Failed to load opportunities. Please try again later.");
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Enquanto estiver carregando, renderiza uma lista de skeletons
  if (loading) {
    return (
      <S.JobListContainer>
        <S.JobListTitle>AVAILABLE JOBS</S.JobListTitle>
        <S.JobListUl>
          {/* Cria um array com 3 itens e renderiza um skeleton para cada */}
          {[...Array(3)].map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </S.JobListUl>
      </S.JobListContainer>
    );
  }

  if (error) {
    return <S.StatusMessage>{error}</S.StatusMessage>;
  }

  if (jobs.length === 0) {
    return (
      <S.StatusMessage>No open opportunities at this time.</S.StatusMessage>
    );
  }

  return (
    <S.JobListContainer>
      <S.JobListTitle>AVAILABLE JOBS</S.JobListTitle>
      <S.JobListUl>
        {jobs.map((job, index) => (
          <S.JobCardLi key={job.id} className={index === 0 ? "first" : ""}>
            <S.JobTextContainer>
              <S.JobTitle>{job.title}</S.JobTitle>
              <S.JobDescription>{job.description}</S.JobDescription>
            </S.JobTextContainer>
            <S.IconButton onClick={() => onJobClick(job)}>
              <img src={arrowIcon} alt="Apply for job" />
            </S.IconButton>
          </S.JobCardLi>
        ))}
      </S.JobListUl>
    </S.JobListContainer>
  );
};

export default JobList;
