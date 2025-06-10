import VideoUpdate from '../../../../../../component/VideoUpdate.jsx'
export default async function Page({ params }) {

    const { childslug } = await params;
    let videoDetail = null;
    let Videostatus1;
    let Videostatus;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors/videoByid`, {

            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ videoId: childslug })
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {

            videoDetail = res.videodetail;
            if (res.videodetail.videoStatus === true) {
                Videostatus = ('active')
                Videostatus1 = ('active')
            }
            else {
                Videostatus = ('inactive')
                Videostatus1 = ('inactive')
            }


        }


    } catch (error) {

        console.log("fetching failed", error);
    }



    return (

        <>
            {videoDetail && <VideoUpdate videoDetail={videoDetail} Videostatus={Videostatus} Videostatus1={Videostatus1} />}
        </>
    )
}
