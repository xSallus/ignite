import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Modal from 'react-modal';
import { Transaction } from 'src/@types';
import { useTransactions } from '../../contexts/Transactions';

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
    setModalType,
    toggleModalOpen,
    addNewTransaction,
    editingTransaction
  } = useTransactions();

  const [newTransaction, setNewTransaction] = useState<Transaction>(editingTransaction);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.currentTarget;

    setNewTransaction({
      ...newTransaction,
      [name]: name === 'amount' ? Number(value.replace(/\D/g, '')) : value
    });
  }

  function handleChangeNewTransactionCategory(category:string) {
    setNewTransaction({
      ...newTransaction,
      category: category
    });
  }

  function handleSubmitNewTransaction(e: FormEvent) {
    e.preventDefault();
    addNewTransaction(newTransaction);
  }

  useEffect(()=>console.log(newTransaction), [newTransaction]);

  return (
    <Modal
      isOpen={isModalOpen}
      style={modalStyle}
      onRequestClose={() => toggleModalOpen('add')}
    >
      {modalType === 'add' && (
        <div>
          <form onSubmit={handleSubmitNewTransaction}>
            <input onChange={handleChange} type="text" name="description" />
            <input onChange={handleChange} type="text" name="amount" />
            <div>
              <button
                type="button"
                onClick={() =>handleChangeNewTransactionCategory('income')}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() =>handleChangeNewTransactionCategory('expense')}
              >
                Expense
              </button>
            </div>
            <input onChange={handleChange} type="text" name="category" />
            <input onChange={handleChange} type="date" name="date" />
            <button type="submit">
              Add transaction
            </button>
          </form>
          <button type="button" onClick={() => setModalType('delete')}>
            Delete transaction
          </button>
        </div>
      )}
      {modalType === 'edit' && <h1>{modalType}</h1>}
      {modalType === 'delete' && <h1>{modalType}</h1>}
    </Modal>
  )
}

export { TransactionModal };