"use server"
import CreateArticle from '../../../component/CreateArticle.jsx'
export default async function Page() {


  let userList=[]
  try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUsers/?name=`, {

            method: 'GET',
            cache: 'no-store',
         
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
           userList=res.userlist;
        }


    } catch (error) {
        console.log("fetching failed", error);
    }




  return (
    <CreateArticle userList={userList} />
  )
}

