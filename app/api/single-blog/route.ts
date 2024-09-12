import { connectdb } from "@/lib/database";
import Blog from "@/models/Blog";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectdb();
  const blogid = req.nextUrl.searchParams.get("blogid");
  try {
    const single_blog = await Blog.findById(blogid).populate("user");
    if (!single_blog) {
      return NextResponse.json(
        {
          message: "Blog not found",
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        response: single_blog,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function POST(req: NextRequest) {
  await connectdb();
  const userid = req.nextUrl.searchParams.get("userid");
  try {
    const { title, sub_heading, description, category, image } =
      await req.json();
    const ExitsUser = await User.findById(userid);
    const blog = await Blog.create({
      title,
      sub_heading,
      description,
      category,
      image,
      user: ExitsUser._id,
    });
    ExitsUser.blogs.push(blog);
    await ExitsUser.save();
    return NextResponse.json(
      { message: "Blog created", resposne: blog },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function PUT(req: NextRequest) {
  const blogid = req.nextUrl.searchParams.get("blogid");
  await connectdb();
  try {
    let blog = await Blog.findByIdAndUpdate(blogid, await req.json(), {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    return NextResponse.json(
      {
        message: "Blog Updated",
        response: blog,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(req: NextRequest) {
  const blogid = req.nextUrl.searchParams.get("blogid");
  await connectdb();
  try {
    await Blog.findByIdAndDelete(blogid);
    return NextResponse.json(
      {
        message: "Product Deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
  }
}
