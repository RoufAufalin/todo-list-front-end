import { PRIORITY_OPTIONS } from "../../config/appConfig"
import { TodoItem } from "./TodoItem"

export const TodoPanel = ({
  items,
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
  onRefresh,
  onAdd,
  onUpdate,
  onToggle,
  onDelete,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    void onAdd()
  }

  return (
    <article className="glass-card p-6 animate-fade-in-up">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">Daftar Todo</h2>
        <button
          type="button"
          onClick={onRefresh}
          className="secondary-btn"
          disabled={isLoadingTodos}
        >
          {isLoadingTodos ? "Memuat..." : "Refresh"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-3">
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Tambahkan todo baru"
          className="soft-input mt-0 sm:col-span-2"
          required
        />

        <select
          value={newPriority}
          onChange={(event) => setNewPriority(event.target.value)}
          className="soft-input mt-0"
        >
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="primary-btn sm:col-span-3"
          disabled={isAddingTodo}
        >
          {isAddingTodo ? "Menambah..." : "Tambah Todo"}
        </button>
      </form>

      <div className="mt-5 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
            Tidak ada todo. Tambahkan item pertama Anda.
          </div>
        ) : (
          items.map((todo, index) => {
            const id = todo?._id || todo?.id || ""

            return (
              <TodoItem
                key={id || `todo-${index}`}
                todo={todo}
                index={index}
                draftValue={drafts[id]}
                onDraftChange={setDraftValue}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
                togglingId={togglingId}
                updatingId={updatingId}
                deletingId={deletingId}
              />
            )
          })
        )}
      </div>
    </article>
  )
}
