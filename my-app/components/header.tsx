"use client"
import Image from "next/image"
import Link from "next/link"
import {Bell, Calendar, Compass, Home, Menu, Search, User} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {useRouter} from "next/navigation";

export function Header() {
  const router = useRouter();

  return (
      <header className="sticky top-0 z-10 h-16 border-b bg-white px-4 shadow-sm">
        <div className="mx-auto flex h-full w-full items-center justify-between">
          <div className="flex justify-between items-center gap-20">
            {/* UW Logo - Left aligned */}
            <Link href="/" className="flex items-center gap-2 pl-5">
              <div className="relative h-10 w-10">
                <Image src="/uw-logo.png?height=40&width=40" alt="UW" fill className="object-contain" priority />
              </div>
              <div onClick={() => router.push("/")}>
                <h1 className="text-lg font-bold text-[#4b2e83]">UW Events</h1>
                <p className="text-xs text-[#4b2e83]/70">University of Washington</p>
              </div>
            </Link>

            {/* Navigation - Center aligned */}
            <nav className="hidden md:block">
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-[#4b2e83]" onClick={() => router.push('/')}>
                  <Home className="mr-1 h-4 w-4" />
                  Home
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-[#4b2e83]">
                  <Calendar className="mr-1 h-4 w-4" />
                  My Calendar
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-700 hover:text-[#4b2e83]" onClick={() => router.push('/discover')}>
                  <Compass className="mr-1 h-4 w-4" />
                  Discover
                </Button>
              </div>
            </nav>
          </div>

          {/* Right aligned controls */}
          <div className="flex items-center gap-3 pr-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                  type="search"
                  placeholder="Search events..."
                  className="w-64 rounded-full bg-gray-100 pl-9 pr-4 focus-visible:ring-[#4b2e83]"
              />
            </div>

            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-gray-600">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#b7a57a] p-1 text-[10px]">3</Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-auto">
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                    <div className="font-medium">New event: Spring Football Game</div>
                    <div className="text-xs text-muted-foreground">2 hours ago</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                    <div className="font-medium">RSVP confirmed: Career Fair</div>
                    <div className="text-xs text-muted-foreground">Yesterday</div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
                    <div className="font-medium">Event reminder: Research Symposium</div>
                    <div className="text-xs text-muted-foreground">2 days ago</div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full border border-gray-200 bg-gray-50 text-gray-600"
                >
                  <User className="h-5 w-5" />
                  <span className="sr-only">Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>My Events</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </header>
  )
}
