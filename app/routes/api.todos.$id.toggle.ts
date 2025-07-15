import type { ActionFunctionArgs } from "react-router";
import { TodoService } from "../services/todoService";

// POST /api/todos/:id/toggle - Toggle todo completion
export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return Response.json(
      { success: false, error: 'Method not allowed' },
      { status: 405 }
    );
  }

  const id = parseInt(params.id!);
  
  if (isNaN(id)) {
    return Response.json(
      { success: false, error: 'Invalid todo ID' },
      { status: 400 }
    );
  }

  try {
    const todo = await TodoService.toggleTodo(id);
    
    if (!todo) {
      return Response.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      );
    }

    return Response.json({ data: todo, success: true });
  } catch (error) {
    console.error('Error toggling todo:', error);
    return Response.json(
      { success: false, error: 'Failed to toggle todo' },
      { status: 500 }
    );
  }
}