"use client";
import MiniLoader from "@/components/Loaders/MiniLoader";
import MoreBlogs from "@/components/MoreBlogs";
import { Spotlight } from "@/components/ui/Spotlight";
import WidthWrapperManager from "@/components/WidthManager";
import { roboto } from "@/fonts/font";
import { cn } from "@/lib/utils";
import { BlogPostType } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { blogid: string } }) {
  const blogid = params.blogid;
  const [singleBlog, setSingleBlog] = useState<BlogPostType>({});
  const [category, setCategory] = useState("");
  const [filterid, setFilterid] = useState("");

  useEffect(() => {
    if (singleBlog?.category && singleBlog?._id) {
      setCategory(singleBlog?.category.toUpperCase());
      setFilterid(singleBlog?._id);
    }
  }, [singleBlog]);

  const single_Blog = async () => {
    try {
      const res = await fetch(`/api/single-blog?blogid=${blogid}`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setSingleBlog(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    single_Blog();
  }, []);

  return (
    <>
      <WidthWrapperManager>
        <div>
          <Spotlight
            className="-top-40 lg:-left-10 -left-16 md:-left-32 md:-top-20 h-screen -z-40"
            fill="red"
          />
          <Spotlight
            className="h-[80vh] lg:w-[50vw] top-10 left-[80%] lg:block hidden -z-40"
            fill="red"
          />
          <Spotlight
            className="lg:left-[20%] left-0 opacity-0 top-20 h-[80vh] md:w-[20vw] lg:w-[60vw] -z-40"
            fill="red"
          />
        </div>
        <div className="lg:h-[80vh] h-[75vh] w-full bg-white bg-grid-black/[0.1] absolute left-0 top-0 right-0 -z-50 flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
        <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
          <div className="w-full">
            <Image
              src={singleBlog.image!}
              width={1000}
              height={600}
              className="w-full rounded-xl"
              alt="banner"
            />
          </div>
          <div className="w-full">
            <h1 className="lg:text-5xl text-2xl font-bold mt-5 lg:mt-0">
              {singleBlog.title}
            </h1>
            <p
              className={cn(
                roboto.className,
                "lg:mt-5 mt-3 text-gray-700 font-normal text-sm lg:text-lg"
              )}
            >
              {singleBlog.category}
            </p>
            <div className="flex items-center justify-start mt-6 gap-4">
              <Image
                src={singleBlog.user?.avatar!}
                width={50}
                height={50}
                className="rounded-full"
                alt="profile"
              />
              <h1 className="font-semibold">{singleBlog.user?.name}</h1>
            </div>
            <h2 className="tertiary-heading mt-8">{singleBlog.sub_heading}</h2>
            <h2 className="lg:mt-5 mt-2 text-lg">{singleBlog.description}</h2>
          </div>
        </section>
      </WidthWrapperManager>
      {category ? (
        <>
          <MoreBlogs filter_id={filterid} flterCategory={category} />
        </>
      ) : (
        <>
          <MiniLoader />
        </>
      )}
    </>
  );
}
