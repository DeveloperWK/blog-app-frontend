import { AuthProvider } from "@/app/context/AuthContext/AuthProvider";
import { PostProvider } from "@/app/context/PostContext/PostProvider";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});
export const metadata = {
  title: "CodeVerse — A Developer's Diary",
  description: "A Developer Blog Platform",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased w-full mx-auto`}>
        <AuthProvider>
          <ToastContainer />
          <PostProvider>{children}</PostProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
