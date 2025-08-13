import { Urbanist } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout.jsx";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"]
});


export default function RootLayout({ children }) {

  return (
        <html lang="en">
            <body className={`${urbanist.variable}`}>
              <ClientLayout>
                {children}
              </ClientLayout>
            </body>
        </html>
  );
}


