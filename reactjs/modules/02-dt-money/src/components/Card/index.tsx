import { formatAmount } from '../../tools';
import { CardProps } from '../../@types';
import { Container } from './styles';

function Card({ title, amount, icon }: CardProps) {
  return (
    <Container amount={amount} className={title}>
      <span>{title}</span>
      <img src={icon} alt={title} />
      <strong>{formatAmount(`${amount}`)}</strong>
    </Container>
  );
}

export { Card };