import React from 'react'
//import OfferUpdate from '/component/OfferUpdate';
import OfferUpdate from '../../../../../../component/OfferUpdate.jsx';

export default async function Page({ params }) {

  const { childslug } = await params;


  let offerDetail = {};

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/offer/offerByid`, {

      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ offerId: childslug })
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      offerDetail = res.offerdetail;
    }


  } catch (error) {

    console.log("fetching failed", error);


  }

  return (
    <>
      {
        offerDetail && <OfferUpdate offerDetail={offerDetail} />
      }
    </>
  )
}
