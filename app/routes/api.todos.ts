import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { TodoService } from "../services/todoService";
import type { CreateTodoRequest } from "../types/api";

// GET /api/todos - Get all todos
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const todos = await TodoService.getAllTodos();
    return Response.json({ data: todos, success: true });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return Response.json(
      { data: [], success: false, error: 'Failed to fetch todos' },
      { status: 500 }
    );
  }
}

// POST /api/todos - Create new todo
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return Response.json(
      { success: false, error: 'Method not allowed' },
      { status: 405 }
    );
  }

  try {
    const body: CreateTodoRequest = await request.json();
    
    if (!body.title || !body.title.trim()) {
      return Response.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }

    const todo = await TodoService.createTodo({
      title: body.title.trim(),
      description: body.description?.trim()
    });

    return Response.json({ data: todo, success: true });
  } catch (error) {
    console.error('Error creating todo:', error);
    return Response.json(
      { success: false, error: 'Failed to create todo' },
      { status: 500 }
    );
  }
}