"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-muted/50 p-6 rounded-full mb-6">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm">
        Looks like you haven't added anything to your cart yet. Explore our products and find something you love.
      </p>
      <Button asChild size="lg">
        <Link href="/">Start Shopping</Link>
      </Button>
    </div>
  );
}
