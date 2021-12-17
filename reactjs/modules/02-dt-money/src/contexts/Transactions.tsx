/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from 'src/services';
import { Transaction, ITotals, ContextData, ProviderProps, ModalAction } from '../@types';

type ResponseData = {
  transactions:Transaction[];
}

const TransactionsContext = createContext({} as ContextData);

function TransactionsProvider({ children }: ProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingTransaction, setEditingTransaction] = useState<Transaction>({} as Transaction);

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [transactionTotals, setTransactionTotals] = useState<ITotals>({
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  function toggleModalOpen(action:ModalAction='add', transaction?:Transaction) {
    setIsModalOpen(!isModalOpen);
    setModalType(action);
    setEditingTransaction(transaction||{} as Transaction);
  };

  function readData() {
    api.get('/transactions').then(res => {
      const { transactions } = res.data as ResponseData;
      let deposits = 0;
      let withdraws = 0;

      transactions.forEach(item => {
        if (item.category === 'deposit') {
          deposits += item.amount;
        }

        if (item.category === 'withdraw') {
          withdraws += item.amount;
        }
      })

      const totals = {
        deposits: deposits,
        withdraws: withdraws,
        total: deposits-withdraws
      }

      setTransactionTotals(totals);
      setTransactions(transactions);
    });
  }

  function createTransaction(transaction:Transaction) {
    const newTransaction = {...transaction, id: Date.now()};

    api.post('/transactions', newTransaction);
    setTimeout(() => readData(), 500);

    setIsModalOpen(false);
  }

  function updateTransaction() {
    api.put(`/transactions/${editingTransaction.id}`, editingTransaction);

    setTimeout(() => readData(), 500);
    toggleModalOpen();
  }

  function deleteTransaction() {
    const {id} = editingTransaction;
    api.delete(`/transactions/${id}`);

    setTimeout(() => readData(), 500);
    toggleModalOpen();
  }

  useEffect(() => {
    readData();
  }, []);

  useEffect(()=>{
    transactions.forEach(transaction => {
      transaction.category ==='expenses' ? setTransactionTotals({
        ...transactionTotals,
        withdraws: transactionTotals.withdraws + transaction.amount
      }) : setTransactionTotals({
        ...transactionTotals,
        deposits: transactionTotals.deposits + transaction.amount
      })
    })
  }, [transactions]);

  useEffect(()=>{
    setTransactionTotals({
      ...transactionTotals,
      total: transactionTotals.deposits - transactionTotals.withdraws
    })
  }, [transactionTotals.deposits, transactionTotals.withdraws])

  return (
    <TransactionsContext.Provider value={{
      transactions,
      transactionTotals,

      isModalOpen,
      modalType,
      setModalType,
      toggleModalOpen,

      editingTransaction,
      setEditingTransaction,

      createTransaction,
      updateTransaction,
      deleteTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}

function useTransactions() {
  return useContext(TransactionsContext);
}

export { TransactionsProvider, useTransactions };
