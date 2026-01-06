import { getProducts } from "@/lib/api";
import { ProductGrid } from "@/components/products/ProductGrid";

export const dynamic = "force-dynamic";

export default async function Home() {
  let products;
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Featured Products</h1>
        <p className="text-muted-foreground">
          Explore our collection of high-quality products.
        </p>
      </div>
      {products && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available at the moment.</p>
        </div>
      )}
    </div>
  );
}
