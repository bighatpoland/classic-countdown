import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { ServiceWorkerRegister } from "@/components/service-worker-register";

import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Classic SRS Speaking",
  title: "Classic SRS Speaking",
  description: "Mobile-first PWA do codziennej nauki hiszpanskiego z naciskiem na mowienie.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Classic SRS"
  }
};

export const viewport: Viewport = {
  themeColor: "#fff6ed"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pl">
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}
