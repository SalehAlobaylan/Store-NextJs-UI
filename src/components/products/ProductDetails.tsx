"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    // Validate product before adding
    if (product && product.id && product.title && product.price) {
      addItem(product);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <div className="relative aspect-square overflow-hidden rounded-xl border bg-white p-8">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <p>Image not available</p>
          </div>
        ) : (
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.title || "Product image"}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <Badge variant="secondary" className="mb-4 capitalize">
            {product.category || "Uncategorized"}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {product.title || "Untitled Product"}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <p className="text-3xl font-bold text-primary">
            {formatPrice(product.price || 0)}
          </p>
          {product.rating && (
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-medium">{product.rating.rate}</span>
              <span className="text-muted-foreground text-sm">
                ({product.rating.count} reviews)
              </span>
            </div>
          )}
        </div>

        <div className="prose prose-stone max-w-none text-muted-foreground">
          <p>{product.description || "No description available."}</p>
        </div>

        <div className="mt-auto pt-6">
          <Button 
            size="lg" 
            className="w-full md:w-auto gap-2 text-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
