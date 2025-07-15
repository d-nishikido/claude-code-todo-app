import type { Todo } from './todo';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
}

export interface UpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export type TodosResponse = ApiResponse<Todo[]>;
export type TodoResponse = ApiResponse<Todo>;
export type DeleteTodoResponse = ApiResponse<{ id: number }>;