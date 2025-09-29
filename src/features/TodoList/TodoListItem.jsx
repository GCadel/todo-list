import { useEffect, useState } from 'react';
import { TextInputWithLabel } from '../../shared/TextInputWithLabel';
import styles from './TodoListItem.module.css';

export default function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (isEditing) {
      onUpdateTodo({ ...todo, title: workingTitle });
      setIsEditing(false);
    } else {
      return;
    }
  }

  return (
    <li className={styles['todo-list-item']}>
      <form className={styles['todo-item-edit']} onSubmit={handleUpdate}>
        {isEditing ? (
          <div className={styles['editing']}>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button
              className={styles['cancel']}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button className="button confirm">Update</button>
          </div>
        ) : (
          <div className={styles['displaying']}>
            <label
              className={styles['todo-item-checkbox']}
              htmlFor={`checkbox${todo.id}`}
            >
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo)}
              />
            </label>
            <span
              className={styles['todo-item-title']}
              onClick={() => setIsEditing(true)}
            >
              {todo.title}
            </span>
          </div>
        )}
      </form>
    </li>
  );
}
