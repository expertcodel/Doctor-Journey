import PublisherUpdate from '../../../../../component/PublisherUpdate'
export default async function Page({params}) {

    const {childslug}=await params;
   
    let publisherDetail=null;

    try {
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/publisher/publisherByid`, {
  
        method: 'POST',
        cache: 'no-store',
        body:JSON.stringify({publisherId:childslug})
      })
  
      if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
  
      const res = await response.json();
  
      if (res.status) {
        
        publisherDetail=res.publisherdetail;
       
        
      }
  
  
    } catch (error) {
  
      console.log("fetching failed", error);
    }
  


    return (
      
        <>
       {publisherDetail && <PublisherUpdate publisherDetail={publisherDetail}/>}
        </>
    )
}
