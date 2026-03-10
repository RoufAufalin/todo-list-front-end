export const API_ROUTES = {
  register: "/users/registers",
  login: "/users/login",
  todos: "/todos/",
  addTodo: "/todos/add",
  updateTodo: (id) => `/todos/${id}`,
  deleteTodo: (id) => `/todo/delete/${id}`,
}
