import * as S from "./styles";
import arrowIcon from "../../../assets/Vector2.svg"; // Ícone para o botão

// Interface para definir a estrutura dos dados de uma vaga (job)
interface MockJob {
  id: number;
  title: string;
  description: string;
}

// Props que o componente receberá 
interface JobListMockProps {
  onJobClick: (job: MockJob) => void;
}

// Dados estáticos para o mockup, conforme solicitado
const jobListMock: MockJob[] = [
  {
    id: 1,
    title: "Content Partners",
    description: "Shape the myth, tame the wild.",
  },
  {
    id: 2,
    title: "Investors",
    description: "Stake your claim, steer the frontier.",
  },
  {
    id: 3,
    title: "Founders",
    description: "Help steer the Dark West into legend.",
  },
];

const JobListMock = ({ onJobClick }: JobListMockProps) => {
  return (
    <S.JobListContainer>
      <S.JobListTitle>AVAILABLE JOBS</S.JobListTitle>
      <S.JobListUl>
        {jobListMock.map((job, index) => (
          <S.JobCardLi key={job.id} className={index === 0 ? "first" : ""}>
            <S.JobTextContainer>
              <S.JobTitle>{job.title}</S.JobTitle>
              <S.JobDescription>{job.description}</S.JobDescription>
            </S.JobTextContainer>
            <S.IconButton onClick={() => onJobClick(job)}>
              <img src={arrowIcon} alt={`Apply for ${job.title}`} />
            </S.IconButton>
          </S.JobCardLi>
        ))}
      </S.JobListUl>
    </S.JobListContainer>
  );
};

export default JobListMock;
