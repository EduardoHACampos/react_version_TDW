import { useState, useEffect } from "react";
import { getJobs, Job } from "../../../services/api";
import * as S from "./styles";
import arrowIcon from "../../../assets/Vector2.svg";
import JobCardSkeleton from "./JobCardSkeleton";

interface JobListProps {
  onJobClick: (job: Job) => void;
  jobs?: Job[]; 
}

const JOBS_PER_PAGE = 6;

const JobList = ({ onJobClick, jobs: staticJobs }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (staticJobs) {
      setJobs(staticJobs);
      setCurrentPage(1);
      setLoading(false);
      return;
    }

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const allJobs = await getJobs();
        setJobs(allJobs.filter((job) => job.isActive));
        setCurrentPage(1);
      } catch (err) {
        setError("Failed to load opportunities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [staticJobs]);

  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const pageStart = (currentPage - 1) * JOBS_PER_PAGE;
  const paginatedJobs = jobs.slice(pageStart, pageStart + JOBS_PER_PAGE);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (loading) {
    return (
      <S.JobListContainer>
        <S.JobListTitle>AVAILABLE JOBS</S.JobListTitle>
        <S.JobListUl>
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
        {paginatedJobs.map((job, index) => (
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

      {totalPages > 1 && (
        <S.PaginationNav aria-label="Jobs pages">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;

            return (
              <S.PageButton
                key={pageNumber}
                type="button"
                $isActive={isActive}
                onClick={() => setCurrentPage(pageNumber)}
                aria-label={`Go to jobs page ${pageNumber}`}
                aria-current={isActive ? "page" : undefined}
              >
                {pageNumber}
              </S.PageButton>
            );
          })}
        </S.PaginationNav>
      )}
    </S.JobListContainer>
  );
};

export default JobList;
