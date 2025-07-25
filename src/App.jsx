import { useState } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {
  const [newTodo, setNewTodo] = useState('Complete week 3 coding assignment');
  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm />
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
}

export default App;
