import * as S from "./styles";
import loaderImage from "../../../assets/TheDarkWest_TextOnly-loader.webp";

const Loader = () => {
  return (
    <S.LoaderContainer>
      <S.LoaderImage src={loaderImage} alt="Loading..." />
    </S.LoaderContainer>
  );
};

export default Loader;
