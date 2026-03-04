export const LoginCard = ({
  form,
  setForm,
  onSubmit,
  onLogout,
  tokenPreview,
  isSubmitting,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    void onSubmit()
  }

  return (
    <article className="glass-card p-6 animate-fade-in-up">
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-900">Login</h2>
        <button
          type="button"
          onClick={onLogout}
          className="secondary-btn px-3 py-2 text-xs"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label className="text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            className="soft-input"
            required
          />
        </label>

        <label className="text-sm font-medium text-slate-700">
          Password
          <input
            type="password"
            minLength={6}
            value={form.password}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                password: event.target.value,
              }))
            }
            className="soft-input"
            required
          />
        </label>

        <button
          type="submit"
          className="primary-btn w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Masuk..." : "Login"}
        </button>
      </form>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          Token aktif
        </p>
        <p className="mt-1 break-all text-sm text-slate-700">{tokenPreview}</p>
      </div>
    </article>
  )
}
