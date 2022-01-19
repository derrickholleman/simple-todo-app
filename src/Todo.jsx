import React from "react";
import { updateCompleted } from "./utils/api";

const Todo = ({ todo, handleDelete, loadTodos }) => {
  const handleCompleted = () => {
    updateCompleted(todo, todo.id).then(loadTodos)
  };
  return (
    <div>
      <ul>
        <li className="todo">
          <p>{todo.text}</p>
          {todo.isCompleted ? (
            <p className="completed">Completed</p>
          ) : (
            <button onClick={handleCompleted}>Complete</button>
          )}
          <button onClick={handleDelete} className="delete-btn">
            X
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Todo;
