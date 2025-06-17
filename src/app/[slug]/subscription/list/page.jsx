import React from 'react'
import Subscription from '../../../../component/Subscription.jsx';

export default async function Page() {

  let subscriptionList = [];
  let totalItems;
  try {


    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/createSubscription/?page=1&name=`, {
      method: 'GET',
      cache: 'no-store'

    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
    const res = await response.json();
    if (res.status) {
      subscriptionList = res.subscriptionlist;
      totalItems=Math.ceil(res.totalItems/10);
    }


  } catch (error) {

    console.log(`Failed to fetch:${error}`);

  }







  return (

    <>
      { subscriptionList.length > 0 && <Subscription subscriptionList={subscriptionList} totalItems={totalItems}/>}
    </>
      
  
  )
}
