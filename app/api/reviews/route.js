import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { reviewSchema } from "@/lib/reviewSchema";
import { products } from "@/data/products";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export async function POST(request) {
  try {
    // 1. Authentication check
    const authHeader =
      request.headers.get("authorization") ||
      request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token with Supabase using anon client
    const { data: userData, error: userError } =
      await supabase.auth.getUser(token);

    if (userError || !userData?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Body parsing and validation
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid input", issues: [{ message: "Invalid JSON body" }] },
        { status: 400 }
      );
    }

    const parseResult = reviewSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parseResult.error.issues },
        { status: 400 }
      );
    }

    const { product_id, rating, comment } = parseResult.data;

    // 3. Product check
    const productExists = products.some((p) => p.id === product_id);
    if (!productExists) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // 4. Create scoped Supabase client with user's token
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // 5. Insert review (user_id and author are handled by DB defaults)
    const { data, error } = await userClient
      .from("reviews")
      .insert({
        product_id,
        rating,
        comment,
      })
      .select()
      .single();

    if (error) {
      // Map Postgres error code 23505 (unique constraint violation)
      if (
        error.code === "23505" ||
        error.message?.includes("duplicate key") ||
        error.message?.includes("unique")
      ) {
        return NextResponse.json(
          { error: "You already reviewed this product" },
          { status: 409 }
        );
      }

      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to insert review" },
        { status: 400 }
      );
    }

    // 6. Revalidate cached product detail page
    try {
      revalidatePath(`/products/${product_id}`);
    } catch (e) {
      console.warn("revalidatePath warning:", e);
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error("API error in POST /api/reviews:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
