// app/actions.ts (Server Actions must be async)
'use server';

import { cookies } from 'next/headers';

export async function setLogin(token: string) {
    const cookieStore = cookies();
    (await cookieStore).set('user-login-token', token, {
        httpOnly: false,
        secure: false,
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
    });
}

export async function getLogin() {
    const cookieStore = cookies();
    return (await cookieStore).get('user-login-token')?.value;
}
