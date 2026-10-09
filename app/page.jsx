import React from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Search } from "lucide-react";

export const metadata = {
  title: "Featured Products | Windy Store",
  description: "Browse our handpicked collection of premium tech and lifestyle products.",
};

export default async function HomePage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams?.q ? String(resolvedSearchParams.q).trim() : "";
  const category = resolvedSearchParams?.category ? String(resolvedSearchParams.category).trim() : "";

  // Extract unique categories for filter dropdown
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

  // URL-driven server-side filtering
  let filteredProducts = [...products];

  if (q) {
    const qLower = q.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower)
    );
  }

  if (category && category.toLowerCase() !== "all") {
    const catLower = category.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) => p.category.toLowerCase() === catLower
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center w-full">
        <h1 className="font-cookie text-5xl sm:text-6xl lg:text-7xl text-purple-pink-gradient tracking-wide mb-3">
          Featured Products
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
          Discover cutting-edge gadgets, accessories, and everyday essentials curated for style and performance.
        </p>

        {/* URL-driven Search & Category Form */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form
            method="get"
            action="/"
            className="flex flex-col sm:flex-row gap-3 items-center bg-white/90 dark:bg-gray-900/90 p-3 rounded-2xl shadow-lg border border-gray-200/80 dark:border-gray-800/80 backdrop-blur-md"
          >
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                name="q"
                defaultValue={q}
                data-testid="search-input"
                placeholder="Search products by name or details..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>

            {/* Category Select */}
            <div className="w-full sm:w-44">
              <select
                name="category"
                defaultValue={category}
                data-testid="category-select"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer"
              >
                <option value="">All</option>
                {uniqueCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              data-testid="btn-search"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md text-sm cursor-pointer whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Product List Grid or Empty State */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredProducts.length === 0 ? (
          <div
            data-testid="no-results"
            className="flex flex-col items-center justify-center p-12 text-center bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 my-8"
          >
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-3">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
              No products found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
              We couldn&apos;t find any items matching your criteria. Try adjusting your search query or selecting &quot;All&quot; categories.
            </p>
          </div>
        ) : (
          <div
            data-testid="product-list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
