import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const numId = Number(resolvedParams?.id);

    if (isNaN(numId)) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    const product = products.find((p) => p.id === numId);

    if (!product) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("API error in /api/products/[id]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
