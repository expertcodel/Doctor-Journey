import React from 'react'
import OfferList from '../../../../../component/OfferList.jsx';
export default async function Page() {


  let offerList=null;
  let totalItems;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/offer/?page=1&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      offerList = res.offerlist;
      totalItems=Math.ceil(res.totalItems/10);
    }


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
        offerList && <OfferList offerList={offerList}  totalItems={totalItems} />
      }
    </>

  )
}
