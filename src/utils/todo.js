import { DEFAULT_PRIORITY } from "../config/appConfig"

export const getTodoId = (todo) => todo?._id || todo?.id || ""

export const getTodoTask = (todo) =>
  todo?.task || todo?.title || todo?.todo || todo?.text || ""

export const getTodoPriority = (todo) => todo?.priority || DEFAULT_PRIORITY

export const isTodoCompleted = (todo) => Boolean(todo?.isCompleted)

export const buildDraftMap = (todos) =>
  todos.reduce((acc, todo) => {
    const id = getTodoId(todo)
    if (id) {
      acc[id] = getTodoTask(todo)
    }
    return acc
  }, {})

export const buildTodoPayload = ({
  task,
  priority,
  isCompleted = false,
  createdAt,
}) => ({
  task,
  priority,
  isCompleted,
  createdAt: createdAt || new Date().toISOString(),
})
