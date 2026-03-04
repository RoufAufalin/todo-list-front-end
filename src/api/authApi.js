import { API_ROUTES } from "../config/apiRoutes"

export const registerUser = (request, payload) =>
  request(API_ROUTES.register, {
    method: "POST",
    body: JSON.stringify(payload),
  })

export const loginUser = (request, payload) =>
  request(API_ROUTES.login, {
    method: "POST",
    body: JSON.stringify(payload),
  })
