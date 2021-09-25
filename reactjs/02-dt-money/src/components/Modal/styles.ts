import styled from 'styled-components';

export const Container = styled.div`
  width: 25rem;
  max-width: 90vw;
  height: 27rem;
  max-height: 90vh;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  background: var(--shape);
  border-radius: var(--radius);

  & > div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    h2 {
      font-size: 1.5rem;
      color: var(--text);
    }

    & > button {
      height: 1.5rem;
      width: 1.5rem;
      background: rgba(0,0,0,0);
      border: none;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0;

      img {
        margin: -2px 2px 0;
        height: 1rem;
      }

      &:hover {
        img {
          filter: sepia(15) saturate(15) hue-rotate(90deg);
        }
      }
    }
  }

  form {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      width: 100%;
      height: 2.4rem;
      padding: 0 0.7rem;
      border-radius: var(--radius);

      background: var(--shape);
      border: 1px solid var(--shape);

      border: 1px solid var(--title);
      outline-color: var(--text);
      color: var(--text);
      font-weight: 500;

      & ::placeholder {
        color: var(--text);
        font-weight: 500;
      }
    }

    & > button {
      background: var(--green);
    }

    & > div {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 1rem;

      button {
        flex: 1;
        background: var(--shape);
        border-width: 2px;
        border-style: solid;
        
        &[name= 'expense'] {
          border-color: var(--red);
          color: var(--red);

          &.active {
            box-shadow: 1px 1px 4px 2px var(--red);
          }
        }

        &[name= 'income'] {
          color: var(--green);
          border-color: var(--green);

          &.active {
            box-shadow: 1px 1px 4px 2px var(--green);
          }
        }

        &.active {
          filter: brightness(0.9);
        }
      }
    }
  }

  button {
    height: 2.4rem;
    color: var(--shape);
    background: var(--red);
    border-radius: var(--radius);
  }
`;