const actions = {
  fetchTodos: 'fetchTodos',
  addTodo: 'addTodo',
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',
  loadTodos: 'loadTodos',
  setLoadError: 'setLoadError',
  clearError: 'clearError',
  revertTodo: 'revertTodos',
  startRequest: 'startRequest',
  endRequest: 'endRequest',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos:
      return { ...state, isLoading: true };
    case actions.addTodo: {
      const savedTodo = {
        id: actions.records[0].id,
        ...actions.records[0].fields,
      };
      if (!savedTodo.isCompleted) {
        savedTodo.isCompleted = false;
      }
      return {
        ...state,
        todoList: [savedTodo, ...state.todoList],
        isSaving: false,
      };
    }
    case actions.revertTodo:
    case actions.updateTodo: {
      const originalTodo = actions.todoList.find(
        (item) => item.id == actions.editedTodo.id
      );
      let updated;
      const updatedTodos = actions.todoList.map((item) => {
        if (item.id == actions.editedTodo.id) {
          updated = { ...actions.editedTodo };

          if (actions.markComplete) {
            updated.isCompleted = true;
          }

          return { ...updated };
        } else {
          return item;
        }
      });

      const updatedState = { ...state, todoList: [...updatedTodos] };
      if (action.error) {
        updatedTodos.errorMessage = action.error.message;
        const revertedTodos = updatedTodos.map((item) => {
          if (item.id == updated.id) {
            return originalTodo;
          } else {
            return item;
          }
        });
        updatedState.todoList = [...revertedTodos];
        return updatedState;
      }

      return { ...state, todoList: [...updatedTodos] };
    }
    case actions.completeTodo:
      return { ...state };
    case actions.loadTodos: {
      return {
        ...state,
        todoList: [...action.nextTodoList],
        isLoading: false,
      };
    }
    case actions.setLoadError: {
      return { ...state, errorMessage: action.error.message, isLoading: false };
    }
    case actions.clearError:
      return { ...state, errorMessage: '' };

    case actions.endRequest:
      return { ...state, isLoading: false, isSaving: false };
    case actions.startRequest:
      return { ...state, isSaving: true };
    default:
      return state;
  }
}

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

export { initialState, actions, reducer };
