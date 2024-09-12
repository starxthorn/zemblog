"use client";
import BlogCard from "@/components/BlogCard";
import WidthWrapperManager from "@/components/WidthManager";
import { motion } from "framer-motion";

export default function page() {
  return (
    <>
      <WidthWrapperManager>
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          id="homeblogs"
        >
          <div className="flex lg:flex-row flex-col lg:items-center items-start justify-between lg:px-4">
            <h1 className="secondary-heading">
              Search <span>Results</span>
            </h1>
            <h1 className="text-gray-600 lg:mt-0 mt-2">Found 6 blogs</h1>
          </div>
          <div className="grid gird-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-4 mt-8 lg:mt-10">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </motion.section>
      </WidthWrapperManager>
    </>
  );
}
