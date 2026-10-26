import { supabase } from "./supabaseClient.js";

/**
 * Fetches reviews for a given product from Supabase using the anon key.
 * Returns { average: number (rounded to 1 decimal, 0 when empty), count: number, reviews: Array }
 * ordered with newest first.
 */
export async function getReviewsForProduct(productId) {
  const numId = Number(productId);
  if (isNaN(numId)) {
    return { average: 0, count: 0, reviews: [] };
  }

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", numId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(`[getReviewsForProduct] Error fetching reviews for product ${numId}:`, error.message);
      return { average: 0, count: 0, reviews: [] };
    }

    const reviews = data || [];
    const count = reviews.length;
    let average = 0;

    if (count > 0) {
      const sum = reviews.reduce((acc, curr) => acc + (Number(curr.rating) || 0), 0);
      average = Math.round((sum / count) * 10) / 10;
    }

    return {
      average,
      count,
      reviews,
    };
  } catch (err) {
    console.error(`[getReviewsForProduct] Unexpected error for product ${numId}:`, err);
    return { average: 0, count: 0, reviews: [] };
  }
}

export default getReviewsForProduct;
