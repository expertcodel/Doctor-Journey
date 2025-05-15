import DoctorUpdate from '../../../../../component/DoctorUpdate'
export default async function Page({params}) {

    const {childslug}=await params;
    console.log(childslug);
    
    let doctorDetail=null;

    try {
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors/doctorByid`, {
  
        method: 'POST',
        cache: 'no-store',
        body:JSON.stringify({doctorId:childslug})
      })
  
      if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
  
      const res = await response.json();
  
      if (res.status) {
        
        doctorDetail=res.doctordetail;
       
        
      }
  
  
    } catch (error) {
  
      console.log("fetching failed", error);
    }
  


    return (
      
        <>
       {doctorDetail && <DoctorUpdate doctorDetail={doctorDetail}/>}
        </>
    )
}
