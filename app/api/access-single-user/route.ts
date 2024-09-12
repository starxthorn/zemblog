import User from "@/models/User";
import { connectdb } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectdb();
  const userid = req.nextUrl.searchParams.get("userid");
  try {
    const user = await User.findById(userid).populate("blogs");
    return NextResponse.json(
      {
        response: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}
