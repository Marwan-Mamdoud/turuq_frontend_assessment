// Product detail page — Server Component. Fetches a single product by ID from
// the centralized API (which fetches all and finds locally, since the mock API
// doesn't support /products/{id}). Delegates rendering to ProductDetailClient
// for the inline-edit UI. Shows the 404 page if the product doesn't exist.
import { notFound } from "next/navigation";
import { fetchProduct } from "@/lib/api";
import { ProductDetailClient } from "@/components/ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
