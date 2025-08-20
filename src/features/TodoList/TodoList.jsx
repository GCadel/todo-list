import TodoListItem from './TodoListItem';

export default function TodoList({
  todoList = [],
  onCompleteTodo,
  onUpdateTodo,
}) {
  const filtered = todoList.filter((item) => {
    if (!item.isCompleted) {
      return item;
    }
  });
  return (
    <>
      {filtered.length > 0 ? (
        <ul>
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
        <p>Add todo above to get started</p>
      )}
    </>
  );
}
