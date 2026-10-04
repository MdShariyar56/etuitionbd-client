import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-TuitionBD | Learn, Teach, Grow",
  description:
    "E-TuitionBD connects students with verified tutors. Post tuitions, apply, pay securely and manage everything in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="etuition" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
