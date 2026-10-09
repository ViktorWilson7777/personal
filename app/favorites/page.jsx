"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { products } from "@/data/products";
import { FavoriteButton } from "@/components/FavoriteButton";
import { Heart, ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";

export default function FavoritesPage() {
  const { user, loading } = useAuth();
  const { favorites } = useFavorites();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading favorites...</p>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null;
  }

  const favoriteProducts = products.filter((p) =>
    favorites.includes(Number(p.id))
  );

  return (
    <div
      data-testid="favorites-page"
      className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-2 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to products</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 dark:text-rose-400 flex items-center justify-center">
              <Heart className="h-5 w-5 fill-rose-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              My Favorites
            </h1>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Saved items for <span className="font-semibold text-gray-800 dark:text-gray-200">{user.email}</span>
        </p>
      </div>

      {/* Content */}
      {favoriteProducts.length === 0 ? (
        <div
          data-testid="favorites-empty"
          className="flex flex-col items-center justify-center p-12 sm:p-16 text-center bg-white/70 dark:bg-gray-900/70 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700 backdrop-blur-md"
        >
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-400 mb-4">
            <Heart className="h-8 w-8 stroke-[1.5]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            No favorite products yet
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            Click the heart icon on any product in our catalog to save items to your personal wishlist.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md text-sm"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Discover Products</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteProducts.map((product) => (
            <div
              key={product.id}
              data-testid="favorite-item"
              className="bg-white/90 dark:bg-gray-900/90 rounded-2xl p-5 border border-gray-200/80 dark:border-gray-800/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group backdrop-blur-md"
            >
              <div>
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-800 mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 right-2.5">
                    <FavoriteButton productId={product.id} />
                  </div>
                </div>

                <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                  {product.category}
                </div>
                <h3
                  data-testid="product-name"
                  className="font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-1"
                >
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span
                  data-testid="product-price"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  ${typeof product.price === "number" ? product.price.toFixed(2) : product.price}
                </span>

                <Link
                  href={`/products/${product.id}`}
                  data-testid="link-detail"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
