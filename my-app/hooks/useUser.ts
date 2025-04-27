"use client";

import { useState, useEffect } from "react";
import {UserType} from "@/lib/data";
import {loadUserFromLocalStorage, saveUserToLocalStorage} from "@/lib/utils";

export function useUser() {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const storedUser = loadUserFromLocalStorage();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Every time the user changes, re-save it
    useEffect(() => {
        if (user) {
            saveUserToLocalStorage(user);
        }
    }, [user]);

    return { user, setUser };
}