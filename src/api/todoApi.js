import { API_ROUTES } from "../config/apiRoutes"

export const fetchTodos = (request) => request(API_ROUTES.todos)

export const addTodo = (request, payload) =>
  request(API_ROUTES.addTodo, {
    method: "POST",
    body: JSON.stringify(payload),
  })

export const updateTodo = (request, id, payload) =>
  request(API_ROUTES.updateTodo(id), {
    method: "PUT",
    body: JSON.stringify(payload),
  })

export const deleteTodo = (request, id) =>
  request(API_ROUTES.deleteTodo(id), {
    method: "DELETE",
  })
