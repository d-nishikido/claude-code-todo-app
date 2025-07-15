import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("todos/new", "routes/todos.new.tsx"),
  
  // API Routes
  route("api/todos", "routes/api.todos.ts"),
  route("api/todos/:id", "routes/api.todos.$id.ts"),
  route("api/todos/:id/toggle", "routes/api.todos.$id.toggle.ts")
] satisfies RouteConfig;
