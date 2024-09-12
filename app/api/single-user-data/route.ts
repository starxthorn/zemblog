import { connectdb } from "@/lib/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectdb();
  const userid = req.nextUrl.searchParams.get("userid");
  try {
    const user = await User.findById(userid).populate("blogs");
    if (user) {
      return NextResponse.json(
        {
          message: "User found",
          response: user,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
