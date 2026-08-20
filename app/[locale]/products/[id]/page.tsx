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
