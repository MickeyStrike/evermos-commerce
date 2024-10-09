import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from '@/config/font'
import { GlobalContextProvider } from "@/providers/stores";
import Headers from "@/components/headers";
import Footers from "@/components/footers";
import ModalSearchProduct from "@/components/modalSearch";

export const metadata: Metadata = {
  title: "Evermos",
  description: "Evermos Commerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <GlobalContextProvider>
          <Headers />
          <div className="mt-90">
            {children}
          </div>
          <Footers />
          <ModalSearchProduct />
        </GlobalContextProvider>
      </body>
    </html>
  );
}
