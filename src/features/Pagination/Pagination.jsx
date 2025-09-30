import { useNavigate, useSearchParams } from 'react-router';
import styles from './Pagination.module.css';

import { useContext, useEffect, useReducer } from 'react';
import { TodoContext } from '../../context/TodoListContext';

export const Pagination = () => {
  const todoContext = useContext(TodoContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const itemsPerPage = 15;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const totalPages = Math.ceil(todoContext.todoList.length / itemsPerPage);

  useEffect(() => {
    if (totalPages > 0) {
      try {
        if (isNaN(currentPage)) {
          throw new TypeError();
        }
      } catch (err) {
        navigate('/');
        setSearchParams((params) => {
          params.set('page', 1);
          return params;
        });
      }
    }
  }, [currentPage, totalPages, navigate]);

  function handlePreviousPage() {
    setSearchParams((params) => {
      params.set('page', currentPage - 1 >= 1 ? currentPage - 1 : 1);
      return params;
    });
  }

  function handleNextPage() {
    setSearchParams((params) => {
      params.set(
        'page',
        currentPage + 1 <= totalPages ? currentPage + 1 : totalPages
      );
      return params;
    });
  }

  return (
    <div>
      <div className={styles.paginationControls}>
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages < 1}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
      <hr />
    </div>
  );
};
