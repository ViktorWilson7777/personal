import React from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { buttonVariants } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen bg-transparent text-gray-900 dark:text-gray-100 flex flex-col relative">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:opacity-90 transition-opacity">
            <ShoppingBag className="h-8 w-8 sm:h-9 sm:w-9 stroke-[2.2]" />
            <span className="font-brand text-4xl sm:text-5xl font-normal tracking-wide">Windy</span>
          </Link>

          <nav className="flex items-center gap-3">
            <Link
              to="/login"
              data-testid="btn-login"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Login
            </Link>
            <Link
              to="/register"
              data-testid="btn-register"
              className={buttonVariants({ variant: "default", size: "sm" })}
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-cookie text-5xl sm:text-6xl lg:text-7xl text-purple-pink-gradient tracking-wide">
          Featured Products
        </h1>
      </section>

      {/* Product List Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div
          data-testid="product-list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>&copy; 2026 Windy - FER202 Lab 2. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;
