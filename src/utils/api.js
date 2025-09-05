export const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
const token = `Bearer ${import.meta.env.VITE_PAT}`;

function encodeUrl(sortField, sortDirection, queryString) {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  let searchQuery = '';
  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }
  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
}

async function fetchData(options, sortField, sortDirection, queryString) {
  const resp = options
    ? await fetch(encodeUrl(sortField, sortDirection, queryString), options)
    : await fetch(encodeUrl(sortField, sortDirection, queryString));

  if (!resp.ok) {
    throw new Error();
  }
  return await resp.json();
}

export function createPayload(title, isCompleted, id) {
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

export function createOptions(method, payload) {
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
  sortDirection,
  queryString
) {
  setIsLoading(true);
  const options = createOptions('GET');
  try {
    const resp = await fetchData(
      options,
      sortField,
      sortDirection,
      queryString
    );
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
  sortDirection,
  queryString
) {
  const newTodo = { title: title, id: Date.now(), isCompleted: false };
  const payload = createPayload(newTodo.title, newTodo.isCompleted);
  const options = createOptions('POST', payload);

  try {
    setIsSaving(true);
    const resp = await fetchData(
      options,
      sortField,
      sortDirection,
      queryString
    );
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
    setErrorMessage('Failed to create new todo.');
  } finally {
    setIsSaving(false);
  }
}

export async function updateTodo(
  markComplete,
  editedTodo,
  todoList,
  setTodoList,
  setIsSaving,
  setErrorMessage,
  sortField,
  sortDirection,
  queryString
) {
  const originalTodo = todoList.find((item) => item.id == editedTodo.id);
  let updated;
  const updatedTodos = todoList.map((item) => {
    if (item.id == editedTodo.id) {
      updated = { ...editedTodo };

      if (markComplete) {
        updated.isCompleted = true;
      }

      return { ...updated };
    } else {
      return item;
    }
  });

  const payload = createPayload(updated.title, updated.isCompleted, updated.id);

  const options = createOptions('PATCH', payload);
  setTodoList(updatedTodos);
  try {
    setIsSaving(true);
    await fetchData(options, sortField, sortDirection, queryString);
  } catch (error) {
    console.log(error);

    if (markComplete) {
      setErrorMessage('Failed to mark todo as complete. Reverting todo...');
      originalTodo.isCompleted = false;
    } else {
      setErrorMessage(`Failed to update todo info. Reverting todo...`);
    }
    const revertedTodos = updatedTodos.map((item) => {
      if (item.id == updated.id) {
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
