import { DEFAULT_BASE_URL } from "../config/appConfig"

export const normalizeBaseUrl = (value = "") =>
  (value || "").trim().replace(/\/+$/, "")

export const withDefaultBaseUrl = (value) =>
  normalizeBaseUrl(value || DEFAULT_BASE_URL)
