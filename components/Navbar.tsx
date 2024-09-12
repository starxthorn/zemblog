"use client";
import Link from "next/link";
import { Input } from "./ui/input";
import Button from "./Button";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FaBlog } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import CircleLoader from "./Loaders/CircleLoader";

export default function Navbar() {
  const [profileMenu, setProfileMenu] = useState(false);
  const session = useSession();
  const pathname = usePathname();
  const [circleLoader, setCircleLoader] = useState<Boolean>(false);

  useEffect(() => {
    if (pathname.startsWith("/")) {
      setCircleLoader(false);
    }
  });

  return (
    <>
      <header className="relative w-full py-6 px-6 lg:px-40">
        <nav className="flex items-center justify-between">
          <div>
            <h1 className="secondary-heading">
              <Link href={"/"}>
                Zem<span className="text-red-500">Blog</span>
              </Link>
            </h1>
          </div>
          {session.data ? (
            <>
              <div>
                <Image
                  src={`${
                    session?.data?.user?.image
                      ? session?.data?.user?.image
                      : "/avatar.jpeg"
                  }`}
                  width={50}
                  height={50}
                  alt={session?.data?.user?.name || "pic"}
                  className="rounded-full cursor-pointer"
                  onClick={() => setProfileMenu(!profileMenu)}
                />
                {profileMenu && (
                  <>
                    <motion.section
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute right-[8%] z-50 font-medium w-auto h-auto pl-4 py-2 border mt-2 lg:w-auto pr-3 rounded-lg shadow-lg lg:bg-none bg-white lg:backdrop-blur-lg">
                        <div className="flex items-center justify-start text-black lg:gap-4 gap-3 lg:my-3 my-2 lg:text-xl text-base">
                          <CgProfile className="text-base lg:text-xl" />
                          Welcome,
                          <span className="text-green-500">
                            {session?.data?.user?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-start text-gray-500 lg:gap-4 gap-3 lg:my-3 my-2 lg:text-xl text-base">
                          <MdOutlineMail className="text-base lg:text-xl" />
                          {session?.data?.user?.email}
                        </div>
                        <Link
                          onClick={() => setProfileMenu(false)}
                          href={`/personal-blogs/blogs`}
                          className="hover:ml-3 flex items-center justify-start cursor-pointer text-gray-500 hover:text-black transition-all lg:gap-4 gap-3 lg:my-3 my-2 lg:text-xl text-base"
                        >
                          <FaBlog className="text-base lg:text-xl" />
                          My Blogs
                        </Link>
                        <Link
                          onClick={() => setProfileMenu(false)}
                          href={`/create-blog/${session?.data?.user?._id}/create`}
                          className="hover:ml-3 flex items-center justify-start cursor-pointer text-gray-500 hover:text-black transition-all lg:gap-4 gap-3 lg:my-3 my-2 lg:text-xl text-base"
                        >
                          <MdCreate className="text-base lg:text-xl" />
                          Create Blog
                        </Link>
                        <div
                          onClick={() => signOut()}
                          className="hover:ml-3 transition-all flex items-center justify-start cursor-pointer text-red-500 lg:gap-4 gap-3 lg:my-3 my-2 lg:text-xl text-base"
                        >
                          <IoLogOutOutline className="text-base lg:text-xl" />
                          Logout
                        </div>
                      </div>
                    </motion.section>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {session.status === "loading" ? (
                <Image
                  src={"/loader.svg"}
                  width={50}
                  height={50}
                  alt="loader"
                />
              ) : (
                <>
                  <Link
                    href={"/auth/sign-in"}
                    onClick={() => setCircleLoader(true)}
                  >
                    <Button className="bg-red-500 flex items-center justify-center gap-3 rounded-full text-white">
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
        </nav>
      </header>
    </>
  );
}
