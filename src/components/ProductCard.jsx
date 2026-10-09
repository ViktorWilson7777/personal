import React from "react";
import Link from "next/link";
import { CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { GlowBorderCard } from "@/components/ui/glow-border-card";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ArrowRight } from "lucide-react";

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
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <img
              data-testid="product-image"
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </Link>
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton productId={product.id} />
          </div>
        </div>

        <CardHeader className="p-5 pb-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            {product.category}
          </div>
          <CardTitle
            data-testid="product-name"
            className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100 line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Link href={`/products/${product.id}`}>
              {product.name}
            </Link>
          </CardTitle>
          <CardDescription
            data-testid="product-description"
            className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2"
          >
            {product.description}
          </CardDescription>
        </CardHeader>
      </div>

      <CardFooter className="flex items-center justify-between p-5 pt-3 border-t border-gray-100 dark:border-gray-800 mt-auto">
        <div>
          <span className="text-xs text-gray-400 block font-normal">Price</span>
          <span
            data-testid="product-price"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
          </span>
        </div>

        <Link
          href={`/products/${product.id}`}
          data-testid="link-detail"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group-hover:translate-x-0.5 transition-transform"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </GlowBorderCard>
  );
}

export default ProductCard;
