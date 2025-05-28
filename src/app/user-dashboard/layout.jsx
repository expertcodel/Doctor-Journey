import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function Layout({ children }) {
    const data = await cookies().get('userData');
    if (!data) {
        redirect('/login');
    }
    return (
        <div>{children}</div>
    )
}
