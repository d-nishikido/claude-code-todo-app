import { db } from './database';
import type { Todo } from '../types/todo';

export class TodoService {
  // Get all todos
  static async getAllTodos(): Promise<Todo[]> {
    const todos = await db.todo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    return todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      description: todo.description || undefined,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    }));
  }

  // Get todo by ID
  static async getTodoById(id: number): Promise<Todo | null> {
    const todo = await db.todo.findUnique({
      where: { id }
    });
    
    if (!todo) return null;
    
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description || undefined,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    };
  }

  // Create new todo
  static async createTodo(data: { title: string; description?: string }): Promise<Todo> {
    const todo = await db.todo.create({
      data: {
        title: data.title,
        description: data.description || null
      }
    });
    
    return {
      id: todo.id,
      title: todo.title,
      description: todo.description || undefined,
      completed: todo.completed,
      createdAt: todo.createdAt,
      updatedAt: todo.updatedAt
    };
  }

  // Update todo
  static async updateTodo(id: number, data: { title?: string; description?: string; completed?: boolean }): Promise<Todo | null> {
    try {
      const todo = await db.todo.update({
        where: { id },
        data: {
          ...(data.title !== undefined && { title: data.title }),
          ...(data.description !== undefined && { description: data.description || null }),
          ...(data.completed !== undefined && { completed: data.completed })
        }
      });
      
      return {
        id: todo.id,
        title: todo.title,
        description: todo.description || undefined,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt
      };
    } catch (error) {
      // Handle case where todo doesn't exist
      return null;
    }
  }

  // Delete todo
  static async deleteTodo(id: number): Promise<boolean> {
    try {
      await db.todo.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  // Toggle todo completion
  static async toggleTodo(id: number): Promise<Todo | null> {
    try {
      const existingTodo = await db.todo.findUnique({
        where: { id }
      });
      
      if (!existingTodo) return null;
      
      const todo = await db.todo.update({
        where: { id },
        data: { completed: !existingTodo.completed }
      });
      
      return {
        id: todo.id,
        title: todo.title,
        description: todo.description || undefined,
        completed: todo.completed,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt
      };
    } catch (error) {
      return null;
    }
  }
}