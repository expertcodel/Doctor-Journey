
import ArticlePage from "../../component/ArticlePage";


export default async function ArticleDetail({ params }) {


    const { id } = await params;
   
    let articleList=[];
    let articleDetail=[];
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/articles`, {

            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ articleId: id })
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            articleDetail = res.articledetail;
            articleList=res.articlelist;
           
        }


    } catch (error) {

        console.log("fetching failed", error);


    }

    return (
       <ArticlePage articleList={articleList} articledetail={articleDetail}/>
    );
}