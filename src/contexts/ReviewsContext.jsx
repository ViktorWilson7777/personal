"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";

export function reviewsReducer(state, action) {
  switch (action.type) {
    case "SET":
      return Array.isArray(action.payload) ? action.payload : [];
    case "ADD": {
      const newReview = action.payload;
      if (!newReview) return state;
      // If review already exists in state, update it; otherwise prepend (newest first)
      const exists = state.some((r) => r.id === newReview.id);
      if (exists) {
        return state.map((r) => (r.id === newReview.id ? newReview : r));
      }
      return [newReview, ...state];
    }
    case "UPDATE": {
      const updatedReview = action.payload;
      if (!updatedReview) return state;
      return state.map((r) =>
        r.id === updatedReview.id ? { ...r, ...updatedReview } : r
      );
    }
    case "REMOVE": {
      const idToRemove = action.payload;
      return state.filter((r) => r.id !== idToRemove);
    }
    default:
      return state;
  }
}

export const ReviewsContext = createContext({
  reviews: [],
  myReview: null,
  submitReview: async () => {},
  updateReview: async () => {},
  deleteReview: async () => {},
});

export function ReviewsProvider({ productId, initialReviews = [], children }) {
  const [reviews, dispatch] = useReducer(
    reviewsReducer,
    Array.isArray(initialReviews) ? initialReviews : []
  );
  const { user, session } = useAuth();
  const router = useRouter();

  // Keep state updated if server props change (e.g. after revalidation / refresh)
  useEffect(() => {
    if (Array.isArray(initialReviews)) {
      dispatch({ type: "SET", payload: initialReviews });
    }
  }, [initialReviews]);

  // Find the logged-in user's review
  const myReview =
    reviews.find(
      (r) =>
        user &&
        (r.user_id === user.id ||
          (user.email &&
            r.author &&
            r.author.toLowerCase() ===
              user.email.split("@")[0].toLowerCase()))
    ) || null;

  // submitReview: sends POST /api/reviews with access token, dispatches ADD, calls router.refresh()
  const submitReview = async (rating, comment) => {
    let token = session?.access_token;
    if (!token) {
      const { data } = await supabase.auth.getSession();
      token = data?.session?.access_token;
    }

    if (!token) {
      throw new Error("You must be logged in to review");
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: Number(productId),
        rating: Number(rating),
        comment: typeof comment === "string" ? comment.trim() : comment,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to submit review");
    }

    dispatch({ type: "ADD", payload: data });
    router.refresh();
    return data;
  };

  // updateReview: calls Supabase directly (protected by RLS), dispatches UPDATE, calls router.refresh()
  const updateReview = async (rating, comment) => {
    if (!myReview) {
      throw new Error("No review found to update");
    }

    const trimmedComment = typeof comment === "string" ? comment.trim() : comment;
    const numRating = Number(rating);

    const { data, error } = await supabase
      .from("reviews")
      .update({
        rating: numRating,
        comment: trimmedComment,
      })
      .eq("id", myReview.id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message || "Failed to update review");
    }

    const updated = data || {
      ...myReview,
      rating: numRating,
      comment: trimmedComment,
    };

    dispatch({ type: "UPDATE", payload: updated });
    router.refresh();
    return updated;
  };

  // deleteReview: optimistic delete with rollback if Supabase returns an error
  const deleteReview = async () => {
    if (!myReview) {
      return;
    }

    const targetId = myReview.id;
    const previousReviews = [...reviews];

    // 1. Optimistic removal
    dispatch({ type: "REMOVE", payload: targetId });

    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", targetId);

      if (error) {
        // Rollback on Supabase error
        console.error("Failed to delete review on server, rolling back:", error.message);
        dispatch({ type: "SET", payload: previousReviews });
        throw new Error(error.message || "Failed to delete review");
      }

      router.refresh();
    } catch (err) {
      // Rollback on exception
      dispatch({ type: "SET", payload: previousReviews });
      throw err;
    }
  };

  const value = {
    reviews,
    myReview,
    submitReview,
    updateReview,
    deleteReview,
  };

  return (
    <ReviewsContext.Provider value={value}>{children}</ReviewsContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
}

export default ReviewsContext;
