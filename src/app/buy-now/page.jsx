import BuyNow from "../component/BuyNow";

export default async function Page() {

    let countrylist = [];

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/country`, {

            method: 'GET',
            cache: 'no-store'
        })

        const res = await response.json();
        if (res.status) {
            countrylist = res.country;
           
        }

    } catch (error) {

        console.log(error);


    }

    return (
        <BuyNow countrylist={countrylist}/>
    );
}