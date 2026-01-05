"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      <div className="relative aspect-square overflow-hidden rounded-xl border bg-white p-8">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div>
          <Badge variant="secondary" className="mb-4 capitalize">
            {product.category}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {product.title}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <p className="text-3xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-5 w-5 fill-current" />
            <span className="font-medium">{product.rating.rate}</span>
            <span className="text-muted-foreground text-sm">
              ({product.rating.count} reviews)
            </span>
          </div>
        </div>

        <div className="prose prose-stone max-w-none text-muted-foreground">
          <p>{product.description}</p>
        </div>

        <div className="mt-auto pt-6">
          <Button 
            size="lg" 
            className="w-full md:w-auto gap-2 text-lg"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
