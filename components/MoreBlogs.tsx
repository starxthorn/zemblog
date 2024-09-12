"use client";
import { useBlog } from "@/context/ProductContext";
import BlogCard from "./BlogCard";
import WidthWrapperManager from "./WidthManager";
import { useEffect, useState } from "react";
import { BlogPostType } from "@/types";

interface MoreBlogsType {
  flterCategory: string | undefined | null;
  filter_id: string | undefined | null;
}

export default function MoreBlogs({ flterCategory, filter_id }: MoreBlogsType) {
  const { blogs } = useBlog();
  const [filterblogs, setfilterblogs] = useState<BlogPostType[]>([]);

  useEffect(() => {
    const filtering = blogs.filter((i) => {
      return i.category?.toUpperCase() === flterCategory && i._id !== filter_id;
    });
    setfilterblogs(filtering);
  }, []);

  if (filterblogs.length <= 0) {
    return;
  }

  return (
    <>
      <WidthWrapperManager>
        <section>
          <h1 className={"primary-heading text-center text-gray-800 relative"}>
            Relatable <span className="text-red-500">Blogs</span>
            <img
              src="/book.jpg"
              alt="book"
              className="lg:w-16 w-10 absolute lg:left-[56%] left-[75%] lg:-top-10 -top-5"
            />
          </h1>
          <div className="grid gird-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-4 mt-10 lg:mt-20">
            {filterblogs
              .map((data, id) => {
                return (
                  <>
                    <BlogCard
                      key={id}
                      image={data?.image!}
                      route={`/blogs/${data._id}`}
                      title={data.title}
                      category={data.category}
                      user={data?.user}
                    />
                  </>
                );
              })
              .slice(0, 3)}
          </div>
        </section>
      </WidthWrapperManager>
    </>
  );
}
