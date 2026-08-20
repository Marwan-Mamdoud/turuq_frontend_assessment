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
