import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "./context/CartContext";
import { SessionProvider } from "next-auth/react";

// if you use font 600 but it is not included , the browser will approximate it no the nearest font (in our case 700)
const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crown-Shopping",
  description: "crown is originally shopping place for luxurious clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <CartProvider>
          <body className={`${lato.className}  antialiased`}>
            {children}
            <Toaster
              toastOptions={{
                style: {
                  backgroundColor: "#504B38",
                  color: "#F8F3D9",
                },
              }}
            />
          </body>
        </CartProvider>
      </SessionProvider>
    </html>
  );
}
