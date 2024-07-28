import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'

import "./globals.css";

import { ModalProvider } from "@/providers/modal-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import Footer from "@/components/footer";
import { PreviewModalProvider } from "@/providers/preview-modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Step On | Shoe Store",
  description: "Shoe Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning={true}>
        <body className={font.className}>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
          <div className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col items-center">
          <ClerkProvider>
            <ToasterProvider />
            <ModalProvider />
            <PreviewModalProvider />
            {children}
            </ClerkProvider>
          </div>
          <Footer />
          </ThemeProvider>
        </body>
      </html>
  );
}
