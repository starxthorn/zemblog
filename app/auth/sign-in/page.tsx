"use client";
import Button from "@/components/Button";
import CircleLoader from "@/components/Loaders/CircleLoader";
import MiniLoader from "@/components/Loaders/MiniLoader";
import { Input } from "@/components/ui/input";
import { Spotlight } from "@/components/ui/Spotlight";
import WidthWrapperManager from "@/components/WidthManager";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function page() {
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState<Boolean>(false);
  const [Loginloader, setLoginloader] = useState<Boolean>(false);
  const session = useSession();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  if (session.data) {
    redirect("/");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoader(true);
      const res = await fetch("/api/user-sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
      }
      if (res.ok) {
        await signIn("credentials", {
          email: user?.email,
          password: user?.password,
          redirect: true,
          callbackUrl: "/",
        });
        toast.success("Logged In");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  return Loginloader ? (
    <MiniLoader />
  ) : (
    <>
      <div className="-z-50">
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
      <div className="lg:h-[80vh] h-[75vh] w-full bg-white bg-grid-black/[0.07] absolute left-0 top-0 right-0 -z-50 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <WidthWrapperManager className="flex z-50 items-center justify-center lg:mt-0 mt-10">
        <form
          onSubmit={handleSubmit}
          className="lg:border bg-none lg:bg-white lg:rounded-lg lg:p-6 p-2 lg:w-[27rem] w-full h-auto relative"
        >
          <div>
            <h1 className="font-bold text-2xl">Login to your Account</h1>
            <p className="mt-2 lg:block hidden">
              Enter the credentials to make your Account
            </p>
            <p className="text-red-500 my-2">{message}</p>
            <h1 className="mt-6 font-medium">Email</h1>
            <Input
              onChange={handleInputChange}
              name="email"
              className="mt-2 h-10 z-50 bg-white"
              type="email"
              placeholder="example@gmail.com"
              required
              autoComplete="off"
            />
            <h1 className="mt-3 font-medium">Password</h1>
            <Input
              autoComplete="off"
              onChange={handleInputChange}
              name="password"
              className="mt-2 h-10 bg-white z-50"
              type="password"
              required
            />
            <h1 className="mt-5 font-medium">
              Do not have any account?{" "}
              <Link onClick={() => setLoginloader(true)} href={"/auth/sign-up"}>
                <span className="text-red-500 cursor-pointer">Create</span>
              </Link>
            </h1>
            <Button
              type="submit"
              className="bg-red-500 rounded-full w-full flex items-center justify-center gap-3 mt-5 mb-3 text-white font-semibold cursor-pointer hover:bg-red-400 transition-all"
            >
              {loader && <CircleLoader borderColor="border-white" />} Sign in
            </Button>
            <Button
              click={() => signIn("google")}
              type="button"
              className="bg-gray-50 border flex items-center justify-center gap-3 rounded-full w-full lg:mt-3 mt-2 mb-4 text-black font-semibold cursor-pointer"
            >
              <FcGoogle />
              Continue with Google
            </Button>
          </div>
        </form>
      </WidthWrapperManager>
    </>
  );
}
