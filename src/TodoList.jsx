import TodoListItem from './TodoListItem';

export default function TodoList({ todoList }) {
  return (
    <>
      {todoList.length > 0 ? (
        <ul>
          {todoList.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <p>Add todo above to get started</p>
      )}
    </>
  );
}
