export const HeroSection = ({
  baseUrlInput,
  onBaseUrlInputChange,
  onSaveBaseUrl,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSaveBaseUrl()
  }

  return (
    <section className="glass-card relative overflow-hidden p-6 sm:p-8 animate-fade-in-up">
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-100 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 right-24 h-36 w-36 rounded-full bg-accent-100 blur-2xl animate-float" />

      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
        Todo API Client
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-3xl leading-tight text-slate-900 sm:text-4xl">
        React + Vite + Tailwind untuk Register, Login, dan CRUD Todo
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted sm:text-base">
        Gunakan endpoint API Anda: <span className="font-medium">/users/login</span>,{" "}
        <span className="font-medium">/users/register</span>, <span className="font-medium">/todos/add</span>,{" "}
        <span className="font-medium">/todos/:id</span>, <span className="font-medium">/todos/</span>, dan{" "}
        <span className="font-medium">/todo/delete/:id</span>.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 sm:grid-cols-[1fr_auto]"
      >
        <label className="text-sm font-medium text-slate-700">
          Base URL API
          <input
            type="url"
            value={baseUrlInput}
            onChange={(event) => onBaseUrlInputChange(event.target.value)}
            placeholder="http://localhost:3000"
            className="soft-input"
            required
          />
        </label>
        <button type="submit" className="primary-btn self-end">
          Simpan URL
        </button>
      </form>
    </section>
  )
}
