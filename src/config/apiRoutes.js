export const API_ROUTES = {
  register: "/users/register",
  login: "/users/login",
  todos: "/todos/",
  addTodo: "/todos/add",
  updateTodo: (id) => `/todos/${id}`,
  deleteTodo: (id) => `/todo/delete/${id}`,
}
