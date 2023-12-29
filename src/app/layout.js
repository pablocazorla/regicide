import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Regicide App",
  description: "Regicide app",
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
