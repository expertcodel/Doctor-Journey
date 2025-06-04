import VideoPage from '../../../app/component/VideoPage.jsx'

export default async function DoctorDetail({ params }) {
    //const doctor = doctorCards.find((d) => d.id === params.id);

    const videoId = await params.id;
    let doctor = null;
    let videoList = [];
    let doctordetail=null;
    let specialization = [];

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos`, {

            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ videoId })
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            doctor = res.videodetail;
            videoList = res.videolist
            doctordetail=res.doctordetail
            specialization=res.specialization
        }


    } catch (error) {

        console.log("fetching failed", error);


    }

  

   

    return (
        <>
            <VideoPage doctordetail={doctordetail} videoList={videoList} doctor={doctor} specialization={specialization}/> 
        </>
    );
}