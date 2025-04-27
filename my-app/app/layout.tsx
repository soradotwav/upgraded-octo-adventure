import type { Metadata } from 'next'
import './globals.css'
import {Header} from "@/components/header";

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
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
      <footer className="py-6"></footer>
      </body>
    </html>
  )
}
