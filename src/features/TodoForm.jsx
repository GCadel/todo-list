import { useRef, useState } from 'react';
import { TextInputWithLabel } from '../shared/TextInputWithLabel';

export default function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const todoTitleInput = useRef('');
  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }
  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        label={'Todo'}
        elementId={'todoTitle'}
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
      />

      <button disabled={workingTodoTitle == ''}>Add Todo</button>
    </form>
  );
}
