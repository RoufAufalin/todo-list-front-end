export const readStorage = (key, fallback = "") =>
  localStorage.getItem(key) || fallback

export const writeStorage = (key, value) => {
  localStorage.setItem(key, value)
}

export const removeStorage = (key) => {
  localStorage.removeItem(key)
}
