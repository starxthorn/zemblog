import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { SiFiverr } from "react-icons/si";
import { SiInstagram } from "react-icons/si";

export default function Footer() {
  return (
    <>
      <footer className="mt-40 relative mb-8 flex lg:justify-between justify-start lg:items-center items-start lg:flex-row flex-col lg:gap-0 gap-5">
        <div className="lg:h-[70vh] h-[75vh] w-full bg-white bg-grid-black/[0.09] bottom-0 -z-50 absolute left-0 right-0 flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
        <div>
          <h1 className="font-semibold lg:text-xl text-sm">
            &copy; All rights are reserved by{" "}
            <span className="text-red-500">Taimoor Safdar</span> 2024
          </h1>
        </div>
        <div className="flex items-center justify-center gap-3">
          <Link href={"https://github.com/starxthorn?tab=repositories"}>
            <SiGithub className="text-4xl bg-gray-200 rounded-lg p-2 hover:scale-125 cursor-pointer transition-all" />
          </Link>
          <Link href={"https://www.instagram.com/_taimoorsafdar"}>
            <SiInstagram className="text-4xl bg-gray-200 rounded-lg p-2 hover:scale-125 cursor-pointer transition-all" />
          </Link>
          <Link href={"/"}>
            <SiFiverr className="text-4xl bg-gray-200 rounded-lg p-2 hover:scale-125 cursor-pointer transition-all" />
          </Link>
        </div>
      </footer>
    </>
  );
}
