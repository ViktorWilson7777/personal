import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ArrowLeft, Tag, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const numId = Number(resolvedParams?.id);
  const product = products.find((p) => p.id === numId);

  if (!product || isNaN(numId)) {
    notFound();
  }

  return {
    title: `${product.name} | Windy`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const numId = Number(resolvedParams?.id);

  if (isNaN(numId)) {
    notFound();
  }

  const product = products.find((p) => p.id === numId);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back Link */}
      <div className="mb-6">
        <Link
          href="/"
          data-testid="link-back"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to products</span>
        </Link>
      </div>

      {/* Product Detail Container */}
      <div
        data-testid="product-detail"
        className="bg-white/90 dark:bg-gray-900/90 rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-200/80 dark:border-gray-800/80 backdrop-blur-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Image Box */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details Column */}
          <div className="flex flex-col space-y-6">
            <div>
              {/* Category */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60 mb-3">
                <Tag className="h-3 w-3" />
                <span data-testid="detail-category">{product.category}</span>
              </div>

              {/* Product Name */}
              <h1
                data-testid="detail-name"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
              >
                {product.name}
              </h1>
            </div>

            {/* Product Price */}
            <div className="flex items-baseline gap-3 pb-6 border-b border-gray-100 dark:border-gray-800">
              <span
                data-testid="detail-price"
                className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white"
              >
                ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
              </span>
              <span className="text-xs text-green-600 dark:text-green-400 font-semibold uppercase">
                In Stock &amp; Ready to Ship
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-2">
                Product Description
              </h2>
              <p
                data-testid="detail-description"
                className="text-base text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                {product.description}
              </p>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex-1">
                <div className="inline-flex items-center gap-3">
                  <FavoriteButton productId={product.id} />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Add to your wishlist / favorites
                  </span>
                </div>
              </div>
            </div>

            {/* Perks badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                <span>2-Year Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <span>30-Day Free Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
