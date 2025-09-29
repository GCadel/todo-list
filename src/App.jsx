import './App.css';
import styles from './App.module.css';

import { TodosPage } from './pages/TodosPage';
import { Header } from './shared/Header/Header';

function App() {
  return (
    <>
      <Header />
      <div className="centered-content">
        <TodosPage />;
      </div>
    </>
  );
}

export default App;
