import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Modal from 'react-modal';
import { Transaction } from 'src/@types';
import { useTransactions } from '../../contexts/Transactions';
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
    addNewTransaction,
    editingTransaction,
    setEditingTransaction,
    handleSubmitEditingTransaction,
    handleDeleteTransaction,
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
    addNewTransaction(newTransaction);
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

  useEffect(() => console.log(newTransaction), [newTransaction]);

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
            <p>x</p>
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
                className={active === 'income' ? 'active' : ''}
                onClick={() => {
                  handleChangeNewTransactionCategory('income');
                  setActive('income');
                }}
              >
                Income
              </button>
              <button
                type="button"
                name="expense"
                className={active === 'expense' ? 'active' : ''}
                onClick={() => {
                  handleChangeNewTransactionCategory('expense');
                  setActive('expense');
                }}
              >
                Expense
              </button>
            </div>
            <input placeholder="Category" onChange={handleChange} type="text" name="category" />
            <input onChange={handleChange} type="date" name="date" />
            <button type="submit">
              Add transaction
            </button>
          </form>
        )}
        {modalType === 'edit' && (
          <form onSubmit={handleSubmitEditingTransaction}>
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
                className={editingTransaction.category === 'income' ? 'active' : ''}
                onClick={() => handleChangeEditingTransactionCategory('income')}
              >
                Income
              </button>
              <button
                type="button"
                name="expense"
                className={editingTransaction.category === 'expense' ? 'active' : ''}
                onClick={() => handleChangeEditingTransactionCategory('expense')}
              >
                Expense
              </button>
            </div>
            <input
              placeholder="Category"
              value={editingTransaction.category}
              onChange={handleEditTransaction}
              type="text"
              name="category"
            />
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
          onClick={handleDeleteTransaction}
        >Delete transaction</button>
      </Container>
    </Modal>
  )
}

export { TransactionModal };