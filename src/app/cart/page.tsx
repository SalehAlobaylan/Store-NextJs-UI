"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { CartEmpty } from "@/components/cart/CartEmpty";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, clearCart } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>
        <CartEmpty />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
        <Button 
          variant="ghost" 
          className="text-muted-foreground hover:text-destructive gap-2"
          onClick={clearCart}
        >
          <Trash2 className="h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              {items.map((item, index) => (
                <div key={item.product.id}>
                  <CartItem item={item} />
                  {index < items.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
