// Loading skeleton for the products page. Next.js shows this automatically
// while the Server Component (products/page.tsx) is fetching data. The
// skeleton layout mirrors the final layout (search bar + 6-card grid) so
// the page doesn't shift when real content replaces the placeholders.
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="max-w-6xl mx-auto">
      <Skeleton className="h-10 w-48 mb-8" />

      <div className="flex gap-3 mb-6">
        <Skeleton className="h-10 flex-1 rounded-xl" />
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
