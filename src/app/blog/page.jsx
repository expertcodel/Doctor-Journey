import Blog from '../../app/component/Blog.jsx'

export default async function Page() {


    let blogCard = [];
    let totalItems;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/blogs/?page=1&name=`, {

            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            blogCard = res.bloglist;
            totalItems = Math.ceil(res.totalItems / 9);
        }


    } catch (error) {

        console.log("fetching failed", error);


    }



    return (
        <>
            {blogCard && <Blog blogCard={blogCard} totalItems={totalItems}/>}
        </>
    )
}