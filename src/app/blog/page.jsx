import Blog from '../../app/component/Blog.jsx'
import { headers } from 'next/headers';
export default async function Page() {


    let blogCard = [];
    let totalItems;
    let total;
    let categorylist = [];
    const headerlist = await headers();
    const category = headerlist.get('x-category');
    
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/blogs/?page=1&name=&sort=select&category=${category}`, {

            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            blogCard = res.bloglist;
            totalItems = Math.ceil(res.totalItems / 9);
            total = res.totalItems;
            categorylist = res.categorylist
        }


    } catch (error) {

        console.log("fetching failed", error);


    }



    return (
        <>
            {blogCard && <Blog blogCard={blogCard} totalItems={totalItems} total={total} categorylist={categorylist} category={category} />}
        </>
    )
}