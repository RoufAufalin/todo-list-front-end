import { withDefaultBaseUrl } from "../utils/baseUrl"

export const requestJson = async ({ baseUrl, token, path, options = {} }) => {
  const normalizedBaseUrl = withDefaultBaseUrl(baseUrl)
  if (!normalizedBaseUrl) {
    throw new Error("Base URL API belum diisi.")
  }

  const url = `${normalizedBaseUrl}${path.startsWith("/") ? path : `/${path}`}`
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers,
  })

  const raw = await response.text()
  let json

  try {
    json = raw ? JSON.parse(raw) : {}
  } catch {
    json = { message: raw || "Response bukan JSON" }
  }

  if (!response.ok) {
    throw new Error(json?.message || `Request gagal (${response.status})`)
  }

  return json
}
