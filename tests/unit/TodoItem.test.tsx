import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TodoItem } from '../../app/components/TodoItem';
import { TodoProvider } from '../../app/contexts/TodoContext';
import type { Todo } from '../../app/types/todo';

// Mock the API client
vi.mock('../../app/utils/apiClient', () => ({
  ApiClient: {
    get: vi.fn().mockResolvedValue({
      success: true,
      data: []
    }),
    post: vi.fn().mockResolvedValue({
      success: true,
      data: {}
    }),
    delete: vi.fn().mockResolvedValue({
      success: true,
      data: {}
    })
  }
}));

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test description',
    completed: false,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  const renderWithProvider = (todo: Todo) => {
    return render(
      <TodoProvider>
        <TodoItem todo={todo} />
      </TodoProvider>
    );
  };

  it('renders todo item correctly', () => {
    renderWithProvider(mockTodo);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText(/Created: /)).toBeInTheDocument();
  });

  it('renders checkbox unchecked for incomplete todo', () => {
    renderWithProvider(mockTodo);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox checked for completed todo', () => {
    const completedTodo = { ...mockTodo, completed: true };
    renderWithProvider(completedTodo);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('applies completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { container } = renderWithProvider(completedTodo);
    
    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });

  it('does not apply completed class when todo is incomplete', () => {
    const { container } = renderWithProvider(mockTodo);
    
    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).not.toHaveClass('completed');
  });

  it('does not render description when not provided', () => {
    const todoWithoutDescription = { ...mockTodo, description: undefined };
    renderWithProvider(todoWithoutDescription);
    
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });
});