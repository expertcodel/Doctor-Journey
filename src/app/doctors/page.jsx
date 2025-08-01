import VideoList from '../../app/component/VideoList.jsx'
import { headers } from 'next/headers';
export default async function AllDoctors() {


    let doctorCard = null;
    let totalItems;
    let total
    let specialization;
    let departmentlist=[];
    const headerlist=await headers();
    const category=headerlist.get('x-category');
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos/?page=1&name=&category=${category}&sort=select&value=${JSON.stringify([0,100])}&specialization=${JSON.stringify([])}`, {

            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            doctorCard = res.videolist;
            totalItems = Math.ceil(res.totalItems / 9);
            specialization=res.specialization;
            total=res.totalItems;
            departmentlist=res.departmentlist
        }


    } catch (error) {

        console.log("fetching failed", error);


    }



    return (
        <>
            {doctorCard && <VideoList doctorCard={doctorCard} totalItems={totalItems} specialization={specialization} total={total}  category={ category} departmentlist={departmentlist}/>}
        </>
    )
}