import axios from "axios";
import { Product } from "@/types/product";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCTS_API_URL,
  timeout: 10000,
});

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/products");
  return data;
}

export async function fetchProduct(id: string): Promise<Product | null> {
  const products = await fetchProducts();
  const found = products.find((p) => String(p.id) === id);
  return found ?? null;
}
