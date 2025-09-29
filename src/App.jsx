import { Route, Routes } from 'react-router';
import './App.css';

import { TodosPage } from './pages/TodosPage';
import { Header } from './shared/Header/Header';

function App() {
  return (
    <>
      <Header title={'Todo List'} />

      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/*" element={<h1>Not Found!</h1>} />
      </Routes>
    </>
  );
}

export default App;
