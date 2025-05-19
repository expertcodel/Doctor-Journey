import DoctorList from "@/app/component/DoctorList.jsx";

export default async function AllDoctorsProfile() {

    let doctorProfile = null;
    let totalItems;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors/?page=1&name=`, {

            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            doctorProfile = res.doctorlist;
            totalItems = Math.ceil(res.totalItems / 10);
        }


    } catch (error) {

        console.log("fetching failed", error);


    }
    return (
        <>
       { doctorProfile && <DoctorList doctorProfile={doctorProfile} totalItems={totalItems}/>}
       </>
    )
}