import { Link } from "react-router";
import { TodoItem } from "./TodoItem";
import { useTodos } from "../contexts/TodoContext";
import { Tooltip } from "./Tooltip";

export function TodoList() {
  const { todos, loading, error, refreshTodos } = useTodos();

  if (loading) {
    return (
      <div className="todo-list">
        <div className="todo-header">
          <h1>Todo List</h1>
          <Tooltip 
            content="新しいTodoを追加"
            position="bottom"
          >
            <Link to="/todos/new" className="btn btn-primary">
              Todo追加
            </Link>
          </Tooltip>
        </div>
        <div className="loading">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h1>Todo List</h1>
        <Tooltip 
          content="新しいTodoを追加"
          position="bottom"
        >
          <Link to="/todos/new" className="btn btn-primary">
            Todo追加
          </Link>
        </Tooltip>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
          <Tooltip 
            content="データを再読み込み"
            position="top"
          >
            <button 
              onClick={refreshTodos} 
              className="btn btn-secondary"
            >
              再読み込み
            </button>
          </Tooltip>
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