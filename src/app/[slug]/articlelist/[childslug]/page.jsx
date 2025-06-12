import ArticleUpdate from '../../../../component/ArticleUpdate.jsx'
export default async function Page({ params }) {

  const { childslug } = await params;
  let articleDetail = null;
  let userList=[];
  let Status1;
  let Status;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getArticle`, {

      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ articleId: childslug })
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {

      articleDetail = res.articledetail;
      userList=res.userlist;
      if (res.articledetail.status === true) {
        Status = ('active')
        Status1 = ('active')
      }
      else {
        Status = ('inactive')
        Status1 = ('inactive')
      }


    }


  } catch (error) {

    console.log("fetching failed", error);
  }



  return (

    <>
      {articleDetail && <ArticleUpdate article={articleDetail} Status={Status} Status1={Status1} userList={userList}/>}
    </>
  )
}
