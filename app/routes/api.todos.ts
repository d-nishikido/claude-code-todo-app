import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { TodoService } from "../services/todoService.server";
import type { CreateTodoRequest } from "../types/api";

// GET /api/todos - Get all todos
export async function loader({ request }: LoaderFunctionArgs) {
  try {
    const todos = await TodoService.getAllTodos();
    return new Response(JSON.stringify({ data: todos, success: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return new Response(
      JSON.stringify({ data: [], success: false, error: 'Failed to fetch todos' }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// POST /api/todos - Create new todo
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body: CreateTodoRequest = await request.json();
    
    if (!body.title || !body.title.trim()) {
      return new Response(
        JSON.stringify({ success: false, error: 'Title is required' }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const todo = await TodoService.createTodo({
      title: body.title.trim(),
      description: body.description?.trim()
    });

    return new Response(
      JSON.stringify({ data: todo, success: true }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error('Error creating todo:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to create todo' }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}