import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'mettä muse - Discover Unique Artisan Products',
  description: 'Explore handcrafted products from artisans worldwide at mettä muse. appscrip abdul jabbar',
  keywords: ['artisan products', 'handmade goods', 'unique home decor', 'ethical fashion', 'mettä muse', 'abdul jabbar'],
  alternates: {
    canonical: 'https://684c5e0162a2c44f1489ad29--appscripabdul.netlify.app/', // Updated to live domain
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
