import axios from "axios";
import { Product } from "@/types/product";

const api = axios.create({
  baseURL: "https://6776992512a55a9a7d0c4868.mockapi.io",
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
