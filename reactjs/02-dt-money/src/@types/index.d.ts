import { Dispatch, ReactNode, SetStateAction, FormEvent } from 'react';

interface CardProps {
  icon?: string;
  title?: string;
  amount: number;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ITotals {
  deposits: number;
  withdraws: number;
  total: number;
}

interface ProviderProps {
  children: ReactNode;
}

export type ModalAction = 'add'|'edit'|'delete';

interface ContextData {
  transactions: Transaction[];
  transactionTotals: ITotals;
  
  isModalOpen: boolean;
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  toggleModalOpen: (action:ModalAction='add', transaction?:Transaction)=>void;

  editingTransaction: Transaction;
  setEditingTransaction: Dispatch<SetStateAction<Transaction>>;

  addNewTransaction: (transaction:Transaction)=>void;
  handleSubmitEditingTransaction: (e: FormEvent)=>void;
  handleDeleteTransaction: ()=>void;
}

export { CardProps, Transaction, ITotals, ContextData, ProviderProps };