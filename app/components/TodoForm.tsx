import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useTodos } from "../contexts/TodoContext";
import { Tooltip } from "./Tooltip";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTodo, error } = useTodos();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!title.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      await addTodo(title.trim(), description.trim() || undefined);
      navigate("/");
    } catch (err) {
      // Error is handled in the context
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="todo-form-container">
      <h1>新しいTodoを追加</h1>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="title">タイトル（必須）</label>
          <Tooltip 
            content="Todoのタイトルを入力してください（必須項目）"
            position="top"
          >
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Todoのタイトルを入力"
              className="form-input"
              autoFocus
              disabled={isSubmitting}
            />
          </Tooltip>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">説明（任意）</label>
          <Tooltip 
            content="Todoの詳細な説明を入力してください（任意）"
            position="top"
          >
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="詳細な説明を入力"
              className="form-textarea"
              rows={4}
              disabled={isSubmitting}
            />
          </Tooltip>
        </div>
        
        <div className="form-actions">
          <Tooltip 
            content="変更を破棄してTodoリストに戻る"
            position="top"
          >
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              キャンセル
            </button>
          </Tooltip>
          <Tooltip 
            content={!title.trim() ? "タイトルを入力してください" : "Todoを保存"}
            position="top"
          >
            <button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="btn btn-primary"
            >
              {isSubmitting ? "保存中..." : "保存"}
            </button>
          </Tooltip>
        </div>
      </form>
    </div>
  );
}