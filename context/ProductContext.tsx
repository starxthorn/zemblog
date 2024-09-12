"use client";
import { BlogPostType } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

interface BlogContextType {
  blogs: BlogPostType[];
}

export const BlogContext = createContext<BlogContextType | null>(null);

export const BlogContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [blogs, setBlogs] = useState<BlogPostType[]>([]);

  const fetchingBlogs = async () => {
    try {
      const res = await fetch("/api/access-blogs", {
        method: "GET",
      });
      const data = await res.json();
      setBlogs(data.response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchingBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs }}>{children}</BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === null) {
    throw new Error("useBlog must be used within a BlogContextProvider");
  }
  return context;
};
