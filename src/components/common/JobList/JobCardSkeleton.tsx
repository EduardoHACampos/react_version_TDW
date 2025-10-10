import SkeletonLoader from "../SkeletonLoader";
import * as S from "./styles";

const JobCardSkeleton = () => {
  return (
    // Usa o mesmo container da vaga real para manter o layout
    <S.JobCardLi>
      <S.JobTextContainer>
        {/* Skeletons para o título e descrição com larguras aproximadas */}
        <SkeletonLoader width="250px" height="20px" />
        <SkeletonLoader width="350px" height="16px" />
      </S.JobTextContainer>
      {/* Skeleton para o botão */}
      <SkeletonLoader width="32px" height="32px" />
    </S.JobCardLi>
  );
};

export default JobCardSkeleton;
