import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Regicide",
  description: "Regicide game application, to try the solo boardgame",
  icons: {
    icon: [
      {
        type: "image/png",
        sizes: "192x192",
        url: "/favicon/android-icon-192x192.png",
      },
      { type: "image/png", sizes: "32x32", url: "/favicon/favicon-32x32.png" },
      { type: "image/png", sizes: "96x96", url: "/favicon/favicon-96x96.png" },
      { type: "image/png", sizes: "16x16", url: "/favicon/favicon-16x16.png" },
      { type: "image/x-icon", url: "/favicon/favicon.ico" },
    ],
    apple: [
      {
        type: "image/png",
        sizes: "57x57",
        url: "/favicon/apple-icon-57x57.png",
      },
      {
        type: "image/png",
        sizes: "60x60",
        url: "/favicon/apple-icon-60x60.png",
      },
      {
        type: "image/png",
        sizes: "72x72",
        url: "/favicon/apple-icon-72x72.png",
      },
      {
        type: "image/png",
        sizes: "76x76",
        url: "/favicon/apple-icon-76x76.png",
      },
      {
        type: "image/png",
        sizes: "114x114",
        url: "/favicon/apple-icon-114x114.png",
      },
      {
        type: "image/png",
        sizes: "120x120",
        url: "/favicon/apple-icon-120x120.png",
      },
      {
        type: "image/png",
        sizes: "144x144",
        url: "/favicon/apple-icon-144x144.png",
      },
      {
        type: "image/png",
        sizes: "152x152",
        url: "/favicon/apple-icon-152x152.png",
      },
      {
        type: "image/png",
        sizes: "180x180",
        url: "/favicon/apple-icon-180x180.png",
      },
    ],
  },
};

export const viewport = {
  themeColor: "#006366",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className + " overflow-hidden select-none"}>
        {children}
      </body>
    </html>
  );
}
