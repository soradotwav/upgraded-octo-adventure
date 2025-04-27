import type { Metadata } from 'next'
import './globals.css'
import {Header} from "@/components/header";
import {Toaster} from "sonner";
import Link from "next/link";

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
      {/* Footer */}
      <footer className="border-t bg-white py-8">
          <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="text-center md:text-left">
                      <p className="text-sm text-gray-600">© 2025 University of Washington Bothell. All rights reserved.</p>
                      <p className="text-xs text-gray-500">Bothell, Washington 98011</p>
                  </div>
                  <div className="flex gap-4">
                      <Link href="https://customviewbook.uwb.edu/wizard/privacy-policy" className="text-sm text-gray-600 hover:text-[#4b2e83] hover:underline">
                          Privacy Policy
                      </Link>
                      <Link href="https://www.uwb.edu/it/about-it/guidelines/equipment-checkout-policy" className="text-sm text-gray-600 hover:text-[#4b2e83] hover:underline">
                          Terms of Use
                      </Link>
                      <Link href="https://www.uwb.edu/accessibility/" className="text-sm text-gray-600 hover:text-[#4b2e83] hover:underline">
                          Accessibility
                      </Link>
                      <Link href="https://www.uwb.edu/contact" className="text-sm text-gray-600 hover:text-[#4b2e83] hover:underline">
                          Contact
                      </Link>
                  </div>
              </div>
          </div>
      </footer>
      </body>
    </html>
  )
}
