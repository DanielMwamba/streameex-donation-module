import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
const poppinsRegular = Poppins({ subsets: ["latin"], weight: ["400", "800"],  });
import { Suspense } from "react";
import NextAuthSessionProvider from "@/components/session-provider";


export const metadata: Metadata = {
  title: "Streameex - Dons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={poppinsRegular.className}
      >
        <Suspense fallback={
          <div className="w-screen h-screen flex items-center justify-center">
            <p>
              Chargement en cours...
            </p>
          </div>
        }>
          <NextAuthSessionProvider>
            {children}
          </NextAuthSessionProvider>
        </Suspense>
      </body>
    </html>
  );
}
