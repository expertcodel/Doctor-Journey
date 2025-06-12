"use client"
import dynamic from 'next/dynamic';
//const Editor = dynamic(() => import('../../../../component/Editor.jsx'), { ssr: false })
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation';
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });



function ArticleUpdate({article,Status,Status1,userList}) {


    const router = useRouter();
    const [primaryAuth, setPrimaryauth] = useState(false);
    const [primaryAuthlist, setPrimaryauthList] = useState([]);
    const [primaryAuthname, setPrimaryauthName] = useState("");
    const [status, setStatus] = useState(Status);
    const [status1, setStatus1] = useState(Status1);
    const [secondaryAuth, setSecondaryauth] = useState(false);
    const [secondaryAuthlist, setSecondaryauthList] = useState([]);
    const [secondaryAuthname, setSecondaryauthName] = useState("");
    const [searchedList, setSearchedlist] = useState(userList);
    const [check, setCheck] = useState(article.articleAuthor);
    const [searchedList1, setSearchedlist1] = useState(userList);
    const [check1, setCheck1] = useState(article.articleAuthor);
    //const [content1, setContent1] = useState('');


    const config = useMemo(() => {
        return {
            readonly: false,
            toolbar: true,
            minHeight: 400,
            spellcheck: true,
            placeholder: 'Type something here...',
            uploader: {
                insertImageAsBase64URI: true
            }
        }
    }, []);


    // useEffect(()=>{

    //   if(refEditor.current)
    //   {
    //     console.log(refEditor.current,refEditor.current.value);
    //     //refEditor.current.focus();
    //    // refEditor.current.editor.focus();
    //   }

    // },[abstract])
    const [content, setContent] = useState({ Abstract: article.Abstract, Keywords: article.Keywords, Introduction: article.Introduction, Methods: article.Methods, Results: article.Results, Discussion: article.Discussion, Conclusion: article.Conclusion, References: article.References, Abbreviations: article.Abbreviations, Copyright: article.Copyright })

    // const [content, setContent] = useState({ "Abstract": "", "Keywords": "", "Introduction": "", "Methods": "", "Results": "", "Discussion": "", "Conclusion": "", "References": "", "Abbreviations": "", "Copyright": "" })
    // const [editor, setEditor] = useState(["Abstract", "Keywords", "Introduction", "Methods", "Results", "Discussion", "Conclusion", "References", "Abbreviations", "Copyright"])

    const [data, setData] = useState({
        Title: article.articleTitle, Price: article.price, DOI: article.DOI,
        Summary: article.articleSummary, Remarks: article.remarks, Date: article.publishedDate
    });

    // const [editor, setEditor] = useState([{ text: 'Abstract', open: true }, { text: 'Keywords', open: false }, { text: 'Introduction', open: false }, { text: 'Methods', open: false }, { text: 'Results', open: false }, { text: 'Discussion', open: false }, { text: 'Conclusion', open: false }, { text: 'References', open: false }, { text: 'Abbreviations', open: false }, { text: 'Copyright', open: false }]);


    const params = useParams();
    const { childslug } = params
    // useEffect(() => {

    //     const getArticle = async () => {

    //         const option = {

    //             method: 'POST',
    //             url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getArticle`,
    //             data: {
    //                 articleId: childslug
    //             }

    //         }

    //         const response = await axios.request(option);

    //         // setData({
    //         //     Title: article.articleTitle, Price: String(article.price), DOI: article.DOI,
    //         //     Summary: article.articleSummary, Remarks: article.remarks, Date: article.publishedDate
    //         // })
    //         // setPrimaryauthList(article.articleAuthor.primary);
    //         // setSecondaryauthList(article.articleAuthor.secondary);

    //         setContent({ Abstract: article.Abstract, Keywords: article.Keywords, Introduction: article.Introduction, Methods: article.Methods, Results: article.Results, Discussion: article.Discussion, Conclusion: article.Conclusion, References: article.References, Abbreviations: article.Abbreviations, Copyright: article.Copyright })

    //     }

    //     getArticle();

    // }, [])

    const handleChange = (e) => {

        const { name, value } = e.target;
        const articledata = { ...data };
        articledata[name] = value;
        setData(articledata);

    }

    async function handleSubmit(e) {

        e.preventDefault();
        let arr = [];
        const value = document.querySelectorAll('.jodit-wysiwyg');
        const contentList = Array.from(value);
        contentList.map((item) => arr.push(item.innerHTML))

        let status;
        if (Status1 === 'active') {
            status = true;
        }
        else {
            status = false;
        }




        const option =
        {
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/updateArticle`,
            data:
            {

                articleId: childslug,
                articleTitle: data.Title,
                contentList: arr,
                articleSummary: data.Summary,
                DOI: data.DOI,
                price: data.Price,
                remarks: data.Remarks,
                primaryAuthor: check,
                secondaryAuthor: check1,
                status
            }
        }


        const response = await axios.request(option);
        if (response.data.status) {

            sessionStorage.setItem('successMsg', 'Article Updated Successfully');
            router.push("/dashboard/articlelist");

        }


    }

    const handleList = () => {

        setPrimaryauthList((prev) => [...prev, primaryAuthname]);
        setPrimaryauth(false);

    }



    const handleList1 = () => {

        setSecondaryauthList((prev) => [...prev, secondaryAuthname]);
        setSecondaryauth(false);

    }





    const removeItems = (idx) => {

        setCheck((prev) => prev.filter((_, i) => i !== idx));
    }



    const removeItems1 = (idx) => {

        setCheck1((prev) => prev.filter((_, i) => i !== idx));
    }



    const searchArticles = async (e) => {

        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUsers/?name=${e.target.value}`, { method: 'GET' });
        const response = await res.json();
        if (response.status) {
            setSearchedlist(response.userlist);
        }





    }

    const searchArticles1 = async (e) => {

        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUsers/?name=${e.target.value}`, { method: 'GET' });
        const response = await res.json();
        if (response.status) {
            setSearchedlist1(response.userlist);
        }





    }

    const addArticles = async (authorId) => {

        let flag = true;
        check.map((item) => {
            if (item.userId === authorId) {
                flag = false

            }
            return item;
        })

        if (flag) {
            setCheck((prev) => [...prev, { userId: authorId }]);
        }

    }


    const addArticles1 = async (authorId) => {

        let flag = true;
        check1.map((item) => {
            if (item.userId === authorId) {
                flag = false

            }
            return item;
        })

        if (flag) {
            setCheck1((prev) => [...prev, { userId: authorId }]);
        }

    }






    return (
        <div className="main-content">
            <div className="page-content">



                <form onSubmit={handleSubmit} className="row g-3">

                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullnameInput"
                            placeholder="Title"
                            name='Title'
                            value={data.Title}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="Price" className="form-label">
                            Price
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="Price"
                            name='Price'
                            value={data.Price}
                            onChange={(e) => handleChange(e)}
                            placeholder="Price"
                        />
                    </div>




                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            abstract
                        </label>

                        <JoditEditor
                            // ref={refEditor}
                            value={content.Abstract}
                            config={config}
                        //id='gf'
                        // onChange={(value) => setAbstract(value)}
                        />
                    </div>

                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            keywords
                        </label>

                        <JoditEditor value={content.Keywords}
                            config={config}
                        // onChange={(value) => setKeywords(value)}
                        />
                    </div>

                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            introduction
                        </label>

                        <JoditEditor value={content.Introduction}
                            config={config}
                        // onChange={(value) => setIntroduction(value)}
                        />
                    </div>

                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            methods
                        </label>

                        <JoditEditor value={content.Methods}
                            config={config}
                        //onChange={(value) => setMethods(value)}
                        />
                    </div>

                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            results
                        </label>

                        <JoditEditor value={content.Results}
                            config={config}
                        //onChange={(value) => setResults(value)}
                        />
                    </div>

                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            discussion
                        </label>

                        <JoditEditor value={content.Discussion}
                            config={config}
                        // onChange={(value) => setDiscussion(value)}
                        />
                    </div>

                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            conclusion
                        </label>

                        <JoditEditor value={content.Conclusion}
                            config={config}
                        // onChange={(value) => setConclusion(value)}
                        />
                    </div>

                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            references
                        </label>

                        <JoditEditor value={content.References}
                            config={config}
                        //onChange={(value) => setReferences(value)}
                        />
                    </div>

                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            abbreviations
                        </label>

                        <JoditEditor value={content.Abbreviations}
                            config={config}
                        //onChange={(value) => setAbbreviations(value)}
                        />
                    </div>

                    <div className="col-12" >
                        <label htmlFor="inputAddress" className="form-label" style={{ cursor: 'pointer' }}>
                            copyright
                        </label>

                        <JoditEditor value={content.Copyright}
                            config={config}
                        // onChange={(value) => setCopyright(value)}
                        />
                    </div>




                    <div className="col-md-4">
                        <label htmlFor="DOI" className="form-label">
                            DOI
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="DOI"
                            placeholder="DOI"
                            name='DOI'
                            value={data.DOI}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="Date" className="form-label">
                            Date
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="Date"
                            placeholder="Date"
                            value={data.Date}
                            name='Date'
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="Date" className="form-label">
                            Status
                        </label>

                        <select className="form-select" onChange={(e) => setStatus1(e.target.value)}  >
                            <option value={status === 'active' ? 'active' : 'inactive'} >{status === 'active' ? 'active' : 'inactive'}</option>
                            <option value={status === 'active' ? 'inactive' : 'active'} >{status === 'active' ? 'inactive' : 'active'}</option>
                        </select>

                    </div>
                  

                    <div className="col-md-6" >
                        <label htmlFor="inputAddress2" className="form-label">
                            Primary author
                        </label>


                        <div className="form-select" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', height: '40px' }} onClick={() => setPrimaryauth(!primaryAuth)}>
                            {
                                check.map((item, i) => <div key={i} style={{ backgroundColor: '#405189', color: 'white', borderRadius: '5px', padding: '3px', display: 'flex', gap: '0.5rem' }}>{item.userId}
                                    <span><i class="ri-home-line ri-scissors-line" onClick={() => removeItems(i)}></i></span>
                                </div>)
                            }
                        </div>

                        {

                            primaryAuth &&

                            <div className="form-control" style={{ position: 'absolute', zIndex: '99', marginTop: '10px', width: '98.5%', overflow: 'auto' }}>



                                <input type="text" className="form-control" placeholder='Search articles' onChange={searchArticles} />


                                <div className="form-control" style={{ marginTop: '17px', cursor: 'pointer', border: 'none', height: '180px' }}>

                                    {



                                        <div className="table-responsive table-card">
                                            <table className="table table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="cardtableCheck"
                                                                />
                                                                <label className="form-check-label" htmlFor="cardtableCheck" />
                                                            </div>
                                                        </th>
                                                        <th scope="col">User Id</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Usertype</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        searchedList.length > 0 &&
                                                        searchedList.map((item, i) =>
                                                            <tr key={i} >
                                                                <td>
                                                                    <div className="form-check">

                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-success add-btn"
                                                                            style={{ height: '50px' }}
                                                                            onClick={() => addArticles(item.userId)}
                                                                        >
                                                                            Add
                                                                        </button>
                                                                        <label className="form-check-label" htmlFor="cardtableCheck01" />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {item.userId}
                                                                </td>
                                                                <td>{item.name.substr(0, 30)} {item.name.length > 30 && '...'}</td>
                                                                <td>{item.usertype}</td>


                                                            </tr>

                                                        )
                                                    }

                                                </tbody>
                                            </table>
                                        </div>





                                    }
                                </div>



                            </div>

                        }


                    </div>

                    <div className="col-md-6" >
                        <label htmlFor="inputAddress2" className="form-label">
                            Secondary author
                        </label>


                        <div className="form-select" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', height: '40px' }} onClick={() => setSecondaryauth(!secondaryAuth)}>
                            {
                                check1.map((item, i) => <div key={i} style={{ backgroundColor: '#405189', color: 'white', borderRadius: '5px', padding: '3px', display: 'flex', gap: '0.5rem' }}>{item.userId}
                                    <span><i class="ri-home-line ri-scissors-line" onClick={() => removeItems1(i)}></i></span>
                                </div>)
                            }
                        </div>

                        {

                            secondaryAuth &&

                            <div className="form-control" style={{ position: 'absolute', zIndex: '99', marginTop: '10px', width: '98.5%', overflow: 'auto' }}>



                                <input type="text" className="form-control" placeholder='Search articles' onChange={searchArticles1} />


                                <div className="form-control" style={{ marginTop: '17px', cursor: 'pointer', border: 'none', height: '180px' }}>

                                    {



                                        <div className="table-responsive table-card">
                                            <table className="table table-nowrap mb-0">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th scope="col">
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue=""
                                                                    id="cardtableCheck"
                                                                />
                                                                <label className="form-check-label" htmlFor="cardtableCheck" />
                                                            </div>
                                                        </th>
                                                        <th scope="col">User Id</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Usertype</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        searchedList1.length > 0 &&
                                                        searchedList1.map((item, i) =>
                                                            <tr key={i} >
                                                                <td>
                                                                    <div className="form-check">

                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-success add-btn"
                                                                            style={{ height: '50px' }}
                                                                            onClick={() => addArticles1(item.userId)}
                                                                        >
                                                                            Add
                                                                        </button>
                                                                        <label className="form-check-label" htmlFor="cardtableCheck01" />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {item.userId}
                                                                </td>
                                                                <td>{item.name.substr(0, 30)} {item.name.length > 30 && '...'}</td>
                                                                <td>{item.usertype}</td>


                                                            </tr>

                                                        )
                                                    }

                                                </tbody>
                                            </table>
                                        </div>





                                    }
                                </div>



                            </div>

                        }


                    </div>




                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">
                            Summary
                        </label>
                        <textarea
                            name='Summary'
                            className="form-control"
                            rows={5}
                            placeholder="Summary"
                            value={data.Summary}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div className="col-12">
                        <label htmlFor="inputAddress2" className="form-label">
                            Remarks
                        </label>
                        <textarea
                            name='Remarks'
                            className="form-control"
                            rows={5}
                            placeholder="Remarks"
                            value={data.Remarks}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div className="col-12">
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary" >
                                Submit
                            </button>
                        </div>
                    </div>

                </form>



            </div>
        </div>
    )
}

export default ArticleUpdate