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

      {todos.map((todo) => (
        <Todo
          key={todo.id}
          todo={todo}
          handleDelete={() => handleDelete(todo.id)}
          loadTodos={loadTodos}
        />
      ))}
    </div>
  );
}

export default App;
