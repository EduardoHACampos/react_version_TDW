import * as S from "./styles.ts";

interface SkeletonLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

const SkeletonLoader = ({ width, height, className }: SkeletonLoaderProps) => {
  return (
    <S.SkeletonWrapper width={width} height={height} className={className} />
  );
};

export default SkeletonLoader;
