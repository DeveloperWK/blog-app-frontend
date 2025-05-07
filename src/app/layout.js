import { Poppins } from "next/font/google";
import "./globals.css";
import {ToastContainer} from "react-toastify";
import {AuthProvider} from "@/app/context/AuthContext/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
export const metadata = {
    title: "CodeVerse — A Developer's Diary",
    description: "A Developer Blog Platform",
};
export default function RootLayout({ children }) {
  return (
      <html lang="en">
      <body className={`${poppins.variable} antialiased w-full mx-auto`}>
      <AuthProvider>
      <ToastContainer/>
        {children}
    </AuthProvider>
      </body>
    </html>
  );
}
