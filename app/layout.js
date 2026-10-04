import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { THEMES, themeScript } from "@/lib/themeScript";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-TuitionBD | Learn, Teach, Grow",
  description:
    "E-TuitionBD connects students with verified tutors. Post tuitions, apply, pay securely and manage everything in one place.",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1426" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={THEMES.light} className={`${jakarta.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
