"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicking the button inside the Link
    addItem(product);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/product/${product.id}`} className="flex-1">
        <div className="relative aspect-square overflow-hidden bg-white p-4">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start gap-2">
            <Badge variant="secondary" className="mb-2 capitalize">
              {product.category}
            </Badge>
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              <span>★</span>
              <span className="text-muted-foreground">{product.rating.rate}</span>
            </div>
          </div>
          <CardTitle className="line-clamp-2 text-lg font-medium leading-tight">
            {product.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button onClick={handleAddToCart} className="w-full gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
