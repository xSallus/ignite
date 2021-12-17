import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import { TransactionsProvider } from './contexts/Transactions';
import Api from './services/mirage';

Api();

ReactDOM.render(
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
