import { useState } from 'react';
import './App.css';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);
  function addTodo(title) {
    const newTodo = { title: title, id: Date.now(), isCompleted: false };
    setTodoList([...todoList, newTodo]);
  }

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
