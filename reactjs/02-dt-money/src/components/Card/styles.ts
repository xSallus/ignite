import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { CardProps } from '../../@types';

type ContainerProps = ThemedStyledProps<Pick<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof HTMLAttributes<HTMLDivElement>> & CardProps, any>;

export const Container = styled.div<ContainerProps>`
  flex: 1;
  padding: 1rem 1rem 0;
  border-radius: var(--radius);

  background: var(--shape);

  display: grid;
  grid-template-columns: 75% 24%;
  grid-template-rows: 24% 75%;
  grid-template-areas: "title icon" "amount amount";
  gap: 1rem;

  box-shadow: var(--shadow);

  span {
    grid-area: title;
    color: var(--text);
    text-transform: capitalize;
  }

  strong {
    grid-area: amount;
    font-size: 2.25rem;
  }

  img {
    grid-area: icon;
    height: 2rem;
    width: auto;
    margin-left: 1.8rem;
  }

  &.withdraws {
    strong {
      color: var(--red);
    }
  }

  &.deposits {
    strong {
      color: var(--green);
    }
  }

  &.balance {
    background: ${(props) => props.amount>=0 ? 'var(--green)' : 'var(--red)'};
 
    span, strong {
      color: var(--shape);
    }
  }

  @media(max-width: 860px) {
    width: 100%;

    span {
      font-size: 1.25rem;
    }
  }
`;