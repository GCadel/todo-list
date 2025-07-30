import { useRef } from 'react';

export default function TodoForm({ onAddTodo }) {
  // Using ref to get the DOM element
  const todoTitleInput = useRef('');
  function handleAddTodo(event) {
    event.preventDefault();
    // Can target an item by the name attribute
    const title = event.target.title;
    onAddTodo(title.value);
    // Clearing the input after submit
    title.value = '';
    todoTitleInput.current.focus();
  }
  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      {/* Adding ref to the input element */}
      <input ref={todoTitleInput} name="title" type="text" id="todoTitle" />
      <button>Add Todo</button>
    </form>
  );
}
