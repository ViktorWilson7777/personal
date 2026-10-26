import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { getReviewsForProduct } from "@/lib/reviews";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const numId = Number(resolvedParams?.id);

    if (isNaN(numId) || !products.some((p) => p.id === numId)) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const data = await getReviewsForProduct(numId);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("API error in /api/products/[id]/reviews:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
