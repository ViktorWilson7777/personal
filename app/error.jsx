"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    console.error("Application error captured:", error);
  }, [error]);

  return (
    <div
      data-testid="error-boundary"
      className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 shadow-inner">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-2">
        Something went wrong!
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mb-6">
        {error?.message || "An unexpected application error occurred while processing your request."}
      </p>
      <button
        type="button"
        data-testid="btn-retry"
        onClick={() => reset()}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all shadow-md hover:shadow-lg cursor-pointer"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Try Again</span>
      </button>
    </div>
  );
}
