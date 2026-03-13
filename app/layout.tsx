import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Step1ne - 專業獵頭顧問平台",
    template: "%s | Step1ne",
  },
  description: "Step1ne 專業獵頭顧問團隊，為你媒合最適合的職涯機會。透過個人化的顧問頁面，探索職缺、投遞履歷、智慧媒合。",
  metadataBase: new URL("https://site.step1ne.com"),
  openGraph: {
    siteName: "Step1ne",
    type: "website",
    locale: "zh_TW",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
