import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export default async function Layout({ children }) {
  
    const userdata = await cookies().get('userData');
    if (!userdata) {
        redirect('/login');
    }

    const data=JSON.parse(userdata.value);
    if(typeof(data.userData.usertype)==='string')
    {
         redirect('/dashboard');
    }
   
    return (

        <div>{children}</div>
        
    )
}
