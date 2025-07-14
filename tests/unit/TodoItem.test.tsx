import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TodoItem } from '../../app/components/TodoItem';
import type { Todo } from '../../app/types/todo';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test description',
    completed: false,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
  };

  it('renders todo item correctly', () => {
    render(<TodoItem todo={mockTodo} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText(/Created: /)).toBeInTheDocument();
  });

  it('renders checkbox unchecked for incomplete todo', () => {
    render(<TodoItem todo={mockTodo} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('renders checkbox checked for completed todo', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('applies completed class when todo is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    const { container } = render(<TodoItem todo={completedTodo} />);
    
    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });

  it('does not apply completed class when todo is incomplete', () => {
    const { container } = render(<TodoItem todo={mockTodo} />);
    
    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).not.toHaveClass('completed');
  });

  it('does not render description when not provided', () => {
    const todoWithoutDescription = { ...mockTodo, description: undefined };
    render(<TodoItem todo={todoWithoutDescription} />);
    
    expect(screen.queryByText('Test description')).not.toBeInTheDocument();
  });
});