import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("todos/new", "routes/todos.new.tsx")
] satisfies RouteConfig;
