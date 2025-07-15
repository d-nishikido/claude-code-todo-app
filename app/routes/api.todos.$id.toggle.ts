import type { ActionFunctionArgs } from "react-router";
import { TodoService } from "../services/todoService.server";

// POST /api/todos/:id/toggle - Toggle todo completion
export async function action({ request, params }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const id = parseInt(params.id!);
  
  if (isNaN(id)) {
    return new Response(
      JSON.stringify({ success: false, error: 'Invalid todo ID' }),
      { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const todo = await TodoService.toggleTodo(id);
    
    if (!todo) {
      return new Response(
        JSON.stringify({ success: false, error: 'Todo not found' }),
        { 
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({ data: todo, success: true }),
      {
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error('Error toggling todo:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to toggle todo' }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}