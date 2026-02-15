import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { PROJECT_NAME } from "@/shared/constants";
import { HexagonBackground } from "@/shared/ui";

const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
export const metadata: Metadata = {
  title: PROJECT_NAME,
  description: `Браузерная игра "${PROJECT_NAME}" для проведения 
  интеллектуальных поединков всей компанией`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${montserrat.variable} font-sans antialiased w-screen h-screen flex flex-col`}
      >
        <HexagonBackground className="w-full h-full absolute top-0 right-0 z-1" />
        <div className="relative z-2 w-screen h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
