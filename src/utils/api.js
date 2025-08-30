const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function encodeUrl(sortField, sortDirection) {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  return encodeURI(`${url}?${sortQuery}`);
}

async function fetchData(options, sortField, sortDirection) {
  const resp = options
    ? await fetch(encodeUrl(sortField, sortDirection), options)
    : await fetch(encodeUrl(sortField, sortDirection));

  if (!resp.ok) {
    throw new Error();
  }
  return await resp.json();
}

function createPayload(title, isCompleted, id) {
  const payload = {
    records: [
      {
        fields: {
          title: title,
          isCompleted: isCompleted,
        },
      },
    ],
  };

  if (id) {
    payload.records[0].id = id;
  }

  return payload;
}

function createOptions(method, payload) {
  const options = {
    method: method,
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  return options;
}

export async function getAllTodos(
  setTodoList,
  setIsLoading,
  setErrorMessage,
  sortField,
  sortDirection
) {
  setIsLoading(true);
  const options = createOptions('GET');
  try {
    const resp = await fetchData(options, sortField, sortDirection);
    const { records } = resp;
    const formattedRecords = records.map((record) => {
      const todo = {
        id: record.id,
        ...record.fields,
      };

      if (!todo.isCompleted) {
        todo.isCompleted = false;
      }

      return todo;
    });
    setTodoList(formattedRecords);
  } catch (error) {
    setErrorMessage(error.message);
  } finally {
    setIsLoading(false);
  }
}

export async function addTodo(
  title,
  todoList,
  setTodoList,
  setIsSaving,
  setErrorMessage,
  sortField,
  sortDirection
) {
  const newTodo = { title: title, id: Date.now(), isCompleted: false };
  const payload = createPayload(newTodo.title, newTodo.isCompleted);
  const options = createOptions('POST', payload);

  try {
    setIsSaving(true);
    const resp = await fetchData(options, sortField, sortDirection);
    const { records } = resp;
    const savedTodo = {
      id: records[0].id,
      ...records[0].fields,
    };
    if (!savedTodo.isCompleted) {
      savedTodo.isCompleted = false;
    }
    setTodoList([...todoList, savedTodo]);
  } catch (error) {
    setErrorMessage(error.message);
  } finally {
    setIsSaving(false);
  }
}

export async function updateTodo(
  editedTodo,
  todoList,
  setTodoList,
  setIsSaving,
  setErrorMessage,
  sortField,
  sortDirection
) {
  const originalTodo = todoList.find((item) => item.id == editedTodo.id);
  const updatedTodos = todoList.map((item) => {
    if (item.id == editedTodo.id) {
      return { ...editedTodo };
    } else {
      return item;
    }
  });

  const payload = createPayload(
    editedTodo.title,
    editedTodo.isCompleted,
    editedTodo.id
  );

  const options = createOptions('PATCH', payload);
  setTodoList(updatedTodos);
  try {
    setIsSaving(true);
    await fetchData(options, sortField, sortDirection);
  } catch (error) {
    console.log(error);
    setErrorMessage(`${error.message}. Reverting todo...`);
    const revertedTodos = updatedTodos.map((item) => {
      if (item.id == editedTodo.id) {
        return originalTodo;
      } else {
        return item;
      }
    });
    setTodoList([...revertedTodos]);
  } finally {
    setIsSaving(false);
  }
}

export async function completeTodo(
  id,
  todoList,
  setTodoList,
  setIsSaving,
  setErrorMessage,
  sortField,
  sortDirection
) {
  const originalTodo = todoList.find((item) => item.id == id);
  const updatedTodos = todoList.map((item) => {
    if (item.id == id) {
      return { ...item, isCompleted: true };
    } else return item;
  });

  const payload = createPayload(originalTodo.title, true, originalTodo.id);
  const options = createOptions('PATCH', payload);

  setTodoList([...updatedTodos]);
  try {
    setIsSaving(true);
    await fetchData(options, sortField, sortDirection);
  } catch (error) {
    console.log(error);
    setErrorMessage(`${error.message}. Reverting todo...`);
    const revertedTodos = updatedTodos.map((item) => {
      if (item.id == originalTodo.id) {
        return originalTodo;
      } else {
        return item;
      }
    });
    setTodoList([...revertedTodos]);
  } finally {
    setIsSaving(false);
  }
}
