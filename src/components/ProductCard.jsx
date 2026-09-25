import React from "react";
import { CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { TextAnimation } from "@/components/ui/stagger-text";
import { GlowBorderCard } from "@/components/ui/glow-border-card";

export function ProductCard({ product }) {
  return (
    <GlowBorderCard
      data-testid="product-card"
      colorPreset="aurora"
      borderRadius="1rem"
      className="flex flex-col justify-between overflow-hidden border border-gray-200/80 dark:border-gray-800/80 bg-white/95 dark:bg-gray-900/95 shadow-md hover:shadow-2xl transition-all duration-300 group"
    >
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-gray-50 dark:bg-gray-800/50">
          <img
            data-testid="product-image"
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <CardHeader className="p-5 pb-2">
          <CardTitle
            data-testid="product-name"
            className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 line-clamp-1"
          >
            {product.name}
          </CardTitle>
          <CardDescription
            data-testid="product-description"
            className="text-sm text-gray-500 dark:text-gray-400 mt-1.5"
          >
            <TextAnimation divideBy="word">
              {product.description}
            </TextAnimation>
          </CardDescription>
        </CardHeader>
      </div>

      <CardFooter className="flex items-center justify-between p-5 pt-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <span
          data-testid="product-price"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          {product.price}
        </span>
        <Button size="sm" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </Button>
      </CardFooter>
    </GlowBorderCard>
  );
}

export default ProductCard;
