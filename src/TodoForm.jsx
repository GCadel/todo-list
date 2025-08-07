import { useRef } from 'react';

export default function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');
  function handleAddTodo(event) {
    event.preventDefault();
    const title = event.target.title;
    onAddTodo(title.value);
    title.value = '';
    todoTitleInput.current.focus();
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input ref={todoTitleInput} name="title" type="text" id="todoTitle" />
      <button>Add Todo</button>
    </form>
  );
}
