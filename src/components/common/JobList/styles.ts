import styled from "styled-components";

export const JobListContainer = styled.section`
  width: 100%;
  color: var(--color-text-light);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 2rem 0;
  box-sizing: border-box;
`;

export const JobListTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-family: var(--font-primary);
  margin-bottom: 2rem;
`;

export const JobListUl = styled.ul`
  max-width: 800px;
  width: 100%;
  padding: 0 var(--spacing-md);
  box-sizing: border-box;
`;

export const JobCardLi = styled.li`
  width: 100%;
  border-bottom: 1px solid var(--color-text-light);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  box-sizing: border-box;

  &.first {
    border-top: 1px solid var(--color-text-light);
  }
`;

export const JobTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const JobTitle = styled.h3`
  font-family: var(--font-primary);
  font-size: 1.25rem;
  letter-spacing: 1.5px;
  font-weight: 400;
`;

export const JobDescription = styled.p`
  letter-spacing: 1.5px;
  font-size: 1rem;
  color: var(--color-text-light);
`;

export const IconButton = styled.button`
  border: 1px solid var(--color-text-light);
  background: none;
  color: var(--color-text-light);
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  img {
    width: 12px;
  }
`;

export const StatusMessage = styled.p`
  font-size: 1.5rem;
  padding: 2rem;
  text-align: center;
`;
