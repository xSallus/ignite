import { useState, FormEvent, ChangeEvent } from 'react';
import Modal from 'react-modal';
import { Transaction } from 'src/@types';
import { useTransactions } from '../../contexts/Transactions';
import CloseIcon from '../../assets/close.svg';
import { Container } from './styles';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

function TransactionModal() {
  const {
    isModalOpen,
    modalType,
    toggleModalOpen,
    createTransaction,
    editingTransaction,
    setEditingTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [active, setActive] = useState('income');
  const [newTransaction, setNewTransaction] = useState<Transaction>(editingTransaction);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;

    setNewTransaction({
      ...newTransaction,
      [name]: name === 'amount' ? Number(value.replace(/\D/g, '')) : value
    });
  }

  function handleChangeNewTransactionCategory(category: string) {
    setNewTransaction({
      ...newTransaction,
      category: category
    });
  }

  function handleSubmitNewTransaction(e: FormEvent) {
    e.preventDefault();
    createTransaction(newTransaction);
  }

  function handleEditTransaction(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;

    setEditingTransaction({
      ...editingTransaction,
      [name]: value
    });
  }

  function handleChangeEditingTransactionCategory(category: string) {
    setEditingTransaction({
      ...editingTransaction,
      category: category
    });
  }

  function handleSubmitEditedTransaction(e: FormEvent) {
    e.preventDefault();
    console.log(editingTransaction);
    updateTransaction();
  }

  return (
    <Modal
      isOpen={isModalOpen}
      style={modalStyle}
      onRequestClose={() => toggleModalOpen('add')}
    >
      <Container>
        <div>
          <h2>New transaction</h2>
          <button onClick={()=>toggleModalOpen()}>
            <img src={CloseIcon}  alt="close buton" />
          </button>
        </div>
        {modalType === 'add' && (
          <form onSubmit={handleSubmitNewTransaction}>
            <input placeholder="Description" onChange={handleChange} type="text" name="description" />
            <input placeholder="Amount" onChange={handleChange} type="text" name="amount" />
            <div>
              <button
                type="button"
                name="income"
                className={active === 'deposit' ? 'active' : ''}
                onClick={() => {
                  handleChangeNewTransactionCategory('deposit');
                  setActive('deposit');
                }}
              >
                Deposit
              </button>
              <button
                type="button"
                name="expense"
                className={active === 'withdraw' ? 'active' : ''}
                onClick={() => {
                  handleChangeNewTransactionCategory('withdraw');
                  setActive('withdraw');
                }}
              >
                Withdraw
              </button>
            </div>
            <input onChange={handleChange} type="date" name="date" />
            <button type="submit">
              Add transaction
            </button>
          </form>
        )}
        {modalType === 'edit' && (
          <form onSubmit={handleSubmitEditedTransaction}>
            <input
              placeholder="Description"
              value={editingTransaction.description}
              onChange={handleEditTransaction}
              type="text"
              name="description"
            />
            <input
              placeholder="Amount"
              value={editingTransaction.amount}
              onChange={handleEditTransaction}
              type="text"
              name="amount"
            />
            <div>
              <button
                type="button"
                name="income"
                className={editingTransaction.category === 'deposit' ? 'active' : ''}
                onClick={() => {
                  handleChangeEditingTransactionCategory('deposit');
                  setActive('deposit');
                }}
              >
                Deposit
              </button>
              <button
                type="button"
                name="expense"
                className={editingTransaction.category === 'withdraw' ? 'active' : ''}
                onClick={() => {
                  handleChangeEditingTransactionCategory('withdraw');
                  setActive('withdraw');
                }}
              >
                Withdraw
              </button>
            </div>
            <input
              onChange={handleEditTransaction}
              value={editingTransaction.date}
              type="date"
              name="date"
            />
            <button type="submit">
              Edit transaction
            </button>
          </form>
        )}
        <button
          type="button"
          disabled={modalType === 'add'}
          onClick={deleteTransaction}
        >Delete transaction</button>
      </Container>
    </Modal>
  )
}

export { TransactionModal };