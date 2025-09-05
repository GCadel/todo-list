import { useCallback, useEffect, useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import { createOptions, createPayload, url } from './utils/api';
import TodosViewForm from './features/TodosViewForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
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

  function encodeUrlOld() {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = '';
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }

  async function fetchData(options) {
    const resp = await fetch(encodeUrl(), options);

    if (!resp.ok) {
      throw new Error();
    }
    return await resp.json();
  }

  async function getAllTodos() {
    setIsLoading(true);
    const options = createOptions('GET');
    try {
      const resp = await fetchData(options);
      const { records } = resp;
      const formattedRecords = records.map((record) => {
        const todo = {
          id: record.id,
          ...record.fields,
        };

        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }

        return todo;
      });
      setTodoList(formattedRecords);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTodo(title) {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
    const payload = createPayload(newTodo.title, newTodo.isCompleted);
    const options = createOptions('POST', payload);

    try {
      setIsSaving(true);
      const resp = await fetchData(options);
      const { records } = resp;
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields,
      };
      if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([savedTodo, ...todoList]);
    } catch (error) {
      setErrorMessage('Failed to create new todo.');
    } finally {
      setIsSaving(false);
    }
  }

  async function updateTodo(markComplete, editedTodo) {
    const originalTodo = todoList.find((item) => item.id == editedTodo.id);
    let updated;
    const updatedTodos = todoList.map((item) => {
      if (item.id == editedTodo.id) {
        updated = { ...editedTodo };

        if (markComplete) {
          updated.isCompleted = true;
        }

        return { ...updated };
      } else {
        return item;
      }
    });

    const payload = createPayload(
      updated.title,
      updated.isCompleted,
      updated.id
    );

    const options = createOptions('PATCH', payload);
    setTodoList(updatedTodos);
    try {
      setIsSaving(true);
      await fetchData(options);
    } catch (error) {
      console.log(error);

      if (markComplete) {
        setErrorMessage('Failed to mark todo as complete. Reverting todo...');
        originalTodo.isCompleted = false;
      } else {
        setErrorMessage(`Failed to update todo info. Reverting todo...`);
      }
      const revertedTodos = updatedTodos.map((item) => {
        if (item.id == updated.id) {
          return originalTodo;
        } else {
          return item;
        }
      });
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    getAllTodos();
  }, [sortField, sortDirection, queryString]);

  async function handleAddTodo(title) {
    await addTodo(title);
  }

  async function handleUpdateTodo(editedTodo) {
    await updateTodo(false, editedTodo);
  }

  async function handleCompleteTodo(editedTodo) {
    await updateTodo(true, editedTodo);
  }

  return (
    <div className="todo-app">
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
