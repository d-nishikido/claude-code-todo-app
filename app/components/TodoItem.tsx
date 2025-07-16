import { useState } from "react";
import type { Todo } from "../types/todo";
import { useTodos } from "../contexts/TodoContext";

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
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isUpdating}
        className="todo-checkbox"
      />
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
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={isUpdating}
        >
          削除
        </button>
      </div>
    </div>
  );
}