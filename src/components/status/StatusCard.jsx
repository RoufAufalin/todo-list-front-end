export const StatusCard = ({ noticeClass, noticeText, logText }) => {
  return (
    <article className="glass-card p-6 animate-fade-in-up">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Status
      </h3>
      <p className={`mt-3 rounded-xl border px-3 py-2 text-sm ${noticeClass}`}>
        {noticeText}
      </p>
      <pre className="mt-3 max-h-52 overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-emerald-200">
        {logText}
      </pre>
    </article>
  )
}
