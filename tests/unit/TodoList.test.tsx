import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoList } from '../../app/components/TodoList';
import { TodoProvider } from '../../app/contexts/TodoContext';
import { BrowserRouter } from 'react-router';

vi.mock('../../app/components/TodoItem', () => ({
  TodoItem: ({ todo }: { todo: any }) => (
    <div data-testid={`todo-item-${todo.id}`}>
      {todo.title}
    </div>
  ),
}));

describe('TodoList', () => {
  it('renders the todo list heading', () => {
    render(
      <BrowserRouter>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  it('renders all todo items', () => {
    render(
      <BrowserRouter>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-3')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-4')).toBeInTheDocument();
  });

  it('renders todo titles correctly', () => {
    render(
      <BrowserRouter>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByText('React Router v7の学習')).toBeInTheDocument();
    expect(screen.getByText('TypeScriptの型定義')).toBeInTheDocument();
    expect(screen.getByText('Vitestのセットアップ')).toBeInTheDocument();
    expect(screen.getByText('Dockerコンテナの準備')).toBeInTheDocument();
  });

  it('does not show empty message when todos exist', () => {
    render(
      <BrowserRouter>
        <TodoProvider>
          <TodoList />
        </TodoProvider>
      </BrowserRouter>
    );
    
    expect(screen.queryByText('Todoアイテムがありません')).not.toBeInTheDocument();
  });
});