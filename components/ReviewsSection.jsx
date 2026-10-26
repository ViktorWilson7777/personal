"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema } from "@/lib/reviewSchema";
import { ReviewsProvider, useReviews } from "@/contexts/ReviewsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Star, MessageSquare, Edit3, Trash2, CheckCircle2, AlertCircle, LogIn } from "lucide-react";

function ReviewsInner({ productId }) {
  const { reviews, myReview, submitReview, updateReview, deleteReview } = useReviews();
  const { user } = useAuth();

  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Edit mode state for author's own review
  const [isEditing, setIsEditing] = useState(false);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState("");
  const [editError, setEditError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Review Form setup with react-hook-form + zodResolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      product_id: Number(productId),
      rating: undefined,
      comment: "",
    },
  });

  // Calculate live average and count based on reviews in context
  const count = reviews.length;
  const average =
    count === 0
      ? 0
      : Math.round(
          (reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / count) * 10
        ) / 10;

  const onSubmit = async (data) => {
    setServerError("");
    setSuccessMsg("");
    setIsSubmitting(true);
    try {
      await submitReview(data.rating, data.comment);
      setSuccessMsg("Thank you! Your review has been submitted successfully.");
      reset({ product_id: Number(productId), rating: undefined, comment: "" });
    } catch (err) {
      setServerError(err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartEdit = (review) => {
    setEditRating(review.rating);
    setEditComment(review.comment);
    setEditError("");
    setIsEditing(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setEditError("");
    if (!editComment.trim()) {
      setEditError("Comment cannot be empty");
      return;
    }
    if (editRating < 1 || editRating > 5) {
      setEditError("Rating must be between 1 and 5");
      return;
    }

    setIsUpdating(true);
    try {
      await updateReview(editRating, editComment);
      setIsEditing(false);
    } catch (err) {
      setEditError(err.message || "Failed to update review");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your review?")) {
      try {
        await deleteReview();
      } catch (err) {
        alert(err.message || "Failed to delete review");
      }
    }
  };

  return (
    <div className="mt-12 pt-10 border-t border-gray-200 dark:border-gray-800">
      {/* Header & Overall Rating */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            Customer Reviews
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real feedback from verified buyers
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/60 px-4 py-3 rounded-2xl border border-gray-200/60 dark:border-gray-700/60">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            {/* Plain number without stars or extra text inside rating-average */}
            <span
              data-testid="rating-average"
              className="text-2xl font-extrabold text-gray-900 dark:text-white ml-1"
            >
              {average}
            </span>
          </div>
          <span className="text-gray-400 dark:text-gray-500">/ 5</span>
          <span className="text-gray-300 dark:text-gray-600">|</span>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <span data-testid="review-count" className="font-bold text-gray-900 dark:text-white">
              {count}
            </span>{" "}
            {count === 1 ? "review" : "reviews"}
          </div>
        </div>
      </div>

      {/* Write / Edit Review Section */}
      <div className="mb-10 bg-gray-50/70 dark:bg-gray-800/40 rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80">
        {!user ? (
          /* Logged out: show link-login-to-review */
          <div className="text-center py-6">
            <LogIn className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2 opacity-80" />
            <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
              Have you tried this product?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Please sign in with your account to rate and review this item.
            </p>
            <Link
              href="/login"
              data-testid="link-login-to-review"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-md shadow-blue-500/20"
            >
              <LogIn className="h-4 w-4" />
              Sign in to write a review
            </Link>
          </div>
        ) : myReview ? (
          /* Logged in with existing review */
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-950/70 dark:text-green-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  You have reviewed this product
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  You can update or delete your review using the buttons on your review below.
                </p>
              </div>
            </div>

            {/* Inline edit form when isEditing is active */}
            {isEditing && (
              <form onSubmit={handleSaveEdit} className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">Edit Your Review</h4>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Rating (1 to 5)
                  </label>
                  <select
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    className="w-full sm:w-48 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Terrible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={3}
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                {editError && (
                  <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {editError}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isUpdating ? "Saving..." : "Save changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* Logged in and no review yet: show review-form */
          <form
            data-testid="review-form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Write a Review
            </h3>

            {/* Hidden product_id */}
            <input type="hidden" {...register("product_id", { valueAsNumber: true })} />

            {/* Rating Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                Rating
              </label>
              <select
                data-testid="input-rating"
                {...register("rating", { valueAsNumber: true })}
                className="w-full sm:w-60 px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a rating</option>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Terrible</option>
              </select>
              {errors.rating && (
                <p data-testid="error-rating" className="text-xs text-red-600 dark:text-red-400 mt-1.5 font-medium">
                  {errors.rating.message}
                </p>
              )}
            </div>

            {/* Comment Textarea */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5">
                Review Comment (1 - 500 characters)
              </label>
              <textarea
                rows={4}
                data-testid="input-comment"
                placeholder="Share your thoughts about this product..."
                {...register("comment")}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              />
              {errors.comment && (
                <p data-testid="error-comment" className="text-xs text-red-600 dark:text-red-400 mt-1.5 font-medium">
                  {errors.comment.message}
                </p>
              )}
            </div>

            {/* Server Error Alert */}
            {serverError && (
              <div
                data-testid="error-review"
                className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center gap-2"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* Success Alert */}
            {successMsg && (
              <div
                data-testid="review-success"
                className="p-3 rounded-xl bg-green-50 dark:bg-green-950/60 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="btn-submit-review"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm transition-colors shadow-md shadow-blue-500/20"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{isSubmitting ? "Submitting..." : "Submit Review"}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Reviews List */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          All Reviews ({count})
        </h3>

        {count === 0 ? (
          /* reviews-empty state (no review-item rendered) */
          <div
            data-testid="reviews-empty"
            className="text-center py-10 px-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 border border-dashed border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400"
          >
            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-base font-medium">No reviews yet.</p>
            <p className="text-sm mt-1">Be the first to share your thoughts on this product!</p>
          </div>
        ) : (
          /* One review-item per review */
          <div className="space-y-4">
            {reviews.map((review) => {
              const isOwn =
                user &&
                (review.user_id === user.id ||
                  (user.email &&
                    review.author &&
                    review.author.toLowerCase() ===
                      user.email.split("@")[0].toLowerCase()));

              return (
                <div
                  key={review.id}
                  data-testid="review-item"
                  className={`p-5 rounded-2xl border transition-all ${
                    isOwn
                      ? "bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60"
                      : "bg-white dark:bg-gray-900 border-gray-200/80 dark:border-gray-800"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center uppercase">
                        {review.author ? review.author[0] : "U"}
                      </div>
                      <div>
                        <span
                          data-testid="review-author"
                          className="font-semibold text-sm text-gray-900 dark:text-white"
                        >
                          {review.author}
                        </span>
                        {isOwn && (
                          <span className="ml-2 inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                            You
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Rating display */}
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span
                          data-testid="review-rating"
                          className="text-sm font-bold text-gray-900 dark:text-white"
                        >
                          {review.rating}
                        </span>
                        <span className="text-xs text-gray-400">/ 5</span>
                      </div>

                      {/* Author Action Buttons: only on own review */}
                      {isOwn && (
                        <div className="flex items-center gap-1.5 ml-2">
                          <button
                            type="button"
                            data-testid="btn-edit-review"
                            onClick={() => handleStartEdit(review)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-100/60 dark:hover:bg-blue-900/40 transition-colors"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            data-testid="btn-delete-review"
                            onClick={handleDelete}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-lg text-red-600 dark:text-red-400 hover:bg-red-100/60 dark:hover:bg-red-900/40 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comment */}
                  <p
                    data-testid="review-comment"
                    className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-2 whitespace-pre-line"
                  >
                    {review.comment}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReviewsSection({ productId, initialReviews = [] }) {
  return (
    <ReviewsProvider productId={productId} initialReviews={initialReviews}>
      <ReviewsInner productId={productId} />
    </ReviewsProvider>
  );
}
