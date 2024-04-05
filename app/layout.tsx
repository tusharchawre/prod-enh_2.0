import type { Metadata } from "next";

import "./globals.css";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import { EdgeStoreProvider } from '../lib/edgestore';
import { SpeedInsights } from "@vercel/speed-insights/next"

import {Toaster} from "sonner"
import { ModalProvider } from "@/components/providers/modal-provider";


export const metadata: Metadata = {
  title: "Productivity",
  description: "MiniProject 1-B",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()




  return (
    <html lang="en">
      <body>
      <SpeedInsights/>
        <SessionProvider session={session}>
        <ConvexClientProvider>
        
        <EdgeStoreProvider>  
       
          <Toaster position="bottom-center" toastOptions={{

    classNames: {
      title: 'text-black',
      toast: 'text-black',

    },
  }}/>             <ModalProvider />
  {children}
   </EdgeStoreProvider>
  </ConvexClientProvider>

        </SessionProvider>
        </body>
    </html>
  );
}
