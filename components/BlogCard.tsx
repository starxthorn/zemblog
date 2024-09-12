"use client";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { cn } from "@/lib/utils";
import { roboto } from "@/fonts/font";
import Link from "next/link";
import { useState } from "react";
import MiniLoader from "./Loaders/MiniLoader";
import { BlogPostType } from "@/types";

export default function BlogCard({
  title,
  category,
  user,
  image,
  route,
}: BlogPostType) {
  const [loader, setLoader] = useState<Boolean>(false);
  return loader ? (
    <MiniLoader />
  ) : (
    <>
      <Link key={route} href={`${route}`} onClick={() => setLoader(true)}>
        <CardContainer>
          <CardBody className="bg-white cursor-pointer relative group/card hover:shadow-2xl transition-all hover:shadow-red-500/[0.1] border-black/[0.1] hover:border-red-500/[0.7] w-full h-auto lg:rounded-xl rounded-lg p-2 lg:p-4 border">
            <CardItem translateZ="100" className="w-full">
              <Image
                src={image!}
                width="500"
                height="200"
                className="w-full lg:rounded-xl rounded-lg group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <CardItem>
              <h1 className="tertiary-heading mt-5">{title}</h1>
            </CardItem>
            <CardItem>
              <p
                className={cn(
                  roboto.className,
                  "lg:mt-3 mt-2 text-gray-700 font-normal text-sm lg:text-lg"
                )}
              >
                {category}
              </p>
            </CardItem>
            <CardItem className="mt-6 mb-2 lg:mb-0">
              <div className="flex items-center justify-start">
                <Image
                  src={user?.avatar!}
                  width={40}
                  height={40}
                  alt="pic"
                  className="rounded-full lg:w-10 w-8"
                />
                <p className="lg:ml-4 ml-2 lg:text-base text-sm text-black">
                  Posted By <span className="text-red-500">{user?.name}</span>
                </p>
              </div>
            </CardItem>
          </CardBody>
        </CardContainer>
      </Link>
    </>
  );
}
