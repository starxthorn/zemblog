"use client";
import { useRouter } from "next/navigation";
import Button from "./Button";
import { motion } from "framer-motion";
import { useState } from "react";
import CircleLoader from "./Loaders/CircleLoader";

export default function Alert(props: any) {
  const router = useRouter();
  const [loader, setLoader] = useState<Boolean>(false);
  const delete_document = async () => {
    try {
      setLoader(true);
      const res = await fetch(`/api/single-blog?blogid=${props.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        props.isAlert(false);
        router.push("/personal-blogs/blogs");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(true);
    }
  };
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="lg:mt-40 mt-24"
      >
        <section className="w-full h-screen fixed inset-0 backdrop-blur-lg flex items-center lg:justify-center justify-start overflow-hidden">
          <div className="lg:w-[40rem] w-screen lg:py-6 py-4 lg:rounded-2xl rounded-lg border bg-white lg:px-6 px-4 scale-[85%] lg:scale-90">
            <h1 className="tertiary-heading">Are you absolutely sure?</h1>
            <p className="mt-3 lg:text-base text-sm">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </p>
            <div className="mt-5 flex items-center justify-end gap-4">
              <Button
                className="border rounded-lg hover:bg-gray-100 transition-all"
                click={() => props.isAlert(false)}
              >
                Cancel
              </Button>
              <Button
                click={delete_document}
                className="bg-red-500 rounded-lg text-white hover:bg-red-400 transition-all"
              >
                {loader ? (
                  <CircleLoader borderColor="border-white" />
                ) : (
                  <>Delete</>
                )}
              </Button>
            </div>
          </div>
        </section>
      </motion.section>
    </>
  );
}
