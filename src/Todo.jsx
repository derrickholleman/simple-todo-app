import React from "react";
import { updateCompleted } from "./utils/api";

const Todo = ({
  todo,
  handleDelete,
  loadTodos,
  handleMoveDown,
  handleMoveUp,
}) => {
  const handleCompleted = () => {
    updateCompleted(todo, todo.id).then(loadTodos);
  };

  return (
    <div>
      <ul>
        <li className="todo">
          <h2 className="todo-text">{todo.text}</h2>
          {todo.isCompleted ? (
            <p className="completed">Completed</p>
          ) : (
            <button onClick={handleCompleted}>Complete</button>
          )}
          <button onClick={handleDelete} className="delete-btn">
            X
          </button>
          <h3>Re Order Todo</h3>
          <div className="reorder-btns">
            <button onClick={handleMoveUp}>Up</button>
            <button onClick={handleMoveDown}>Down</button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Todo;
