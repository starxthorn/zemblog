import { connectdb } from "@/lib/database";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  await connectdb();
  try {
    const blogs = await Blog.find().populate("user");
    if (!blogs) {
      return NextResponse.json(
        {
          message: "No Blog Found",
        },
        { status: 200 }
      );
    }
    return NextResponse.json({ response: blogs }, { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
