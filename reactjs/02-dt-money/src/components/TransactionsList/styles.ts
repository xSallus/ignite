import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;

  tbody tr {
    background: var(--shape);
    margin-top: 0.5rem;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.18);

    border-radius: var(--radius);

    td:first-of-type {
      color: var(--title);
    }

    &:hover {
      filter: brightness(0.9);

      &.withdraw {
        border: 1px solid var(--red);
        box-shadow: 2px 2px 2px 2px rgba(255,0,0,0.18);
      }

      &.deposit {
        border: 1px solid var(--green);
        box-shadow: 2px 2px 2px 2px rgba(0,255,0,0.18);
      }
    }
  }
  
  tr {
    width: 100%;
    display: flex;
    align-items: center;
    color: var(--text);

    th {
      flex: 1;
      text-align: left;
      padding: 0.5rem 1rem;
    }

    td {
      flex: 1;
      height: 3rem;
      text-align: left;
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      overflow: hidden;
      
      p {
        word-wrap: no-wrap;
        overflow: hidden;
        text-overflow: ellipsis;

        &.category {
          text-transform: capitalize;
        }
      }

      &.withdraw {
        color: var(--red);
      }

      &.deposit {
        color: var(--green);
      }
    }
  }
`;