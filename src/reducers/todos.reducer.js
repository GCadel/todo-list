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
      return { ...state };
    case actions.addTodo:
      return { ...state };
    case actions.updateTodo:
      return { ...state };
    case actions.completeTodo:
      return { ...state };
    case actions.loadTodos:
      return { ...state };
    case actions.setLoadError:
      return { ...state };
    case actions.clearError:
      return { ...state };
    case actions.revertTodo:
      return { ...state };
    case actions.endRequest:
      return { ...state };
  }
}

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
};

export { initialState, actions };
