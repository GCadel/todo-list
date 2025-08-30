import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import { addTodo, completeTodo, getAllTodos, updateTodo } from './utils/api';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getAllTodos(setTodoList, setIsLoading, setErrorMessage);
  }, []);

  async function handleAddTodo(title) {
    await addTodo(title, todoList, setTodoList, setIsSaving, setErrorMessage);
  }

  async function handleUpdateTodo(editedTodo) {
    await updateTodo(
      editedTodo,
      todoList,
      setTodoList,
      setIsSaving,
      setErrorMessage
    );
  }

  async function handleCompleteTodo(id) {
    await completeTodo(id, todoList, setTodoList, setIsSaving, setErrorMessage);
  }

  return (
    <div className="todo-app">
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} isSaving={isSaving} />

      <TodoList
        onCompleteTodo={handleCompleteTodo}
        todoList={todoList}
        onUpdateTodo={handleUpdateTodo}
        isLoading={isLoading}
      />
      {errorMessage != '' && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button className="error" onClick={() => setErrorMessage('')}>
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
