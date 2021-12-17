import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  
  background: var(--blue);

  width: 100vw;
  padding: 1rem 0 10rem;

  div {
    width: 1024px;
    max-width: 90vw;

    display: flex;
    align-items: center;
    justify-content: space-between;

    button {
      padding: 1rem 2.75rem;
      color: var(--shape);

      border-radius: var(--radius);  
      background: var(--blue-light);

      display: flex;
      align-items: center;
      justify-content: center;
        
      img {
        display: none;
        height: 1.5rem;
      }

      &:hover {
        filter: brightness(0.9);
      }
    }

    @media(max-width: 860px) {
      img {
        height: 3rem;
      }

      button {
        padding: 0.5rem;

        span {
          display: none;
        }

        img {
          display: block;
        }
      }
    }
  }
`;
