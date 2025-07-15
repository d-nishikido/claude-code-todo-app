import { createContext, useContext, useState, type ReactNode } from "react";
import type { Todo } from "../types/todo";

interface TodoContextType {
  todos: Todo[];
  addTodo: (title: string, description?: string) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const initialTodos: Todo[] = [
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

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const addTodo = (title: string, description?: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
}