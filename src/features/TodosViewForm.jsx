export default function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
}) {
  function preventRefresh(event) {
    event.preventDefault();
  }
  return (
    <form className="todos-view-form" onSubmit={preventRefresh}>
      <div>
        <label htmlFor="sort-by">Sort by</label>
        <select
          name="sort-by"
          id="sort-by"
          onChange={(e) => {
            setSortField(e.target.value);
          }}
          value={sortField}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>
        <label htmlFor="direction">Direction</label>
        <select
          name="direction"
          id="direction"
          onChange={(e) => setSortDirection(e.target.value)}
          value={sortDirection}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
}
