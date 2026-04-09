import localFont from "next/font/local";

export const ABCDiatype = localFont({
  src: [
    {
      path: "../../public/fonts/ABCDiatype-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ABCDiatype-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ABCDiatype",
});

export const ManukaBold = localFont({
  src: [
    {
      path: "../../public/fonts/Manuka-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-ManukaBold",
});
