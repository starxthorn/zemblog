"use client";
import { Input } from "@/components/ui/input";
import { Spotlight } from "@/components/ui/Spotlight";
import WidthWrapperManager from "@/components/WidthManager";
import { categories } from "@/data";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { BlogPostType } from "@/types";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { toast } from "sonner";
import CircleLoader from "@/components/Loaders/CircleLoader";

export default function page() {
  const session = useSession();
  const router = useRouter();
  const [loader, setLoader] = useState<Boolean>(false);
  const [blog, setBlog] = useState<BlogPostType>({
    title: "",
    image: "",
    description: "",
    sub_heading: "",
    category: categories[0],
  });

  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBlog({
      ...blog,
      category: e.target.value,
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBlog({
      ...blog,
      description: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await fetch(
        `/api/single-blog?userid=${session?.data?.user?._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blog),
        }
      );
      if (res.ok) {
        router.push("/");
        toast.success("Blog is published");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  if (!session.data) {
    redirect("/");
  }

  return (
    <>
      <WidthWrapperManager className="z-50">
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
        <form onSubmit={handleSubmit}>
          <div className="w-full">
            <Input
              placeholder="Title"
              onChange={handleInputchange}
              className="bg-gray-50 rounded-full h-12 pl-7"
              required
              name="title"
            />
          </div>
          <section className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5 gap-3">
            <div className="mt-4 lg:mt-6">
              <Input
                placeholder="Sub-heading"
                onChange={handleInputchange}
                className="bg-gray-50 rounded-full h-12 pl-7"
                required
                name="sub_heading"
              />
              <textarea
                required
                name="description"
                onChange={handleTextareaChange}
                className="bg-gray-50 rounded-xl w-full h-[40vh] outline-blue-100 p-4 pl-7 mt-4 lg:mt-6 border"
                placeholder="Description"
              ></textarea>
            </div>
            <div className="mt-4 lg:mt-6">
              <select
                onChange={handleSelectChange}
                name="category"
                className="w-full bg-gray-50 rounded-full h-12 border pl-7 cursor-pointer"
              >
                {categories.map((item, id) => {
                  return (
                    <>
                      <option
                        key={id}
                        className="cursor-pointer hover:font-semibold transition-all"
                        value={item}
                      >
                        {item}
                      </option>
                    </>
                  );
                })}
              </select>
              <div>
                {blog?.image?.length! > 0 ? (
                  <Image
                    src={blog?.image!}
                    width={1200}
                    height={1200}
                    className="rounded-lg w-full h-[40vh] mt-4 lg:mt-6"
                    alt="image"
                  />
                ) : (
                  <>
                    <UploadDropzone
                      appearance={{
                        container:
                          "w-full cursor-pointer h-[40vh] mt-4 lg:mt-6 border bg-gray-50",
                        uploadIcon: "w-28 h-28 text-gray-300",
                        button: "bg-red-500 px-6 text-white",
                      }}
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        setBlog({ ...blog, image: res[0]?.url });
                      }}
                      onUploadError={(error: Error) => {
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </section>
          <div className="w-full flex items-center justify-end mt-10">
            <Button
              type="submit"
              className="bg-red-500 lg:rounded-lg rounded-full font-bold text-white w-full lg:w-auto transition-all hover:bg-red-400"
            >
              {loader ? (
                <CircleLoader borderColor="border-white" />
              ) : (
                <>Publish</>
              )}
            </Button>
          </div>
        </form>
      </WidthWrapperManager>
    </>
  );
}
