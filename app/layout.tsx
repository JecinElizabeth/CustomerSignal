import type { Metadata } from "next";
import "./globals.css";
import { Sidebar, MobileHeader, MobileNav } from "@/components/Sidebar";
import { DemoBanner } from "@/components/DemoBanner";

export const metadata: Metadata = {
  title: "CustomerSignal — Customer retention workspace",
  description:
    "Customer intelligence for retail brands: RFM segmentation, campaign drafting, and loyalty economics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased">
        <div className="flex h-full">
          <Sidebar />
          <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
            <MobileHeader />
            <DemoBanner />
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
              {children}
            </main>
          </div>
        </div>
        <MobileNav />
      </body>
    </html>
  );
}
