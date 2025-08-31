import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import { addTodo, getAllTodos, updateTodo } from './utils/api';
import TodosViewForm from './features/TodosViewForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  useEffect(() => {
    getAllTodos(
      setTodoList,
      setIsLoading,
      setErrorMessage,
      sortField,
      sortDirection,
      queryString
    );
  }, [sortField, sortDirection, queryString]);

  async function handleAddTodo(title) {
    await addTodo(
      title,
      todoList,
      setTodoList,
      setIsSaving,
      setErrorMessage,
      sortField,
      sortDirection,
      queryString
    );
  }

  async function handleUpdateTodo(editedTodo) {
    await updateTodo(
      false,
      editedTodo,
      todoList,
      setTodoList,
      setIsSaving,
      setErrorMessage,
      sortField,
      sortDirection,
      queryString
    );
  }

  async function handleCompleteTodo(editedTodo) {
    await updateTodo(
      true,
      editedTodo,
      todoList,
      setTodoList,
      setIsSaving,
      setErrorMessage,
      sortField,
      sortDirection,
      queryString
    );
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
      <hr />
      <TodosViewForm
        setSortDirection={setSortDirection}
        setSortField={setSortField}
        sortDirection={sortDirection}
        sortField={sortField}
        queryString={queryString}
        setQueryString={setQueryString}
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
