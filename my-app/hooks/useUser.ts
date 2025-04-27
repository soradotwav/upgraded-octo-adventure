"use client";

import { useState, useEffect } from "react";
import {UserType} from "@/lib/data";
import {loadUserFromLocalStorage, saveUserToLocalStorage} from "@/lib/utils";
import { removeUserFromLocalStorage } from "@/lib/utils";
import {useRouter} from "next/navigation";

export function useUser() {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const storedUser = loadUserFromLocalStorage();
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    useEffect(() => {
        if (user) {
            saveUserToLocalStorage(user);
        }
    }, [user]);

    function logout() {
        setUser(null);
        removeUserFromLocalStorage();
        window.location.reload();
    }

    return { user, setUser, logout };
}