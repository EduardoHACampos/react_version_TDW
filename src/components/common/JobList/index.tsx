import { useState, useEffect } from "react";
import { getJobs, Job } from "../../../services/api";
import * as S from "./styles.ts";
import arrowIcon from "../../../assets/Vector2.svg"; 

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
        setJobs(allJobs.filter((job) => job.isActive));
      } catch (err) {
        setError("Failed to load opportunities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <S.StatusMessage>Loading jobs...</S.StatusMessage>;
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
