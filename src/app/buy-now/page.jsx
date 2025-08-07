import { redirect } from "next/navigation";
import BuyNow from "../component/BuyNow";
import { headers } from 'next/headers';

export default async function Page() {

    let countrylist = [];
    let journaldata = [];
    const headerlist=await headers();
    const id=headerlist.get('x-id');

    // try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/country?id=${id}`, {

            method: 'GET',
            cache: 'no-store'
        })

        const res = await response.json();
        if (res.status) {
            countrylist = res.country;
            journaldata=res.journaldata;
        }
        // else{

        //     redirect('/journals');
        // }

    // } catch (error) {

    //     console.log(error);


    // }

    return (
        <BuyNow countrylist={countrylist} journaldata={journaldata}/>
    );
}