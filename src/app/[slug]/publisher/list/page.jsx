import React from 'react'
import PublisherList from '../../../../component/PublisherList.jsx';
export default async function Page() {


  let publisherList=null;
  let totalItems;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/publisher/?page=1&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      publisherList = res.publisherlist;
      totalItems=Math.ceil(res.totalItems/10);
    }


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
        publisherList && <PublisherList publisherList={publisherList}  totalItems={totalItems} />
      }
    </>

  )
}
