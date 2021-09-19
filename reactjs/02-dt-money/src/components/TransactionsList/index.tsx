import { useTransactions } from '../../contexts/Transactions';
import { formatAmount, formatDate } from '../../tools';
import { Table } from './styles';

function TransactionsList() {
  const { transactions, toggleModalOpen } = useTransactions();

  return (
    <Table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {
          transactions.map(item => (
            <tr className={item.category} onClick={()=>toggleModalOpen('edit', item)} key={item.id}>
              <td>
                <p>{item.description}</p>
              </td>
              <td className={item.category}>
                <p>{formatAmount(`${item.amount}`)}</p>
              </td>
              <td>
                <p className="category">{item.category}</p>
              </td>
              <td>
                <p>{formatDate(`${item.date}`)}</p>
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
}

export { TransactionsList };