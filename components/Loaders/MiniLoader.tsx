import Image from "next/image";

export default function MiniLoader() {
  return (
    <>
      <section className="flex items-center fixed inset-0 bg-white z-50 justify-center">
        <Image src={"/loader.svg"} width={60} height={60} alt="loader" />
      </section>
    </>
  );
}
