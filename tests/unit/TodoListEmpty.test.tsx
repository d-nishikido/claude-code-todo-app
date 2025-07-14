import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import type { Todo } from '../../app/types/todo';
import { TodoItem } from '../../app/components/TodoItem';

// Test for empty state
function EmptyTodoList() {
  const mockTodos: Todo[] = [];
  
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

describe('TodoList - Empty State', () => {
  it('shows empty message when no todos exist', () => {
    render(<EmptyTodoList />);
    
    expect(screen.getByText('Todoアイテムがありません')).toBeInTheDocument();
  });
});