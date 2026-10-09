"use client";

import React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function FavoriteButton({ productId, className = "" }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const router = useRouter();

  const isFav = isFavorite(productId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    toggleFavorite(productId);
  };

  return (
    <button
      type="button"
      data-testid="btn-favorite"
      aria-pressed={isFav ? "true" : "false"}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      onClick={handleClick}
      className={cn(
        "relative p-2.5 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-rose-500",
        isFav
          ? "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/80 scale-105 shadow-sm"
          : "bg-white/90 text-gray-400 dark:bg-gray-800/90 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-gray-100 dark:hover:bg-gray-700/80",
        className
      )}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-transform duration-200",
          isFav ? "fill-current text-rose-600 dark:text-rose-400" : "stroke-[2]"
        )}
      />
    </button>
  );
}

export default FavoriteButton;
