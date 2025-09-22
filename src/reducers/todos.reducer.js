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
    case actions.updateTodo:
      return { ...state };
    case actions.completeTodo:
      return { ...state };
    case actions.loadTodos:
      return {
        ...state,
        todoList: [
          ...actions.records.map((record) => {
            const todo = {
              id: record.id,
              ...record.fields,
            };
            return todo;
          }),
        ],
        isLoading: false,
      };
    case actions.setLoadError:
      return { ...state, errorMessage: action.error.message, isLoading: false };
    case actions.clearError:
      return { ...state };
    case actions.revertTodo:
      return { ...state };
    case actions.endRequest:
      return { ...state, isLoading: false, isSaving: false };
    case actions.startRequest:
      return { ...state, isSaving: true };
  }
}

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

export { initialState, actions };
