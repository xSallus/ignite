import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { TransactionsProvider } from './contexts/Transactions';

ReactDOM.render(
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
