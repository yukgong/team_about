import type { Metadata } from "next";
import { fraunces, notoSerifKR, notoSansKR, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "IHATEFLYINGBUGS - 교육을 성장시킵니다",
  description: "사람을 향한 기술, 자연스러운 성장. R&D 역량으로 혁신적인 에듀테크 솔루션을 만듭니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${fraunces.variable} ${notoSerifKR.variable} ${notoSansKR.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[#361a07] text-black font-sans">
        {children}
      </body>
    </html>
  );
}
