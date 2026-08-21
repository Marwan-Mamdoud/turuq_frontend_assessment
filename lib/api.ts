// Centralized Axios API client. All product data fetching goes through this
// module to avoid duplicating base URL, timeout, and error handling logic.
import axios from "axios";
import { Product } from "@/types/product";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCTS_API_URL,
  timeout: 10000,
});

/** Fetch all products from the mock API. */
export async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products");
  return data;
}

/**
 * Fetch a single product by ID. The mock API doesn't support /products/{id}
 * (returns 404), so we fetch all and find locally. Returns null if not found.
 */
export async function fetchProduct(id: string): Promise<Product | null> {
  const products = await fetchProducts();
  const found = products.find((p) => String(p.id) === id);
  return found ?? null;
}
