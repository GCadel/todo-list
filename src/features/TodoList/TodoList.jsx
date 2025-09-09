import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';

export default function TodoList({
  todoList = [],
  onCompleteTodo,
  onUpdateTodo,
  isLoading,
}) {
  const filtered = todoList.filter((item) => {
    if (!item.isCompleted) {
      return item;
    }
  });
  return (
    <>
      {filtered.length > 0 ? (
        <ul className={styles['todo-list']}>
          {filtered.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </ul>
      ) : (
        <p className={styles['todo-list-empty']}>
          {isLoading
            ? 'Todo list loading...'
            : 'Add todo above to get started.'}
        </p>
      )}
    </>
  );
}
