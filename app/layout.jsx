import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"]
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
