import JournalUpdate from '../../../../../component/JournalUpdate.jsx'
export default async function Page({ params }) {

  const { childslug } = await params;
  let journalDetail = null;
 
  let Status1;
  let Status;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getJournal`, {

      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ journalsId: childslug })
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {

      journalDetail = res.journaldetail;
      if (journalDetail.status === true) {
        Status = ('active')
        Status1 = ('active')
      }
      else {
        Status = ('inactive')
        Status1 = ('inactive')
      }


    }


  } catch (error) {

    console.log("fetching failed", error);
  }



  return (

    <>
       <JournalUpdate journalDetail={journalDetail} Status={Status} Status1={Status1} />
    </>
  )
}
