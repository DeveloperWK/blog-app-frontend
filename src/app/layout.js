import { Poppins } from "next/font/google";
import "./globals.css";
import {ToastContainer} from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased w-full mx-auto`}>
      <ToastContainer/>
        {children}
      </body>
    </html>
  );
}
