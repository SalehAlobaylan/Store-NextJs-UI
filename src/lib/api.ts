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
        ...(init?.headers || {}),
      },
      // Reasonable default revalidation; adjust per-page as needed.
      next: { revalidate: 60, ...(init?.next || {}) },
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
  return fetchJson<Product[]>("/products");
}

export async function getProduct(id: number | string): Promise<Product> {
  return fetchJson<Product>(`/products/${id}`);
}

export async function getCategories(): Promise<Category[]> {
  return fetchJson<Category[]>("/products/categories");
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return fetchJson<Product[]>(`/products/category/${encodeURIComponent(category)}`);
}
