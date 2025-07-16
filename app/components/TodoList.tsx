import { Link } from "react-router";
import { TodoItem } from "./TodoItem";
import { useTodos } from "../contexts/TodoContext";

export function TodoList() {
  const { todos, loading, error, refreshTodos } = useTodos();

  if (loading) {
    return (
      <div className="todo-list">
        <div className="todo-header">
          <h1>Todo List</h1>
          <Link to="/todos/new" className="btn btn-primary">
            Todo追加
          </Link>
        </div>
        <div className="loading">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h1>Todo List</h1>
        <Link to="/todos/new" className="btn btn-primary">
          Todo追加
        </Link>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
          <button 
            onClick={refreshTodos} 
            className="btn btn-secondary"
          >
            再読み込み
          </button>
        </div>
      )}
      
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