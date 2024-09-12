"use client";
import BlogCard from "@/components/BlogCard";
import Button from "@/components/Button";
import CircleLoader from "@/components/Loaders/CircleLoader";
import MiniLoader from "@/components/Loaders/MiniLoader";
import { Spotlight } from "@/components/ui/Spotlight";
import WidthWrapperManager from "@/components/WidthManager";
import { BlogPostType, UserType } from "@/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const session = useSession();
  const [userblogs, setUserblogs] = useState<BlogPostType[]>([]);
  const [user, setUser] = useState<UserType>();
  const [loader, setLoader] = useState<Boolean>(false);

  const fetching_user_blogs = async () => {
    try {
      setLoader(true);
      const res = await fetch(
        `/api/single-user-data?userid=${session?.data?.user?._id}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      if (res.ok) {
        setUserblogs(data.response.blogs);
        setUser(data.response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetching_user_blogs();
  }, [session.data]);

  if (!session.data) {
    redirect("/");
  }

  if (loader) {
    return <MiniLoader />;
  } else {
    if (userblogs.length === 0) {
      return (
        <>
          <WidthWrapperManager>
            <div className="flex flex-col gap-2 items-center justify-center">
              <Image src={"/empty.png"} width={100} height={40} alt="epmty" />
              <h1 className="secondary-heading mt-3">
                There is No <span className="text-red-500">Blog</span>
              </h1>
              <Link href={"/"}>
                <Button className="text-white bg-red-500 rounded-lg mt-8 font-semibold">
                  {loader ? (
                    <CircleLoader borderColor="border-white" />
                  ) : (
                    <>Go Back</>
                  )}
                </Button>
              </Link>
            </div>
          </WidthWrapperManager>
        </>
      );
    }
  }

  return loader ? (
    <MiniLoader />
  ) : (
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
        <section>
          <h1 className="primary-heading">
            My Personal{" "}
            <span className="text-red-500 text-center lg:text-start">
              Blogs
            </span>
          </h1>
          <div className="grid gird-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-8 gap-4 mt-10 lg:mt-24">
            {userblogs.map((data, id) => {
              return (
                <>
                  <BlogCard
                    key={id}
                    image={data?.image!}
                    route={`/edit-blog/${data._id}`}
                    title={data.title}
                    category={data.category}
                    user={user!}
                  />
                </>
              );
            })}
          </div>
        </section>
      </WidthWrapperManager>
    </>
  );
}
