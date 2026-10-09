import React from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div
      data-testid="not-found"
      className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-rose-950/40 text-rose-500 dark:text-rose-400 flex items-center justify-center mb-6 shadow-sm border border-rose-100 dark:border-rose-900/40">
        <SearchX className="h-10 w-10 stroke-[2]" />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-3">
        404
      </h1>
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        Page or Product Not Found
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-8">
        The requested resource does not exist, has been removed, or the specified identifier is invalid.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Store Home</span>
      </Link>
    </div>
  );
}
