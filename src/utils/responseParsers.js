export const extractToken = (json) =>
  json?.token ||
  json?.accessToken ||
  json?.jwt ||
  json?.data?.token ||
  json?.data?.accessToken ||
  ""

export const extractTodos = (json) => {
  if (Array.isArray(json)) return json
  if (Array.isArray(json?.todos)) return json.todos
  if (Array.isArray(json?.data)) return json.data
  if (Array.isArray(json?.data?.todos)) return json.data.todos
  return []
}
