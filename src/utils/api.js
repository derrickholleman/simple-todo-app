const BASE_URL = "http://localhost:5000/todos";

export async function getTodos() {
  try {
    const todosRes = await fetch(BASE_URL);
    return await todosRes.json();
  } catch (err) {
    console.error(err);
  }
}

export async function createTodo(newTodo) {
  try {
    return await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
  } catch (err) {
    console.log('hello')
    console.error(err);
  }
}

export async function updateCompleted(todo, todoId) {
  try {
    return await fetch(`${BASE_URL}/${todoId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...todo,
        isCompleted: true,
      }),
    });
  } catch (err) {
    console.error(err);
  }
}

export async function deleteTodo(todoId) {
  try {
    return await fetch(`${BASE_URL}/${todoId}`, {
      method: "DELETE",
    });
  } catch (err) {
    console.error(err);
  }
}
