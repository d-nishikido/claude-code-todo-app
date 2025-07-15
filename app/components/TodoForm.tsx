import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useTodos } from "../contexts/TodoContext";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTodo } = useTodos();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    addTodo(title.trim(), description.trim() || undefined);
    navigate("/");
  };

  return (
    <div className="todo-form-container">
      <h1>新しいTodoを追加</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="title">タイトル（必須）</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Todoのタイトルを入力"
            className="form-input"
            autoFocus
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">説明（任意）</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="詳細な説明を入力"
            className="form-textarea"
            rows={4}
          />
        </div>
        
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn btn-secondary"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="btn btn-primary"
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
}