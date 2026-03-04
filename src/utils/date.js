export const formatDateTime = (value) => {
  if (!value) return "-"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  })
}
