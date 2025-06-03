import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import UserLayout from '../component/UserLayout.jsx'
export default async function Layout({ children }) {
  
    const userdata = await cookies().get('userData');
    if (!userdata) {
        redirect('/login');
    }

    const data=JSON.parse(userdata.value);
   
    return (

        <UserLayout children={children} data={data.userData}/>
        
    )
}
