import { formatDateTime } from "../../utils/date"
import {
  getTodoId,
  getTodoPriority,
  getTodoTask,
  isTodoCompleted,
} from "../../utils/todo"

export const TodoItem = ({
  todo,
  index,
  draftValue,
  onDraftChange,
  onToggle,
  onUpdate,
  onDelete,
  togglingId,
  updatingId,
  deletingId,
}) => {
  const id = getTodoId(todo)
  const completed = isTodoCompleted(todo)
  const priority = getTodoPriority(todo)

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-4"
      style={{
        animation: "fade-in-up .5s ease-out both",
        animationDelay: `${index * 55}ms`,
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          ID: {id || "(tanpa id)"}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            className="secondary-btn px-3 py-2 text-xs"
            onClick={() => onToggle(id)}
            disabled={togglingId === id || !id}
          >
            {togglingId === id
              ? "Menyimpan..."
              : completed
                ? "Jadikan Belum"
                : "Jadikan Selesai"}
          </button>

          <button
            type="button"
            className="secondary-btn px-3 py-2 text-xs"
            onClick={() => onUpdate(id)}
            disabled={updatingId === id || !id}
          >
            {updatingId === id ? "Menyimpan..." : "Update"}
          </button>

          <button
            type="button"
            className="danger-btn"
            onClick={() => onDelete(id)}
            disabled={deletingId === id || !id}
          >
            {deletingId === id ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>

      <input
        type="text"
        value={draftValue ?? getTodoTask(todo)}
        onChange={(event) => onDraftChange(id, event.target.value)}
        className="soft-input"
        placeholder="Isi todo"
      />

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`rounded-full px-2.5 py-1 font-semibold ${
            completed ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          }`}
        >
          {completed ? "Completed" : "Pending"}
        </span>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
          Priority: {priority}
        </span>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
          Created: {formatDateTime(todo?.createdAt)}
        </span>
      </div>
    </div>
  )
}
