import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'mettä muse - Discover Unique Artisan Products',
  description: 'Explore handcrafted products from artisans worldwide at mettä muse.',
  keywords: ['artisan products', 'handmade goods', 'unique home decor', 'ethical fashion', 'mettä muse'],
  alternates: {
    canonical: 'https://www.mettamuse.com', // Updated to live domain
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
