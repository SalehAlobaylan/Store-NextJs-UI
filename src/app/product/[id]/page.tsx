import { getProduct } from "@/lib/api";
import { ProductDetails } from "@/components/products/ProductDetails";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  
  try {
    const product = await getProduct(id);
    
    if (!product) {
      notFound();
    }

    return (
      <div className="container mx-auto px-4 py-8 md:px-6">
        <ProductDetails product={product} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
