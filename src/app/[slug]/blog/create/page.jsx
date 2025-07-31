import BlogCreate from '../../../../component/BlogCreate.jsx'
export default async function Page() {

     
    let categorylist = [];
   

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/blogs/category`, {

            method: 'GET',
            cache: 'no-store',
           
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
          categorylist=res.categorylist;
        }


    } catch (error) {
        console.log("fetching failed", error);
    }

   

 return (
        <BlogCreate categorylist={categorylist}/>
    )
}
