"use client";
import { cn } from "@/lib/utils";
import BlogCard from "./BlogCard";
import { roboto } from "@/fonts/font";
import { motion } from "framer-motion";
import { useBlog } from "@/context/ProductContext";

export default function HomeBlogs() {
  const { blogs } = useBlog();
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="lg:mt-40 mt-24"
        id="homeblogs"
      >
        <div>
          <h1
            className={cn(
              roboto.className,
              "primary-heading text-center text-gray-800 relative"
            )}
          >
            Latest <span className="text-red-500">Blogs</span>
            <img
              src="/book.jpg"
              alt="book"
              className="lg:w-16 w-10 absolute lg:left-[56%] left-[75%] lg:-top-10 -top-5"
            />
          </h1>
        </div>
        <div className="grid gird-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-4 mt-10 lg:mt-24">
          {blogs.map((data, id) => {
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
          })}
        </div>
      </motion.section>
    </>
  );
}
