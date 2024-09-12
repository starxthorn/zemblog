import { Roboto } from "next/font/google";
import { Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["400", "500", "700", "600", "800", "900"],
  subsets: ["latin"],
});

export const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});
