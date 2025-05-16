import AuthorUpdate from '../../../../../component/AuthorUpdate'
export default async function Page({params}) {

    const {childslug}=await params;
    console.log(childslug);
    
    let authorDetail=null;

    try {
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/authors/authorByid`, {
  
        method: 'POST',
        cache: 'no-store',
        body:JSON.stringify({authorId:childslug})
      })
  
      if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);
  
      const res = await response.json();
  
      if (res.status) {
        
        authorDetail=res.authordetail;
       
        
      }
  
  
    } catch (error) {
  
      console.log("fetching failed", error);
    }
  


    return (
      
        <>
       {authorDetail && <AuthorUpdate authorDetail={authorDetail}/>}
        </>
    )
}
