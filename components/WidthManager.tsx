"use client"
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WidthWrapperManagerType {
  children: React.ReactNode;
  className?: string;
}

export default function WidthWrapperManager({
  children,
  className,
}: WidthWrapperManagerType) {
  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <section className={cn(className, "py-10 lg:py-20 px-4 lg:px-40")}>
          {children}
        </section>
      </motion.section>
    </>
  );
}
