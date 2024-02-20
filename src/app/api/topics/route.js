import mongodb from "@/libs/mongodb";
import Topic from "@/models/Topic/Topic";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await mongodb();
  await Topic.create({
    title,
    description,
  });
  return NextResponse.json({ message: "Topic Created" }, { status: 201 });
}

export async function GET() {
  await mongodb();
  const Topics = await Topic.find();
  return NextResponse.json({ Topics });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await mongodb();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic Delete" }, { status: 201 });
}

export async function PUT(request) {
  const { id, title, description } = await request.json();
  await mongodb();
  await Topic.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: "Topic Updated" }, { status: 201 });
}
