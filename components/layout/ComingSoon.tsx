export interface ComingSoonHighlight {
  title: string;
  description: string;
}

export function ComingSoon({
  title,
  intro,
  highlights,
  closing,
}: {
  title: string;
  intro: string;
  highlights: ComingSoonHighlight[];
  closing?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{intro}</p>
        <p className="mt-6 inline-block rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Coming soon
        </p>
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">What to expect</h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {highlights.map((highlight) => (
            <li
              key={highlight.title}
              className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <p className="font-medium text-slate-900 dark:text-slate-100">{highlight.title}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{highlight.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {closing && (
        <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">{closing}</p>
      )}
    </div>
  );
}
