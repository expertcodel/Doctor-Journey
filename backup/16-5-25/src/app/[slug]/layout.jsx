"use server"
import { redirect } from 'next/navigation';
import Header from '../../component/Header'
import Menubar from '../../component/Menu.jsx'
import { cookies } from 'next/headers';
import AdminLayout from '@/component/AdminLayout.jsx'
export default async function Layoutchild({ children }) {


  const data = await cookies().get('userData');
  if (!data) {
    redirect('/login');
  }

  const userData = JSON.parse(data.value).userData;

  let menuItem = [];

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


    }


  } catch (error) {

    console.log("fetching failed", error);


  }



  // const menuItem = JSON.parse(data.value).menubar;

  console.log(userData);

  // const menuItem={}
  // const userData ={}


  return (


    <AdminLayout Children={children} data={menuItem} userData={userData} />

    // <div id="layout-wrapper">
    //   <Header userData={userData} />
    //   <Menubar data={menuItem} />
    //   {children}
    // </div>







  );
}





