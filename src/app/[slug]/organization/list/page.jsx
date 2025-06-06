import React from 'react'
import OrganizationList from '../../../../component/OrganizationList.jsx';
export default async function Page() {


  let organizationList=null;
  let totalItems;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/organization/?page=1&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      organizationList = res.organizationlist;
      totalItems=Math.ceil(res.totalItems/10);
    }


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
        OrganizationList && <OrganizationList organizationList={organizationList}  totalItems={totalItems} />
      }
    </>

  )
}
