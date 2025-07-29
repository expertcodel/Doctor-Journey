import DoctorList from "../../app/component/DoctorList.jsx";
import { headers } from 'next/headers';
export default async function AllDoctorsProfile() {

    let doctorProfile = null;
    let totalItems;
    let total
    let specialization;
    const headerlist=await headers();
    const category=headerlist.get('x-category');

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors/?page=1&name=&category=${category}&sort=select&value=${JSON.stringify([0,100])}&specialization=${JSON.stringify([])}&location=${JSON.stringify([])}`, {

            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            doctorProfile = res.doctorlist;
            totalItems = Math.ceil(res.totalItems / 10);
            specialization=res.specialization;
            total=res.totalItems;
        }


    } catch (error) {

        console.log("fetching failed", error);


    }
    return (
        <>
       { doctorProfile && <DoctorList doctorProfile={doctorProfile} totalItems={totalItems} specialization={specialization} total={total}  category={ category}/>}
       </>
    )
}