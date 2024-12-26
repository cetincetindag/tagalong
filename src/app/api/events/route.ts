import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: "GET request received" });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "POST request received" });
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({ message: "PUT request received" });
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({ message: "DELETE request received" });
}
