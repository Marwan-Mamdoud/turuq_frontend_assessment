// Global 404 page. Shown when Next.js can't match a route (e.g. /en/products/999
// where the product doesn't exist). Uses the app's design language — primary
// colored icon, large heading, and a link back to the home page.
import Link from "next/link";
import { Package, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="p-6 rounded-3xl bg-primary/10 mb-6">
        <Package className="h-16 w-16 text-primary" />
      </div>
      <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/en"
        className="inline-flex items-center gap-2 h-10 px-6 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
}
