import { Category, Product } from "@/types/product";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://fakestoreapi.com";

export class ApiError extends Error {
  status?: number;
  body?: unknown;

  constructor(message: string, status?: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        ...(init?.headers || {}),
      },
      // Fetch at request time to avoid build-time prerender failures (e.g., Cloudflare blocks)
      cache: "no-store",
      next: { revalidate: 0, ...(init?.next || {}) },
    });

    const contentType = response.headers.get("content-type");
    const body = contentType?.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status,
        body
      );
    }

    return body as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("Network error while contacting Fake Store API", undefined, error);
  }
}

export async function getProducts(): Promise<Product[]> {
  const products = await fetchJson<Product[]>("/products");
  
  if (!products || !Array.isArray(products)) {
    throw new ApiError("Invalid response: expected array of products", 500);
  }
  
  return products;
}

export async function getProduct(id: number | string): Promise<Product> {
  if (!id || id === "" || id === "undefined" || id === "null") {
    throw new ApiError("Invalid product ID", 400);
  }
  
  const product = await fetchJson<Product>(`/products/${id}`);
  
  if (!product || typeof product !== "object") {
    throw new ApiError("Product not found", 404);
  }
  
  return product;
}

export async function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>("/products/categories");
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return fetchJson<Product[]>(`/products/category/${encodeURIComponent(category)}`);
}
