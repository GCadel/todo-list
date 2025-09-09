import { useCallback, useEffect, useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import { addTodo, getAllTodos, updateTodo, url } from './utils/api';
import TodosViewForm from './features/TodosViewForm';
import styles from './App.module.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const encodeUrlCallback = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  async function fetchData(options) {
    const resp = await fetch(encodeUrlCallback(), options);

    if (!resp.ok) {
      throw new Error();
    }
    return await resp.json();
  }

  useEffect(() => {
    getAllTodos(
      setTodoList,
      setIsLoading,
      setErrorMessage,
      sortField,
      sortDirection,
      queryString,
      fetchData
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
      queryString,
      fetchData
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
      queryString,
      fetchData
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
      queryString,
      fetchData
    );
  }

  return (
    <div className={styles['todo-app']}>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={handleAddTodo} isSaving={isSaving} />
      <hr />
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
        <div className="error-popup">
          <div className="error-container">
            <p>{errorMessage}</p>
            <button className="error" onClick={() => setErrorMessage('')}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
