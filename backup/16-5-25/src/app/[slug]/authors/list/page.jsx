import React from 'react'
import AuthorList from '@/component/AuthorList.jsx';
export default async function Page() {


  let authorList=null;
  let totalItems;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/authors/?page=1&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      authorList = res.authorlist;
      totalItems=Math.ceil(res.totalItems/10);
    }


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
        authorList && <AuthorList authorList={authorList}  totalItems={totalItems} />
      }
    </>

  )
}
