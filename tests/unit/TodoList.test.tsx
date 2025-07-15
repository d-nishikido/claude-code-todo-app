import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoList } from '../../app/components/TodoList';
import { TodoProvider } from '../../app/contexts/TodoContext';
import { BrowserRouter } from 'react-router';

// Mock the API client
vi.mock('../../app/utils/apiClient', () => ({
  ApiClient: {
    get: vi.fn().mockResolvedValue({
      success: true,
      data: [
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
      ]
    })
  }
}));

vi.mock('../../app/components/TodoItem', () => ({
  TodoItem: ({ todo }: { todo: any }) => (
    <div data-testid={`todo-item-${todo.id}`}>
      {todo.title}
    </div>
  ),
}));

describe('TodoList', () => {
  it('renders the todo list heading', async () => {
    render(
      <BrowserRouter>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  it('renders all todo items', async () => {
    render(
      <BrowserRouter>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
      expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();
      expect(screen.getByTestId('todo-item-4')).toBeInTheDocument();
    });
  });

  it('renders todo titles correctly', async () => {
    render(
      <BrowserRouter>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.getByText('React Router v7の学習')).toBeInTheDocument();
      expect(screen.getByText('TypeScriptの型定義')).toBeInTheDocument();
      expect(screen.getByText('Vitestのセットアップ')).toBeInTheDocument();
      expect(screen.getByText('Dockerコンテナの準備')).toBeInTheDocument();
    });
  });

  it('does not show empty message when todos exist', async () => {
    render(
      <BrowserRouter>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </BrowserRouter>
    );
    
    await waitFor(() => {
      expect(screen.queryByText('Todoアイテムがありません')).not.toBeInTheDocument();
    });
  });
});