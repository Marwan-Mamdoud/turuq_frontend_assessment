// Shared TypeScript interface for the product data returned by the mock API.
// The `id` is numeric from the API but typed as string since URL params and
// cookie values are always strings — comparison uses String(p.id) === id.
export interface Product {
  id: string;
  productName: string;
  productVariant: string;
  productPrice: number;
}
