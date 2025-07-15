import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Todo } from "../types/todo";
import { ApiClient } from "../utils/apiClient";
import type { TodosResponse, TodoResponse, CreateTodoRequest } from "../types/api";

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  addTodo: (title: string, description?: string) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  refreshTodos: () => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos from API
  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ApiClient.get<TodosResponse>('/todos');
      if (response.success) {
        setTodos(response.data);
      } else {
        setError(response.error || 'Failed to fetch todos');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async (title: string, description?: string) => {
    setError(null);
    try {
      const requestData: CreateTodoRequest = { title, description };
      const response = await ApiClient.post<TodoResponse>('/todos', requestData);
      
      if (response.success) {
        setTodos(prev => [response.data, ...prev]);
      } else {
        setError(response.error || 'Failed to create todo');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create todo');
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: number) => {
    setError(null);
    try {
      const response = await ApiClient.post<TodoResponse>(`/todos/${id}/toggle`);
      
      if (response.success) {
        setTodos(prev => prev.map(todo => 
          todo.id === id ? response.data : todo
        ));
      } else {
        setError(response.error || 'Failed to toggle todo');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to toggle todo');
    }
  };

  // Delete todo
  const deleteTodo = async (id: number) => {
    setError(null);
    try {
      const response = await ApiClient.delete<{ success: boolean; error?: string }>(`/todos/${id}`);
      
      if (response.success) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
      } else {
        setError(response.error || 'Failed to delete todo');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete todo');
    }
  };

  // Refresh todos
  const refreshTodos = async () => {
    await fetchTodos();
  };

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodoContext.Provider value={{ 
      todos, 
      loading, 
      error, 
      addTodo, 
      toggleTodo, 
      deleteTodo, 
      refreshTodos 
    }}>
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