import React from 'react'
import OfferUpload from '../../../../../component/OfferUpload.jsx';
export default async function Page() {


  let journalList = [];
  let totalItems;

  // try {

  //   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors/getDoctors`, {

  //     method: 'GET',
  //     cache: 'no-store'
  //   })

  //   if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

  //   const res = await response.json();

  //   if (res.status) {
  //     doctorList = res.doctorlist;
  //     totalItems=Math.ceil(res.totalItems/10);
  //   }


  // } catch (error) {

  //   console.log("fetching failed", error);


  // }
  return (

    <>
      {
        journalList && <OfferUpload journalList={journalList} />
      }
    </>

  )
}
