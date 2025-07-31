import BlogPage from '../../../app/component/BlogPage.jsx'

export default async function Page({ params }) {
    //const blog = blogCards.find((d) => d.id === params.id);

    const blogUrl = await params.slug;
  
    let blogList = [];
    let blogdetail=null;
    let categorylist
    
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/blogs/singleBlog`, {

            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ blogUrl:`/${blogUrl}` })
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
           
            blogList = res.bloglist
            blogdetail=res.blogdetail
            categorylist=res.categorylist
            
        }


    } catch (error) {

        console.log("fetching failed", error);


    }

  

   

    return (
        <>
            <BlogPage blogdetail={blogdetail} blogList={blogList} categorylist={categorylist}/> 
        </>
    );
}