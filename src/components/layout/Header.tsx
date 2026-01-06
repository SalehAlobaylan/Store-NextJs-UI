"use client";

import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function Header() {
  const { totalItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = isMounted ? totalItems : 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <Store className="h-6 w-6" />
              <span>Store</span>
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/">Products</Link>
            </Button>
            
            <Button asChild variant="outline" size="icon" className="relative">
              <Link href="/cart" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
