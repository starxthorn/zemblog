import { cn } from "@/lib/utils";

interface ButtonPropType {
  children: React.ReactNode;
  type?: "button" | "submit";
  click?: () => void;
  className?: string;
  icon?: React.ReactNode;
}

export default function Button({
  className,
  type,
  children,
  click,
  icon,
}: ButtonPropType) {
  return (
    <>
      <button
        className={cn(
          className,
          "lg:px-6 px-5 py-3 lg:py-[12px] text-sm lg:text-lg font-normal"
        )}
        onClick={click}
        type={type || "button"}
      >
        {children}
        {icon}
      </button>
    </>
  );
}
