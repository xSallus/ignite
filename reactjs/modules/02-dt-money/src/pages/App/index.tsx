import { Header } from 'src/components/Header';
import { Dashboard } from 'src/components/Dashboard';
import { TransactionModal } from 'src/components/Modal';
import { GlobalStyle } from './globals';

function App() {
  return (
    <>
      <GlobalStyle />
      <TransactionModal />
      <Header />
      <Dashboard />
    </>
  );
}

export default App;
