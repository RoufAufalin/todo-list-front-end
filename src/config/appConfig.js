export const STORAGE_KEYS = {
  baseUrl: "todo_api_base_url",
  token: "todo_api_token",
}

export const DEFAULT_BASE_URL = "http://localhost"
export const DEFAULT_PRIORITY = "normal"

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
]

export const NOTICE_CLASS_MAP = {
  info: "border-slate-200 bg-slate-50 text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
}

export const INITIAL_NOTICE = {
  type: "info",
  text: "Siap terhubung ke API Todo Anda.",
}

export const INITIAL_LOG = "Belum ada aktivitas."
