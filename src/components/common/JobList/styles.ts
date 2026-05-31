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
  min-width: 0;
`;

export const JobTitle = styled.h3`
  font-family: var(--font-primary);
  font-size: 1.25rem;
  letter-spacing: 1.5px;
  font-weight: 400;
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const JobDescription = styled.p`
  letter-spacing: 1.5px;
  font-size: 1rem;
  color: var(--color-text-light);
  overflow-wrap: anywhere;
  word-break: break-word;
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
  overflow-wrap: anywhere;
  word-break: break-word;
`;

export const PaginationNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

export const PageButton = styled.button<{ $isActive: boolean }>`
  width: 38px;
  height: 38px;
  border-radius: 6px;
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? "var(--color-primary-text)" : "rgba(255, 221, 150, 0.55)"};
  background: ${({ $isActive }) =>
    $isActive ? "var(--color-hover-purple)" : "rgba(167, 150, 255, 0.08)"};
  color: ${({ $isActive }) =>
    $isActive ? "var(--color-primary-text)" : "var(--color-text-light)"};
  font-family: var(--font-heading);
  font-size: 1rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: ${({ $isActive }) =>
    $isActive ? "0 0 12px rgba(167, 150, 255, 0.32)" : "none"};

  &:hover {
    border-color: var(--color-primary-text);
    background: ${({ $isActive }) =>
      $isActive ? "var(--color-hover-purple)" : "rgba(167, 150, 255, 0.18)"};
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary-text);
    outline-offset: 2px;
  }
`;
