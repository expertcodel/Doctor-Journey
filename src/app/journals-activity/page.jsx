
import JournalActivity from '../component/JournalActivity.jsx'
export default async function JournalsActivities() {

    let totalItems;
    let journalList = null;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/journal/journals-list/?page=1&name=`, {

            method: 'GET',
            cache: 'no-store',

        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {

            totalItems = Math.ceil(res.totalItems/9);
            journalList = res.journallist
          
        }


    } catch (error) {

        console.log("fetching failed", error);


    }

    return (

        <>{
            journalList && <JournalActivity journalCard={journalList} totalItems={totalItems}/>
        }</>

    );
}