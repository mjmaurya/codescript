export function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">{title}</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">{description}</p>
      <p className="mt-6 inline-block rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        Coming soon
      </p>
    </div>
  );
}
