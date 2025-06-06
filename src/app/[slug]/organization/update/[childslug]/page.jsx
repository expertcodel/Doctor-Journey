import OrganizationUpdate from '../../../../../component/OrganizationUpdate'
export default async function Page({params}) {

    const {childslug}=await params;
    console.log(childslug);
    
    let organizationDetail=null;

    try {
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/organization/organizationByid`, {
  
        method: 'POST',
        cache: 'no-store',
        body:JSON.stringify({organizationId:childslug})
      })
  
      if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
  
      const res = await response.json();
  
      if (res.status) {
        
        organizationDetail=res.organizationdetail;
       
        
      }
  
  
    } catch (error) {
  
      console.log("fetching failed", error);
    }
  


    return (
      
        <>
       {organizationDetail && <OrganizationUpdate organizationDetail={organizationDetail}/>}
        </>
    )
}
