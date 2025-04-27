"use client"

import { useState } from "react"
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {toast} from "sonner";
import {testStudent, UserType} from "@/lib/data";
import {useUser} from "@/hooks/useUser";

interface AuthModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    defaultTab?: "login" | "signup"
}

export function AuthModal({ open, onOpenChange, defaultTab = "login" }: AuthModalProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [signupEmail, setSignupEmail] = useState("");
    const {setUser} = useUser()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        toast(<p>Login successful</p>, {description: "Welcome back to UW Events Portal!",
        })

        setUser(testStudent)
        window.location.reload()

        onOpenChange(false)
    }

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        if (!signupEmail.endsWith("@uw.edu")) {
            toast.error(<p>Invalid Email</p>, {
                description: "Please use your official @uw.edu email address.",
            });
            return;
        }

        const form = e.currentTarget as HTMLFormElement;
        const firstNameInput = form.namedItem("firstName") as HTMLInputElement;
        const lastNameInput = form.elements.namedItem("lastName") as HTMLInputElement;

        const user: UserType = {
            name: `${firstNameInput.value} ${lastNameInput.value}`,
            major: "Undeclared",
            year: "Freshman",
            avatar: "/placeholder.svg?height=40&width=40",
            interests: [],
            organizations: [],
        };

        setUser(user);
        window.location.reload()

        toast.success(<p>Account created!</p>, {
            description: "Welcome to UW Events Portal! Please check your email to verify your account.",
        });
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader className="flex flex-col items-center text-center">
                    <div className="mb-4 flex items-center justify-center">
                        <div className="relative h-12 w-12">
                            <Image src="/uw-logo.png?height=48&width=48" alt="UW Logo" fill className="object-contain" />
                        </div>
                    </div>
                    <DialogTitle className="text-xl font-bold text-[#4b2e83]">Welcome to UW Bothell Events Portal</DialogTitle>
                    <DialogDescription>Connect with events and activities across campus.</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    {/* Login Form */}
                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="email"
                                        placeholder="your.email@uw.edu"
                                        type="email"
                                        className="pl-9"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Button variant="link" size="sm" className="h-auto p-0 text-xs text-[#4b2e83]">
                                        Forgot password?
                                    </Button>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        className="pl-9 pr-9"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="text-sm">
                                    Remember me
                                </Label>
                            </div>

                            <Button type="submit" className="w-full bg-[#4b2e83] hover:bg-[#4b2e83]/90">
                                Login
                            </Button>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full" type="button">
                                <Image
                                    src="/uw-sso.png?height=20&width=20"
                                    alt="UW SSO"
                                    width={20}
                                    height={20}
                                />
                                UW NetID Single Sign-On
                            </Button>
                        </form>
                    </TabsContent>

                    {/* Signup Form */}
                    <TabsContent value="signup">
                        <form onSubmit={handleSignup} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                        <Input id="firstName" placeholder="First Name" className="pl-9" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Last Name" required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signupEmail">UW Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="signupEmail"
                                        placeholder="your.email@uw.edu"
                                        type="email"
                                        className="pl-9"
                                        required
                                        value={signupEmail}
                                        onChange={(e) => setSignupEmail(e.target.value)}
                                    />
                                </div>
                                <p className="text-xs text-gray-500">Please use your UW email address</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="signupPassword">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="signupPassword"
                                        type={showPassword ? "text" : "password"}
                                        className="pl-9 pr-9"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Password must be at least 8 characters with a number and special character
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="pl-9 pr-9"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">
                      {showConfirmPassword ? "Hide password" : "Show password"}
                    </span>
                                    </Button>
                                </div>
                            </div>

                            <div className="flex items-start space-x-2">
                                <Checkbox id="terms" className="mt-1" required />
                                <Label htmlFor="terms" className="text-sm">
                                    I agree to the{" "}
                                    <a href="https://gather.uwb.edu/terms?view=terms" className="text-[#4b2e83] underline hover:text-[#4b2e83]/80">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="https://customviewbook.uwb.edu/wizard/privacy-policy" className="text-[#4b2e83] underline hover:text-[#4b2e83]/80">
                                        Privacy Policy
                                    </a>
                                </Label>
                            </div>

                            <Button type="submit" className="w-full bg-[#4b2e83] hover:bg-[#4b2e83]/90">
                                Create Account
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
