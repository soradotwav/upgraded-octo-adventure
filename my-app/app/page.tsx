"use client"
import {useUser} from "@/hooks/useUser";
import UserHomePage from "@/components/pages/user-homepage";
import DefaultHomePage from "@/components/pages/default-homepage";

export default function HomePage() {
    const { user, setUser } = useUser();

    return (
        <>
            {user ? <UserHomePage user={user} setUser={setUser} /> : <DefaultHomePage />}
        </>
    );
}
