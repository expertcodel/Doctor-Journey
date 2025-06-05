import React from 'react'
import VideoList from '../../../../../component/VideoList.jsx';
import { extractUsertype } from '../../../../../utils/userType.js'
export default async function Page() {


  let videoList = null;
  let totalItems;
  const { usertype, userId } = await extractUsertype();
  try {

    let response;

    response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors/uploadVideo/?page=1&userId=${userId}&usertype=${usertype}&name=`, {

      method: 'GET',
      cache: 'no-store'
    })



    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      videoList = res.videolist;
      totalItems = Math.ceil(res.totalItems / 10);
    }


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
        videoList && <VideoList videoList={videoList} totalItems={totalItems} />
      }
    </>

  )
}
