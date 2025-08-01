import Profile from '../../component/Profile.jsx'
export default async function Page() {

    let departmentlist = [];
    let countrylist=[];

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors/department`, {

            method: 'GET',
            cache: 'no-store',
           
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
          departmentlist=res.departmentlist;
          countrylist=res.countrylist
        }


    } catch (error) {
        console.log("fetching failed", error);
    }

    

    return (
       <Profile  departmentlist={departmentlist} countrylist={countrylist}/>
    )
}