import { useCallback, useEffect, useMemo, useState } from "react"
import { loginUser, registerUser } from "../api/authApi"
import { requestJson } from "../api/httpClient"
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "../api/todoApi"
import {
  DEFAULT_BASE_URL,
  DEFAULT_PRIORITY,
  INITIAL_LOG,
  INITIAL_NOTICE,
  NOTICE_CLASS_MAP,
  STORAGE_KEYS,
} from "../config/appConfig"
import { withDefaultBaseUrl } from "../utils/baseUrl"
import { getTokenPreview, formatLogEntry } from "../utils/log"
import { extractToken, extractTodos } from "../utils/responseParsers"
import { readStorage, removeStorage, writeStorage } from "../utils/storage"
import {
  buildDraftMap,
  buildTodoPayload,
  getTodoId,
  getTodoPriority,
  getTodoTask,
  isTodoCompleted,
} from "../utils/todo"

export const useTodoApp = () => {
  const [baseUrlInput, setBaseUrlInput] = useState(() =>
    readStorage(STORAGE_KEYS.baseUrl, DEFAULT_BASE_URL),
  )
  const [activeBaseUrl, setActiveBaseUrl] = useState(() =>
    withDefaultBaseUrl(readStorage(STORAGE_KEYS.baseUrl, DEFAULT_BASE_URL)),
  )
  const [token, setToken] = useState(() => readStorage(STORAGE_KEYS.token, ""))

  const [registerForm, setRegisterForm] = useState({ email: "", password: "" })
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [newTodo, setNewTodo] = useState("")
  const [newPriority, setNewPriority] = useState(DEFAULT_PRIORITY)

  const [todos, setTodos] = useState([])
  const [drafts, setDrafts] = useState({})

  const [isLoadingTodos, setIsLoadingTodos] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const [updatingId, setUpdatingId] = useState("")
  const [togglingId, setTogglingId] = useState("")
  const [deletingId, setDeletingId] = useState("")

  const [notice, setNotice] = useState(INITIAL_NOTICE)
  const [logText, setLogText] = useState(INITIAL_LOG)

  const setLog = useCallback((title, payload) => {
    setLogText(formatLogEntry(title, payload))
  }, [])

  const request = useCallback(
    (path, options = {}) =>
      requestJson({
        baseUrl: activeBaseUrl,
        token,
        path,
        options,
      }),
    [activeBaseUrl, token],
  )

  const syncDrafts = useCallback((items) => {
    setDrafts(buildDraftMap(items))
  }, [])

  const loadTodos = useCallback(async () => {
    setIsLoadingTodos(true)

    try {
      const response = await fetchTodos(request)
      const items = extractTodos(response)

      setTodos(items)
      syncDrafts(items)
      setNotice({
        type: "success",
        text: `Todo berhasil dimuat (${items.length} item).`,
      })
      setLog("Load todos sukses", response)
    } catch (error) {
      setTodos([])
      syncDrafts([])

      if (!token) {
        setNotice({
          type: "info",
          text: "Login terlebih dahulu untuk mengakses todo.",
        })
      } else {
        setNotice({ type: "error", text: error.message })
      }

      setLog("Load todos gagal", error.message)
    } finally {
      setIsLoadingTodos(false)
    }
  }, [request, setLog, syncDrafts, token])

  useEffect(() => {
    loadTodos()
  }, [loadTodos])

  const saveBaseUrl = useCallback(() => {
    const normalized = withDefaultBaseUrl(baseUrlInput)
    writeStorage(STORAGE_KEYS.baseUrl, normalized)
    setActiveBaseUrl(normalized)
    setNotice({ type: "success", text: `Base URL disimpan: ${normalized}` })
    setLog("Base URL disimpan", normalized)
  }, [baseUrlInput, setLog])

  const submitRegister = useCallback(async () => {
    setIsRegistering(true)

    try {
      const payload = {
        email: registerForm.email.trim(),
        password: registerForm.password,
      }

      const response = await registerUser(request, payload)
      setNotice({ type: "success", text: "Register berhasil. Silakan login." })
      setLog("Register sukses", response)
      setRegisterForm({ email: "", password: "" })
    } catch (error) {
      setNotice({ type: "error", text: error.message })
      setLog("Register gagal", error.message)
    } finally {
      setIsRegistering(false)
    }
  }, [registerForm.email, registerForm.password, request, setLog])

  const submitLogin = useCallback(async () => {
    setIsLoggingIn(true)

    try {
      const payload = {
        email: loginForm.email.trim(),
        password: loginForm.password,
      }

      const response = await loginUser(request, payload)
      const nextToken = extractToken(response)

      if (!nextToken) {
        setNotice({
          type: "warning",
          text: "Login sukses, tetapi token tidak ditemukan di response.",
        })
      } else {
        writeStorage(STORAGE_KEYS.token, nextToken)
        setToken(nextToken)
        setNotice({ type: "success", text: "Login berhasil, token tersimpan." })
      }

      setLog("Login sukses", response)
      setLoginForm({ email: "", password: "" })
      await loadTodos()
    } catch (error) {
      setNotice({ type: "error", text: error.message })
      setLog("Login gagal", error.message)
    } finally {
      setIsLoggingIn(false)
    }
  }, [loadTodos, loginForm.email, loginForm.password, request, setLog])

  const logout = useCallback(() => {
    removeStorage(STORAGE_KEYS.token)
    setToken("")
    setTodos([])
    syncDrafts([])
    setNotice({ type: "info", text: "Token login dihapus." })
    setLog("Logout", "Token dihapus dari localStorage.")
  }, [setLog, syncDrafts])

  const submitAddTodo = useCallback(async () => {
    const task = newTodo.trim()
    if (!task) return

    setIsAddingTodo(true)

    try {
      const payload = buildTodoPayload({
        task,
        priority: newPriority,
        isCompleted: false,
      })

      const response = await addTodo(request, payload)
      setNotice({ type: "success", text: "Todo baru berhasil ditambahkan." })
      setLog("Tambah todo sukses", response)
      setNewTodo("")
      setNewPriority(DEFAULT_PRIORITY)
      await loadTodos()
    } catch (error) {
      setNotice({ type: "error", text: error.message })
      setLog("Tambah todo gagal", error.message)
    } finally {
      setIsAddingTodo(false)
    }
  }, [loadTodos, newPriority, newTodo, request, setLog])

  const submitUpdateTodo = useCallback(
    async (id) => {
      const task = (drafts[id] || "").trim()
      if (!id || !task) return

      const currentTodo = todos.find((todo) => getTodoId(todo) === id)
      setUpdatingId(id)

      try {
        const payload = buildTodoPayload({
          task,
          isCompleted: currentTodo?.isCompleted ?? false,
          priority: getTodoPriority(currentTodo),
          createdAt: currentTodo?.createdAt,
        })

        const response = await updateTodo(request, id, payload)
        setNotice({ type: "success", text: `Todo ${id} berhasil diupdate.` })
        setLog("Update todo sukses", response)
        await loadTodos()
      } catch (error) {
        setNotice({ type: "error", text: error.message })
        setLog("Update todo gagal", error.message)
      } finally {
        setUpdatingId("")
      }
    },
    [drafts, loadTodos, request, setLog, todos],
  )

  const submitToggleTodo = useCallback(
    async (id) => {
      if (!id) return
      const currentTodo = todos.find((todo) => getTodoId(todo) === id)
      if (!currentTodo) return

      setTogglingId(id)

      try {
        const payload = buildTodoPayload({
          task: getTodoTask(currentTodo),
          isCompleted: !isTodoCompleted(currentTodo),
          priority: getTodoPriority(currentTodo),
          createdAt: currentTodo?.createdAt,
        })

        const response = await updateTodo(request, id, payload)
        setNotice({ type: "success", text: `Status todo ${id} diperbarui.` })
        setLog("Toggle todo sukses", response)
        await loadTodos()
      } catch (error) {
        setNotice({ type: "error", text: error.message })
        setLog("Toggle todo gagal", error.message)
      } finally {
        setTogglingId("")
      }
    },
    [loadTodos, request, setLog, todos],
  )

  const submitDeleteTodo = useCallback(
    async (id) => {
      if (!id) return

      setDeletingId(id)

      try {
        const response = await deleteTodo(request, id)
        setNotice({ type: "success", text: `Todo ${id} berhasil dihapus.` })
        setLog("Hapus todo sukses", response)
        await loadTodos()
      } catch (error) {
        setNotice({ type: "error", text: error.message })
        setLog("Hapus todo gagal", error.message)
      } finally {
        setDeletingId("")
      }
    },
    [loadTodos, request, setLog],
  )

  const setDraftValue = useCallback((id, value) => {
    setDrafts((prev) => ({ ...prev, [id]: value }))
  }, [])

  const tokenPreview = useMemo(() => getTokenPreview(token), [token])
  const noticeClass = NOTICE_CLASS_MAP[notice.type] || NOTICE_CLASS_MAP.info

  return {
    config: {
      baseUrlInput,
      setBaseUrlInput,
      saveBaseUrl,
    },
    auth: {
      registerForm,
      setRegisterForm,
      loginForm,
      setLoginForm,
      submitRegister,
      submitLogin,
      logout,
      tokenPreview,
      isRegistering,
      isLoggingIn,
    },
    todos: {
      items: todos,
      drafts,
      setDraftValue,
      newTodo,
      setNewTodo,
      newPriority,
      setNewPriority,
      isLoadingTodos,
      isAddingTodo,
      updatingId,
      togglingId,
      deletingId,
      refreshTodos: loadTodos,
      submitAddTodo,
      submitUpdateTodo,
      submitToggleTodo,
      submitDeleteTodo,
    },
    status: {
      notice,
      noticeClass,
      logText,
    },
  }
}
