import CreateJournal from '../../../../component/CreateJournal.jsx'

export default async function Page() {

   let journallist = [];
  
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createJournal/getPublishedjournal?name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      journallist = res.journallist;
    }


  } catch (error) {

    console.log("fetching failed", error);
  }
 

  return (

    <CreateJournal journallist={journallist}/>
  )
}

