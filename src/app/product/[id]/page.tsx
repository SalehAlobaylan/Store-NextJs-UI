import { getProduct } from "@/lib/api";
import { ProductDetails } from "@/components/products/ProductDetails";
import { notFound } from "next/navigation";

// Force dynamic rendering so product fetch happens at request time
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  
  // Validate ID before fetching
  if (!id || id === "undefined" || id === "null") {
    notFound();
  }
  
  let product;
  try {
    product = await getProduct(id);
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }

  // Validate product data
  if (!product || !product.id || !product.title || !product.price) {
    console.error("Invalid product data received");
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <ProductDetails product={product} />
    </div>
  );
}
