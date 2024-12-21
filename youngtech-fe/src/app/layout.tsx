import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import ReduxProvider  from "./provider";
import { Roboto } from "next/font/google"; 
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const roboto = Roboto({
  subsets: ["latin"], // Ensures support for Latin characters
  weight: ["100", "300", "400", "500", "700", "900"], // Specify weights you need
  style: ["normal", "italic"], // Include both styles if necessary
  display: "swap", // Use the swap strategy for better performance
});



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`  ${roboto.className} antialiased`}
      >
         <div id="app">
       <ReduxProvider> 
       <Header/>
          <main>{children}</main>
        <Footer/>
       </ReduxProvider> 
        </div>
      </body>
    </html>
  );
}