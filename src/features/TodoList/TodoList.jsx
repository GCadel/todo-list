import TodoListItem from './TodoListItem';

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
        <ul className="todo-list">
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
        <p className="todo-list-empty">
          {isLoading
            ? 'Todo list loading...'
            : 'Add todo above to get started.'}
        </p>
      )}
    </>
  );
}
