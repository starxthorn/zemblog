interface CircleLoaderPropsType {
  borderColor: string;
}

export default function CircleLoader({ borderColor }: CircleLoaderPropsType) {
  return (
    <>
      <section className="animate-spin">
        <div
          className={`w-5 h-5 bg-none ${borderColor} border-2 rounded-full border-r-transparent`}
        ></div>
      </section>
    </>
  );
}
