"use server"
import { redirect } from 'next/navigation';
import Header from '../../component/Header'
import Menubar from '../../component/Menu.jsx'
import { cookies } from 'next/headers';
import AdminLayout from '../../component/AdminLayout.jsx'
import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
export default async function Layoutchild({ children, params }) {


  const headerlist = headers();
  const pathname = headerlist.get('x-pathname');
  const { slug } = await params;
  if (slug !== 'dashboard') {
    return notFound();
  }
  const data = await cookies().get('userData');
  if (!data) {
    redirect('/login');
  }

  const userData = JSON.parse(data.value).userData;
  let menuItem = [];
  let flag = -1;
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/role/getRole`, {

      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ usertype: userData.usertype })
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {


      menuItem = res.menubar;

      // for (let i = 0; i < menuItem.length; i++) {
      //   if (menuItem[i].path === 'scroll') {
      //     for (let j = 0; j < menuItem[i].child.length; j++) {
      //       if (menuItem[i].child[j].path === pathname) {

      //         flag = 1;
      //         break;

      //       }
      //     }
      //   }
      // }

      // if (flag === -1 && pathname !== '/dashboard') {
      //   flag = 0;
      // }


    }


  } catch (error) {

    console.log("fetching failed", error);


  }

  // if (flag === 0) {
  //   return notFound()
  // }

 return (


    <AdminLayout Children={children} data={menuItem} userData={userData} />



  );
}





