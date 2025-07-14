import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

const mockTodos: Todo[] = [
  {
    id: 1,
    title: "React Router v7の学習",
    description: "新しいルーティングシステムを理解する",
    completed: false,
    createdAt: new Date("2025-01-01"),
    updatedAt: new Date("2025-01-01"),
  },
  {
    id: 2,
    title: "TypeScriptの型定義",
    description: "Todo型を正しく定義する",
    completed: true,
    createdAt: new Date("2025-01-02"),
    updatedAt: new Date("2025-01-02"),
  },
  {
    id: 3,
    title: "Vitestのセットアップ",
    description: "ユニットテストとインテグレーションテストの環境構築",
    completed: false,
    createdAt: new Date("2025-01-03"),
    updatedAt: new Date("2025-01-03"),
  },
  {
    id: 4,
    title: "Dockerコンテナの準備",
    description: "開発環境をDockerで統一する",
    completed: false,
    createdAt: new Date("2025-01-04"),
    updatedAt: new Date("2025-01-04"),
  },
];

export function TodoList() {
  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      {mockTodos.length === 0 ? (
        <p className="no-todos">Todoアイテムがありません</p>
      ) : (
        <div className="todos">
          {mockTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}