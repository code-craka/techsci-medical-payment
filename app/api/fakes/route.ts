import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";

// GET all fake appointments
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const passport = searchParams.get("passport");
    const center = searchParams.get("center");

    const where: any = {};
    if (status) where.status = status;
    if (passport) where.passport = passport;
    if (center) where.currentCenter = center;

    const fakes = await prisma.appointment.findMany({
      where: {
        ...where,
        category: "fake", // Only get fake appointments
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(fakes);
  } catch (error) {
    console.error("Error fetching fake appointments:", error);
    return NextResponse.json(
      { error: "Error fetching fake appointments" },
      { status: 500 }
    );
  }
}

// POST create new fake appointment
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      userId,
      date,
      city,
      travelTo,
      name,
      passport,
      currentCenter,
    } = body;

    const fake = await prisma.appointment.create({
      data: {
        userId,
        date: new Date(date),
        category: "fake",
        city,
        travelTo,
        name,
        passport,
        currentCenter,
        status: "pending",
      },
    });

    return NextResponse.json(fake, { status: 201 });
  } catch (error) {
    console.error("Error creating fake appointment:", error);
    return NextResponse.json(
      { error: "Error creating fake appointment" },
      { status: 500 }
    );
  }
}

// PATCH update fake appointment
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...updateData } = body;

    if (updateData.date) {
      updateData.date = new Date(updateData.date);
    }

    const fake = await prisma.appointment.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(fake);
  } catch (error) {
    console.error("Error updating fake appointment:", error);
    return NextResponse.json(
      { error: "Error updating fake appointment" },
      { status: 500 }
    );
  }
}

// DELETE fake appointment
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
        { error: "Fake appointment ID is required" },
        { status: 400 }
      );
    }

    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Fake appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting fake appointment:", error);
    return NextResponse.json(
      { error: "Error deleting fake appointment" },
      { status: 500 }
    );
  }
}