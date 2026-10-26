import { z } from "zod";

export const reviewSchema = z.object({
  product_id: z
    .number({
      required_error: "Product ID is required",
      invalid_type_error: "Product ID must be an integer",
    })
    .int("Product ID must be an integer")
    .positive("Product ID must be a positive integer"),
  rating: z
    .number({
      required_error: "Rating is required",
      invalid_type_error: "Rating must be an integer",
    })
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string({
      required_error: "Comment is required",
    })
    .trim()
    .min(1, "Comment cannot be empty")
    .max(500, "Comment cannot exceed 500 characters"),
});

export default reviewSchema;
