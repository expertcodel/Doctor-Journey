
import Regiser from '../component/Register'
export default async function Page() {

  let country = [];

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/country`, {
      method: 'GET',
      cache: 'no-store',
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {

      country = res.country;

    }


  } catch (error) {
    console.log("fetching failed", error);
  }


  return (
    <Regiser  countryList={country} />
  );
}
