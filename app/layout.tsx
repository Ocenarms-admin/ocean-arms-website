import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ocean Arms Technical Services LLC | Marine & Industrial Solutions",
  description:
    "UAE-based specialized industrial service provider delivering integrated solutions to Oil & Gas, Marine & Shipping, Power & Energy, and Civil & Construction sectors. Dubai, UAE.",
  keywords:
    "marine technical services, industrial maintenance, rope access, oil gas services, UAE, Dubai, offshore, shipyard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
