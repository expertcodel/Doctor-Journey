import React from 'react'
import ApprovedArticles from '../../../component/ApprovedArticles.jsx';
import { extractUsertype } from '../../../utils/userType.js'
export default async function Page() {


  let articleList=null;
  let totalItems;
  const { usertype, userId } = await extractUsertype();

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/approvedArticle/?page=1&userId=${userId}&usertype=${typeof(usertype)}&name=`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      articleList = res.articlelist;
      totalItems=Math.ceil(res.totalItems/10);
    }
    


  } catch (error) {

    console.log("fetching failed", error);


  }
  return (

    <>
      {
        articleList && <ApprovedArticles articleList={articleList}  totalItems={totalItems} usertype={usertype} userId={userId}/>
      }
    </>

  )
}
