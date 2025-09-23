import { useCallback, useEffect, useReducer, useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import { addTodo, getAllTodos, updateTodo, url } from './utils/api';
import TodosViewForm from './features/TodosViewForm';
import styles from './App.module.css';
import errorIcon from './assets/error-icon.svg';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  const setTodoList = (data) => {
    dispatch({ type: todoActions.loadTodos, nextTodoList: data });
  };
  const setIsLoading = () => dispatch({ type: todoActions.fetchTodos });
  const setErrorMessage = (error) =>
    dispatch({ type: todoActions.setLoadError, error: { message: error } });

  const setIsSaving = (saving) => {
    if (saving) {
      dispatch({ type: todoActions.startRequest });
    } else {
      dispatch({ type: todoActions.endRequest });
    }
  };
  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc');
  const [queryString, setQueryString] = useState('');

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  async function fetchData(options) {
    const resp = await fetch(encodeUrl(), options);

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
      todoState.todoList,
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
      todoState.todoList,
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
      todoState.todoList,
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
      <TodoForm onAddTodo={handleAddTodo} isSaving={todoState.isSaving} />
      <hr />
      <TodoList
        onCompleteTodo={handleCompleteTodo}
        todoList={todoState.todoList}
        onUpdateTodo={handleUpdateTodo}
        isLoading={todoState.isLoading}
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
      {todoState.errorMessage != '' && (
        <div className={styles['error-popup']}>
          <div className={styles['error-container']}>
            <p className={styles['error-message']}>
              <img src={errorIcon} alt="error" />
              {todoState.errorMessage}
            </p>
            <button
              className={styles['error']}
              onClick={() => setErrorMessage('')}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
