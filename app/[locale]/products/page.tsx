// Products listing page — Server Component. Fetches all products server-side
// via the centralized API client and passes the full list to the ProductFilter
// client component. Filtering happens client-side (in-memory) to avoid
// re-fetching on every keystroke — the server fetch runs once on page load.
import { getTranslations } from "next-intl/server";
import { fetchProducts } from "@/lib/api";
import { ProductFilter } from "@/components/ProductFilter";

export default async function ProductsPage() {
  const products = await fetchProducts();
  const t = await getTranslations("products");

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
        {t("title")}
      </h1>

      <ProductFilter products={products} />
    </div>
  );
}
