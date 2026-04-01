import styled from "styled-components";
import { motion } from "framer-motion"; // 1. Importar o 'motion'

export const AppWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const MainContent = styled.main<{ bgImage: string }>`
  display: flex;
  flex-direction: column;

  background-image: url(${({ bgImage }) => bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;
