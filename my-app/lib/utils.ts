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

export function removeUserFromLocalStorage() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
}

export function updateUserName(setUser: React.Dispatch<React.SetStateAction<UserType | null>>, newName: string) {
  setUser(prev => prev ? { ...prev, name: newName } : null);
}

export function updateUserMajor(setUser: React.Dispatch<React.SetStateAction<UserType | null>>, newMajor: string) {
  setUser(prev => prev ? { ...prev, major: newMajor } : null);
}

export function updateUserYear(setUser: React.Dispatch<React.SetStateAction<UserType | null>>, newYear: string) {
  setUser(prev => prev ? { ...prev, year: newYear } : null);
}

export function updateUserAvatar(setUser: React.Dispatch<React.SetStateAction<UserType | null>>, newAvatar: string) {
  setUser(prev => prev ? { ...prev, avatar: newAvatar } : null);
}

export function updateUserInterests(setUser: React.Dispatch<React.SetStateAction<UserType | null>>, newInterests: string[]) {
  setUser(prev => prev ? { ...prev, interests: newInterests } : null);
}

export function updateUserOrganizations(setUser: React.Dispatch<React.SetStateAction<UserType | null>>, newOrganizations: string[]) {
  setUser(prev => prev ? { ...prev, organizations: newOrganizations } : null);
}