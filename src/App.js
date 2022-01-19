import { useState, useEffect } from "react";
import { getTodos, createTodo, deleteTodo } from "./utils/api";
import Todo from "./Todo";
import "./App.css";

const initialFormState = {
  text: "",
  isCompleted: false,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState({ ...initialFormState });

  function loadTodos() {
    getTodos().then(setTodos);
  }

  useEffect(() => {
    loadTodos();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(formData).then(loadTodos);
    setFormData({ ...initialFormState });
  };

  const handleDelete = (id) => {
    deleteTodo(id).then(loadTodos);
  };

  const handleMoveDown = (index) => {
    if (index + 1 === todos.length) {
      return null
    }
    let temp = todos[index];
    todos[index] = todos[index + 1];
    todos[index + 1] = temp;

    setTodos((todos) => [...todos])

  };

  const handleMoveUp = (index) => {
    if (index === 0) {
      return null
    }
    let temp = todos[index];
    todos[index] = todos[index - 1];
    todos[index - 1] = temp;

    setTodos((todos) => [...todos])

  };

  return (
    <div className="App">
      <h1>Simple Todo App</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Add Todo</label>
        <input
          type="text"
          id="text"
          required
          value={formData.text}
          onChange={handleChange}
          placeholder="today I need to..."
        />
        <input type="submit" style={{ display: "none" }} />
      </form>

      {todos.map((todo, index) => (
        <Todo
          key={todo.id}
          todo={todo}
          handleDelete={() => handleDelete(todo.id)}
          loadTodos={loadTodos}
          todos={todos}
          setTodos={setTodos}
          handleMoveDown={() => handleMoveDown(index)}
          handleMoveUp={() => handleMoveUp(index)}
        />
      ))}
    </div>
  );
}

export default App;
