import { useRef, useState } from 'react';
import { TextInputWithLabel } from '../shared/TextInputWithLabel';

export default function TodoForm({ onAddTodo, isSaving }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const todoTitleInput = useRef('');
  function handleAddTodo(event) {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  }
  return (
    <form className="todo-form" onSubmit={handleAddTodo}>
      <TextInputWithLabel
        label={'Todo'}
        elementId={'todoTitle'}
        ref={todoTitleInput}
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        placeholder={'Feed pet rock'}
      />

      <button
        className={isSaving ? 'saving' : ''}
        disabled={workingTodoTitle == ''}
      >
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}
