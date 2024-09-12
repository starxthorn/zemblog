"use client";
import Link from "next/link";
import Button from "./Button";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { FaPlus } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import MiniLoader from "./Loaders/MiniLoader";
import CircleLoader from "./Loaders/CircleLoader";

export default function Hero() {
  const session = useSession();
  const [loader, setLoader] = useState<Boolean>(false);
  const [circleLoader, setCircleLoader] = useState<Boolean>(false);

  return loader ? (
    <MiniLoader />
  ) : (
    <>
      <section className="flex items-center justify-center w-full flex-col">
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
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="lg:w-[55rem] w-full text-center mt-10">
            <p className="paragraph uppercase">welcome to zemblog</p>
            <TextGenerateEffect
              className="text-center primary-heading"
              words="Your ultimate destination for sharing insights, inspiring minds, and conversation"
            />
            <div className="mt-8 flex lg:flex-row md:flex-row flex-col items-center justify-center gap-3 lg:gap-6">
              <Link href={"#homeblogs"} className="w-full lg:w-auto">
                <Button className="bg-white border lg:w-auto w-full lg:rounded-lg rounded-full text-black">
                  Explore More
                </Button>
              </Link>
              {session.data ? (
                <>
                  <Link
                    onClick={() => setLoader(true)}
                    href={`/create-blog/${session?.data?.user?._id}/create`}
                    className="w-full lg:w-auto items-center justify-center"
                  >
                    <Button className="bg-red-500 flex items-center justify-center gap-2 rounded-full lg:rounded-lg w-full lg:w-auto text-white">
                      Create Blog
                      <FaPlus className="font-bold lg:text-xl mb-[1px] lg:mb-0" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  {session.status == "loading" ? (
                    <>
                      <Image
                        src={"/loader.svg"}
                        width={40}
                        height={40}
                        alt="loader"
                      />
                    </>
                  ) : (
                    <>
                      <Link
                        className="w-full lg:w-auto"
                        href={"/auth/sign-in"}
                        onClick={() => setCircleLoader(true)}
                      >
                        <Button className="bg-red-500 rounded-full lg:rounded-lg w-full flex items-center justify-center gap-3 lg:w-auto text-white">
                          {circleLoader && (
                            <CircleLoader borderColor="border-white" />
                          )}
                          Get started
                        </Button>
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.section>
      </section>
    </>
  );
}
