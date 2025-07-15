import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { TodoService } from "../services/todoService";
import type { UpdateTodoRequest } from "../types/api";

// GET /api/todos/:id - Get single todo
export async function loader({ params }: LoaderFunctionArgs) {
  const id = parseInt(params.id!);
  
  if (isNaN(id)) {
    return Response.json(
      { success: false, error: 'Invalid todo ID' },
      { status: 400 }
    );
  }

  try {
    const todo = await TodoService.getTodoById(id);
    
    if (!todo) {
      return Response.json(
        { success: false, error: 'Todo not found' },
        { status: 404 }
      );
    }

    return Response.json({ data: todo, success: true });
  } catch (error) {
    console.error('Error fetching todo:', error);
    return Response.json(
      { success: false, error: 'Failed to fetch todo' },
      { status: 500 }
    );
  }
}

// PUT /api/todos/:id - Update todo
// DELETE /api/todos/:id - Delete todo
export async function action({ request, params }: ActionFunctionArgs) {
  const id = parseInt(params.id!);
  
  if (isNaN(id)) {
    return Response.json(
      { success: false, error: 'Invalid todo ID' },
      { status: 400 }
    );
  }

  try {
    if (request.method === 'PUT') {
      const body: UpdateTodoRequest = await request.json();
      
      const todo = await TodoService.updateTodo(id, body);
      
      if (!todo) {
        return Response.json(
          { success: false, error: 'Todo not found' },
          { status: 404 }
        );
      }

      return Response.json({ data: todo, success: true });
    }
    
    if (request.method === 'DELETE') {
      const success = await TodoService.deleteTodo(id);
      
      if (!success) {
        return Response.json(
          { success: false, error: 'Todo not found or could not be deleted' },
          { status: 404 }
        );
      }

      return Response.json({ data: { id }, success: true });
    }
    
    return Response.json(
      { success: false, error: 'Method not allowed' },
      { status: 405 }
    );
  } catch (error) {
    console.error('Error updating/deleting todo:', error);
    return Response.json(
      { success: false, error: 'Failed to update/delete todo' },
      { status: 500 }
    );
  }
}