import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function createOptions(method, payload) {
  const options = {
    method: method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  return options;
}

function createPayload(title, isCompleted, id) {
  const payload = {
    records: [
      {
        fields: {
          title: title,
          isCompleted: isCompleted,
        },
      },
    ],
  };

  if (id) {
    payload.records[0].id = id;
  }

  return payload;
}

async function fetchData(options) {
  const resp = options ? await fetch(url, options) : await fetch(url);

  if (!resp.ok) {
    throw new Error();
  }
  return await resp.json();
}

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

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
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
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
    };
    fetchTodos();
  }, []);

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((item) => item.id == editedTodo.id);
    const updatedTodos = todoList.map((item) => {
      if (item.id == editedTodo.id) {
        return { ...editedTodo };
      } else {
        return item;
      }
    });

    const payload = createPayload(
      editedTodo.title,
      editedTodo.isCompleted,
      editedTodo.id
    );

    const options = createOptions('PATCH', payload);
    setTodoList(updatedTodos);
    try {
      setIsSaving(true);
      await fetchData(options);
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = updatedTodos.map((item) => {
        if (item.id == editedTodo.id) {
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

  async function completeTodo(id) {
    const originalTodo = todoList.find((item) => item.id == id);
    const updatedTodos = todoList.map((item) => {
      if (item.id == id) {
        return { ...item, isCompleted: true };
      } else return item;
    });

    const payload = createPayload(originalTodo.title, true, originalTodo.id);
    const options = createOptions('PATCH', payload);

    setTodoList([...updatedTodos]);
    try {
      setIsSaving(true);
      await fetchData(options);
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = updatedTodos.map((item) => {
        if (item.id == originalTodo.id) {
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

  return (
    <div className="todo-app">
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />

      <TodoList
        onCompleteTodo={completeTodo}
        todoList={todoList}
        onUpdateTodo={updateTodo}
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
