import { useRef, useState } from 'react';
import { TextInputWithLabel } from '../shared/TextInputWithLabel';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  .text-label {
    flex-grow: 1;
  }
  button:not(:disabled) {
    background-color: hsl(from var(--accept-color) h s calc(l + 30));
    color: hsl(from var(--accept-color) h s calc(l - 30));
  }

  button:disabled {
    font-style: italic;
  }
`;

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
    <StyledForm onSubmit={handleAddTodo}>
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
    </StyledForm>
  );
}
