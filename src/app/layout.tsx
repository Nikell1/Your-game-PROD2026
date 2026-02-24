import type { Metadata } from "next";
import "./globals.css";
import { PROJECT_NAME } from "@/shared/constants";
import { HexagonBackground } from "@/shared/ui";
import { AudioProvider, ThemeProvider } from "@/providers";

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
    <html lang="ru" suppressHydrationWarning>
      <body className={`font-sans antialiased w-screen h-screen flex flex-col`}>
        <HexagonBackground className="w-full h-full absolute top-0 right-0 z-1" />
        <div className="relative z-2 w-screen h-screen flex flex-col">
          <AudioProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AudioProvider>
        </div>
      </body>
    </html>
  );
}
