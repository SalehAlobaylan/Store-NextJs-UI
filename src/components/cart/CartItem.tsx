"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="flex gap-4 py-4">
      <div className="relative aspect-square h-24 w-24 min-w-24 overflow-hidden rounded-md border bg-white p-2">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
            No Image
          </div>
        ) : (
          <Image
            src={product.image || "/placeholder.png"}
            alt={product.title || "Product"}
            fill
            className="object-contain"
            sizes="96px"
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex justify-between gap-2">
          <div className="space-y-1">
            <Link 
              href={`/product/${product.id}`}
              className="font-medium leading-none hover:underline line-clamp-2"
            >
              {product.title || "Untitled Product"}
            </Link>
            <p className="text-sm text-muted-foreground capitalize">
              {product.category || "Uncategorized"}
            </p>
          </div>
          <p className="font-medium">{formatPrice((product.price || 0) * quantity)}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase quantity</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => removeItem(product.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
