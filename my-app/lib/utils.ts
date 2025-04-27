import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {toast} from "sonner";
import {UserType} from "@/lib/data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const USER_KEY = "user";

export function saveUserToLocalStorage(user: UserType) {
  if (typeof window !== "undefined") {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

export function loadUserFromLocalStorage(): UserType | null {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as UserType;
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }
  return null;
}