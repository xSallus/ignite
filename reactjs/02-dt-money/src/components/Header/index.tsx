import LogoIcon from '../../assets/logo.svg';
import PlusIcon from '../../assets/add.svg';
import { useTransactions } from '../../contexts/Transactions';
import { Container } from './styles';

function Header() {
  const { toggleModalOpen } = useTransactions();

  return (
    <Container>
      <div>
        <img src={LogoIcon} alt="dt money" />
        <button onClick={()=>toggleModalOpen('add')}>
          <img src={PlusIcon} alt="new transaction" />
          <span>new transaction</span>
        </button>
      </div>
    </Container>
  );
}

export { Header };