import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { TodoService } from "../services/todoService.server";
import type { UpdateTodoRequest } from "../types/api";

// GET /api/todos/:id - Get single todo
export async function loader({ params }: LoaderFunctionArgs) {
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
    const todo = await TodoService.getTodoById(id);
    
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
    console.error('Error fetching todo:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to fetch todo' }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

// PUT /api/todos/:id - Update todo
// DELETE /api/todos/:id - Delete todo
export async function action({ request, params }: ActionFunctionArgs) {
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
    if (request.method === 'PUT') {
      const body: UpdateTodoRequest = await request.json();
      
      const todo = await TodoService.updateTodo(id, body);
      
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
    }
    
    if (request.method === 'DELETE') {
      const success = await TodoService.deleteTodo(id);
      
      if (!success) {
        return new Response(
          JSON.stringify({ success: false, error: 'Todo not found or could not be deleted' }),
          { 
            status: 404,
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      return new Response(
        JSON.stringify({ data: { id }, success: true }),
        {
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { 
        status: 405,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error('Error updating/deleting todo:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to update/delete todo' }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}