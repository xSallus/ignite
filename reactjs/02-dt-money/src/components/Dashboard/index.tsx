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
        <Card title="expenses" amount={(transactionTotals.withdraws*(-1))} icon={ExpenseIcon} />
        <Card title="incomes" amount={transactionTotals.deposits} icon={IncomeIcon} />
        <Card title="total" amount={transactionTotals.total} icon={TotalIcon} />
      </section>
      <section>
        <TransactionsList />
      </section>
    </Container>
  )
}

export { Dashboard };
