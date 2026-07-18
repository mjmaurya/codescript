export interface RelatedReadingItem {
  title: string;
  url: string;
  source?: string;
}

/**
 * Placeholder hook-point for linking tool pages out to blog.codescript.in articles.
 * Renders nothing until items are supplied by a future blog-integration data source.
 */
export function RelatedReading({ items = [] }: { items?: RelatedReadingItem[] }) {
  if (!items.length) return null;

  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-slate-100">Learn more</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.url}>
            <a
              href={item.url}
              className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
            >
              {item.title}
            </a>
            {item.source && <span className="ml-2 text-xs text-slate-400">{item.source}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
