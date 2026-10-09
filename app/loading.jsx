import React from "react";

export default function Loading() {
  return (
    <div
      data-testid="loading"
      className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4"
    >
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-rose-100 dark:border-rose-950/40"></div>
        <div className="absolute inset-0 rounded-full border-4 border-rose-600 dark:border-rose-500 border-t-transparent animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
        Loading content...
      </p>
    </div>
  );
}
