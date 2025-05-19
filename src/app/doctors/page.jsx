import VideoList from '@/app/component/VideoList.jsx'

export default async function AllDoctors() {


    let doctorCard = null;
    let totalItems;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos/?page=1&name=`, {

            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            doctorCard = res.videolist;
            totalItems = Math.ceil(res.totalItems / 9);
            
        }


    } catch (error) {

        console.log("fetching failed", error);


    }



    return (
        <>
            {doctorCard && <VideoList doctorCard={doctorCard} totalItems={totalItems}/>}
        </>
    )
}