import Publisharticle from '../../../../component/PublishJournal.jsx'

export default async function Page() {

    let articlelist = [];
    let userslist = [];

    try {

        const url1 = `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/journal/getArticles/?name=`;
        const url2 = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUsers/?name=`;

        const [response1, response2] = await Promise.all([
            fetch(url1, { method: 'GET', cache: 'no-store' }),
            fetch(url2, { method: 'GET', cache: 'no-store' }),
        ]);

        if (!response1.ok) throw new Error(`Failed to fetch url1: ${response1.status}`);
        if (!response2.ok) throw new Error(`Failed to fetch url2: ${response2.status}`);

        const [res1, res2] = await Promise.all([response1.json(), response2.json()]);




        if (res1.status) {
            articlelist = res1.response;
        }

        if (res2.status) {
            userslist = res2.userlist;
        }
        console.log(articlelist,userslist);
        


    } catch (error) {

        console.log("fetching failed", error);
    }


    return (

        <Publisharticle articlelist={articlelist} userslist={userslist} />
    )
}

