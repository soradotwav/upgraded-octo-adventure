import type { Metadata } from 'next'
import './globals.css'
import {Header} from "@/components/header";
import {Toaster} from "sonner";

export const metadata: Metadata = {
    title: "UW Events Portal",
    description: "University of Washington Events Portal",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
      <Header />
      <div className="flex min-h-screen flex-col bg-gray-50">
          {children}
      </div>
      <Toaster />
      <footer className="py-6"></footer>
      </body>
    </html>
  )
}
