import { useEffect, useState } from 'react';
import { TextInputWithLabel } from '../shared/TextInputWithLabel';

export default function TodosViewForm({
  sortDirection,
  setSortDirection,
  sortField,
  setSortField,
  queryString,
  setQueryString,
}) {
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);

    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  function preventRefresh(event) {
    event.preventDefault();
  }
  return (
    <form className="todos-view-form" onSubmit={preventRefresh}>
      <div className="query-search-container">
        <TextInputWithLabel
          value={localQueryString}
          onChange={(e) => setLocalQueryString(e.target.value)}
          elementId={'query-search'}
          label={'Search Todos:'}
          placeholder={'Search Todos'}
        />
        <button
          type="button"
          className={localQueryString && 'clear-button'}
          onClick={() => setLocalQueryString('')}
          disabled={localQueryString == ''}
        >
          Clear Search
        </button>
      </div>
      <div className="sort-by-search-container">
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
