import { Route, Routes } from 'react-router';
import './App.css';

import { TodosPage } from './pages/TodosPage';
import { Header } from './shared/Header/Header';
import { About } from './pages/About/About';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Header title={'Todo List'} />

      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
