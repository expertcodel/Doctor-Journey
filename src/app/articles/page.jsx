import ArticleList from '../../app/component/ArticleList.jsx'

export default async function AllArticles() {


    let articleCard = null;
    let totalItems;

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/articles/?page=1&name=`, {

            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            articleCard = res.articlelist;
            totalItems = Math.ceil(res.totalItems / 9);
            
        }


    } catch (error) {

        console.log("fetching failed", error);


    }



    return (
        <>
            {articleCard && <ArticleList articleCard={articleCard} totalItems={totalItems}/>}
        </>
    )
}