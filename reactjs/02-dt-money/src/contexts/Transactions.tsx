/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState, FormEvent } from 'react';
import { Transaction, ITotals, ContextData, ProviderProps, ModalAction } from '../@types';

const TransactionsContext = createContext({} as ContextData);

function TransactionsProvider({ children }: ProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingTransaction, setEditingTransaction] = useState<Transaction>({} as Transaction);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      description: 'Website',
      category: 'income',
      amount: 2005500,
      date: '01-05-2021T00:00:00',
    },
    {
      id: 2,
      description: 'Salad',
      category: 'expense',
      amount: 2055,
      date: '01-05-2021T00:00:00',
    },
    {
      id: 3,
      description: 'Desapego coputer',
      category: 'income',
      amount: 205500,
      date: '01-05-2021T00:00:00',
    },
    {
      id: 4,
      description: 'Cafe com pastel',
      category: 'expense',
      amount: 550,
      date: '01-05-2021T00:00:00'
    }
  ]);

  const [transactionTotals, setTransactionTotals] = useState<ITotals>({
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  function toggleModalOpen(action:ModalAction='add', transaction?:Transaction) {
    setIsModalOpen(!isModalOpen);
    setModalType(action);
    setEditingTransaction(transaction||{} as Transaction);
    console.log(transaction?.id);
  };

  function addNewTransaction(transaction:Transaction) {
    const alteredTransactions = [...transactions, {
      ...transaction,
      id: Date.now()
    }];
    setTransactions(alteredTransactions);
    setIsModalOpen(false);
    toggleModalOpen();
  }

  function handleSubmitEditingTransaction(e: FormEvent) {
    e.preventDefault();

    const newTransactions = transactions.map(transaction => editingTransaction.id === transaction.id ? editingTransaction : transaction);

    setTransactions(newTransactions);
    toggleModalOpen();
  }

  function handleDeleteTransaction() {
    const {id} = editingTransaction;
    const filteredTransactions = transactions.filter(transaction => transaction.id !== id);

    setTransactions(filteredTransactions);
    toggleModalOpen();
  }

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

      addNewTransaction,
      handleSubmitEditingTransaction,
      handleDeleteTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}

function useTransactions() {
  return useContext(TransactionsContext);
}

export { TransactionsProvider, useTransactions };
