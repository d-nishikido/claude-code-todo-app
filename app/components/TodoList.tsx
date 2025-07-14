import { Link } from "react-router";
import { TodoItem } from "./TodoItem";
import { useTodos } from "../contexts/TodoContext";

export function TodoList() {
  const { todos } = useTodos();

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h1>Todo List</h1>
        <Link to="/todos/new" className="btn btn-primary">
          Todo追加
        </Link>
      </div>
      {todos.length === 0 ? (
        <p className="no-todos">Todoアイテムがありません</p>
      ) : (
        <div className="todos">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}