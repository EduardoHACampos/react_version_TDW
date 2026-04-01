import SkeletonLoader from "../SkeletonLoader";
import * as S from "./styles";

const JobCardSkeleton = () => {
  return (
    <S.JobCardLi>
      <S.JobTextContainer>
        <SkeletonLoader width="250px" height="20px" />
        <SkeletonLoader width="350px" height="16px" />
      </S.JobTextContainer>
      <SkeletonLoader width="32px" height="32px" />
    </S.JobCardLi>
  );
};

export default JobCardSkeleton;
