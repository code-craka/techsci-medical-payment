import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

// GET all prices
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const country = searchParams.get("country");
    const status = searchParams.get("status");

    const where: any = {};
    if (category) where.category = category;
    if (country) where.country = country;
    if (status) where.status = status;

    const prices = await prisma.center.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return NextResponse.json(
      { error: "Error fetching prices" },
      { status: 500 }
    );
  }
}

// POST create new price
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, city, country } = body;

    // Check if price already exists
    const existingPrice = await prisma.center.findFirst({
      where: {
        name,
        city,
        country,
      },
    });

    if (existingPrice) {
      return NextResponse.json(
        { error: "Price already exists" },
        { status: 400 }
      );
    }

    const price = await prisma.center.create({
      data: {
        name,
        city,
        country,
        status: "active",
      },
    });

    return NextResponse.json(price, { status: 201 });
  } catch (error) {
    console.error("Error creating price:", error);
    return NextResponse.json(
      { error: "Error creating price" },
      { status: 500 }
    );
  }
}

// PATCH update price
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    const price = await prisma.center.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(price);
  } catch (error) {
    console.error("Error updating price:", error);
    return NextResponse.json(
      { error: "Error updating price" },
      { status: 500 }
    );
  }
}

// DELETE price
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Price ID is required" },
        { status: 400 }
      );
    }

    await prisma.center.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Price deleted successfully" });
  } catch (error) {
    console.error("Error deleting price:", error);
    return NextResponse.json(
      { error: "Error deleting price" },
      { status: 500 }
    );
  }
}