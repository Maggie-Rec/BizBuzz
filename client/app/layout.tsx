import "../styles/globals.css";
import { Inter, Ysabeau } from "next/font/google";
import React, { Suspense } from "react";


const inter = Inter({ subsets: ["latin"] });
const ysabeau = Ysabeau({subsets: ['latin']})

export const metadata = {
  title: "BizBuzz",
  description: "CRM platform for big and small businesess",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ysabeau.className}>{children}</body>
    </html>
  );
}
