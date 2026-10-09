import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const category = searchParams.get("category");

    let filtered = [...products];

    if (q) {
      const qLower = q.trim().toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(qLower) ||
          p.description.toLowerCase().includes(qLower)
      );
    }

    if (category && category.trim().toLowerCase() !== "all") {
      const catLower = category.trim().toLowerCase();
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === catLower
      );
    }

    return NextResponse.json(filtered, { status: 200 });
  } catch (error) {
    console.error("API error in /api/products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
