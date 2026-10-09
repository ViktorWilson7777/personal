"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShoppingBag, Heart, User, LogOut } from "lucide-react";

export function Header() {
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 dark:border-gray-800/80 bg-white/85 dark:bg-gray-900/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:opacity-90 transition-opacity"
        >
          <ShoppingBag className="h-8 w-8 sm:h-9 sm:w-9 stroke-[2.2]" />
          <span className="font-brand text-4xl sm:text-5xl font-normal tracking-wide">
            Windy
          </span>
        </Link>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-3 sm:gap-4">
          {user ? (
            <>
              {/* Favorites link (Logged-in only) */}
              <Link
                href="/favorites"
                data-testid="link-favorites"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 border border-gray-200/60 dark:border-gray-700/60 transition-all"
                title="My Favorites"
              >
                <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                <span className="hidden sm:inline">Favorites</span>
                <span
                  data-testid="favorites-count"
                  className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-rose-500 rounded-full min-w-5 h-5"
                >
                  {favorites.length}
                </span>
              </Link>

              {/* User Account / Email */}
              <Link
                href="/account"
                data-testid="user-email"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors max-w-[160px] sm:max-w-[220px] truncate"
                title="View Account"
              >
                <User className="h-4 w-4 flex-shrink-0 text-gray-400" />
                <span className="truncate">{user.email}</span>
              </Link>

              {/* Logout Button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                data-testid="btn-logout"
                onClick={() => signOut()}
                className="gap-1.5"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              {/* Login Link */}
              <Link
                href="/login"
                data-testid="btn-login"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Login
              </Link>

              {/* Register Link */}
              <Link
                href="/register"
                data-testid="btn-register"
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
