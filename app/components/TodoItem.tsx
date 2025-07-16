import { useState } from "react";
import type { Todo } from "../types/todo";
import { useTodos } from "../contexts/TodoContext";
import { Tooltip } from "./Tooltip";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toggleTodo, deleteTodo } = useTodos();

  const handleToggle = async () => {
    setIsUpdating(true);
    try {
      await toggleTodo(todo.id);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("本当にこのTodoを削除しますか？")) {
      await deleteTodo(todo.id);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <Tooltip 
        content={todo.completed ? "完了を解除" : "完了にする"}
        position="top"
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          disabled={isUpdating}
          className="todo-checkbox"
        />
      </Tooltip>
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <div className="todo-meta">
          <span className="todo-date">
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="todo-actions">
        <Tooltip 
          content="このTodoを削除"
          position="top"
        >
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={isUpdating}
          >
            削除
          </button>
        </Tooltip>
      </div>
    </div>
  );
}