import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcommCuy | Tecnología de Alto Rendimiento & Gadgets Pro",
  description:
    "EcommCuy es la tienda insignia de hardware premium, periféricos mecánicos, audio Hi-Fi y gadgets de vanguardia en Colombia con pagos seguros en COP.",
  keywords: [
    "ecommerce colombia",
    "tecnologia colombia",
    "hardware pro",
    "teclados mecanicos",
    "monitores oled",
    "laptops estudio",
    "audio hi-fi",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
