export const RegisterCard = ({ form, setForm, onSubmit, isSubmitting }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    void onSubmit()
  }

  return (
    <article className="glass-card p-6 animate-fade-in-up">
      <h2 className="text-lg font-semibold text-slate-900">Register</h2>
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
          {isSubmitting ? "Mendaftarkan..." : "Register"}
        </button>
      </form>
    </article>
  )
}
