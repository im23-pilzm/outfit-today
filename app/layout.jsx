import { Urbanist } from "next/font/google";
import "./globals.css";
import ClientLayout from "./components/ClientLayout.jsx";
import Providers from "./components/Provider";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"]
});


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={`${urbanist.variable}`}>
        <Providers>
          <ClientLayout>
            {children}
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}


