import type { Metadata } from "next";
import { Cinzel } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import ScrollToTopButton from "@/components/utils/ScrollToTopButton";
import LayoutProvider from "@/components/layout/LayoutProvider";

const cinzel = Cinzel({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tizarchic – Berbère Chic",
    template: "%s | – Berbère Chic",
  },
  description:
    "🌸 Vêtements femme tendance : ensembles, abayas, châles & accessoires",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased ${cinzel.className} `}
        suppressHydrationWarning
      >
        <LayoutProvider>
          <NavBar />
          {children}
          <Footer />
          <ScrollToTopButton />
        </LayoutProvider>
      </body>
    </html>
  );
}
