import React from 'react'
import VideoUpload from '../../../../../component/VideoUpload.jsx';
import { extractUsertype } from '../../../../../utils/userType.js'
export default async function Page() {


  let doctorList = null;
  let doctorDetail = null;
  let totalItems;
  const { usertype, userId } = await extractUsertype();

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors/getDoctors/?userId=${userId}&usertype=${typeof (usertype)}`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      if (typeof (usertype) === 'string') {

        doctorList = res.doctorlist;
        totalItems = Math.ceil(res.totalItems / 10);
      }
      else {

        doctorDetail=res.doctordetail;

      }

    }


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
         <VideoUpload doctorList={doctorList} totalItems={totalItems} doctorDetail={doctorDetail}/>
      }
    </>

  )
}
