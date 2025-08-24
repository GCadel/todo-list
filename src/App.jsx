import { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/Todos?maxRecords=3&view=Grid%20view`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;
const options = {
  method: 'GET',
  headers: {
    Authorization: token,
  },
};

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  function addTodo(title) {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  }

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.message);
        }
        const res = await resp.json();
        const records = res.records;
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

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((item) => {
      if (item.id == editedTodo.id) {
        return { ...editedTodo };
      } else {
        return item;
      }
    });
    setTodoList(updatedTodos);
  }

  function completeTodo(id) {
    const updatedTodos = todoList.map((item) => {
      if (item.id == id) {
        return { ...item, isCompleted: true };
      } else return item;
    });

    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} />

      <TodoList
        onCompleteTodo={completeTodo}
        todoList={todoList}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default App;
