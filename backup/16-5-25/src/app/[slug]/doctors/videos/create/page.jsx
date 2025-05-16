import React from 'react'
import VideoUpload from '../../../../../component/VideoUpload.jsx';
export default async function Page() {


  let doctorList=null;
  let totalItems;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors/getDoctors`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      doctorList = res.doctorlist;
      totalItems=Math.ceil(res.totalItems/10);
    }


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
        doctorList && <VideoUpload doctorList={doctorList}  totalItems={totalItems} />
      }
    </>

  )
}
