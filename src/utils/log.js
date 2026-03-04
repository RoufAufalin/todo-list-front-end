export const formatLogEntry = (title, payload) => {
  const content =
    typeof payload === "string" ? payload : JSON.stringify(payload, null, 2)

  return `[${new Date().toLocaleTimeString("id-ID")}] ${title}\n${content}`
}

export const getTokenPreview = (token) => {
  if (!token) return "Belum login"
  return token.length > 28 ? `${token.slice(0, 28)}...` : token
}
