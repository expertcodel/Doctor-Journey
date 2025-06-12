import React from 'react'
// import JournalList from '../../../../component/JournalList.jsx';
import ApprovedJournals from '../../../../component/ApprovedJournals.jsx'
import { extractUsertype } from '../../../../utils/userType.js'
export default async function Page() {


  let journalLists=null;
  let totalItems;
  const { usertype, userId } = await extractUsertype();

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getJournal/?page=1&userId=${userId}&usertype=${typeof(usertype)}&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      journalLists = res.journallist;
      totalItems=Math.ceil(res.totalItems/10);
    }
    


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
        journalLists && <ApprovedJournals journalLists={journalLists}  totalItems={totalItems} usertype={usertype} userId={userId} />
      }
    </>

  )
}
