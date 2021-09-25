import { Card } from '../Card';
import { Container } from './styles';
import { TransactionsList } from '../TransactionsList';
import ExpenseIcon from '../../assets/expense.svg';
import IncomeIcon from '../../assets/income.svg';
import TotalIcon from '../../assets/total.svg';
import { useTransactions } from '../../contexts/Transactions';

function Dashboard() {
  const { transactionTotals } = useTransactions();

  return (
    <Container>
      <section>
        <Card title="deposits" amount={transactionTotals.deposits} icon={IncomeIcon} />
        <Card title="withdraws" amount={(transactionTotals.withdraws*(-1))} icon={ExpenseIcon} />
        <Card title="balance" amount={transactionTotals.total} icon={TotalIcon} />
      </section>
      <section>
        <TransactionsList />
      </section>
    </Container>
  )
}

export { Dashboard };
