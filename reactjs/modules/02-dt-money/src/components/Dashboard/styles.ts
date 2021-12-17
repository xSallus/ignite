import styled from 'styled-components';

export const Container = styled.main`
  width: 1024px;
  max-width: 90vw;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: -10vh auto 0;

  overflow: auto hidden;

  section {
    width: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  @media(max-width: 860px) {
    margin-top: -14vh;

    section {
      flex-direction: column;
      gap: 1rem;
    }
  }
`;