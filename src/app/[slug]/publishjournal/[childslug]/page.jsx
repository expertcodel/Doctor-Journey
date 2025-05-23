"use client"
import React, { useState, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false })
import axios from 'axios'
import Image from 'next/image'


function Page() {


    const { slug } = useParams();
    const [succMessage, setSuccmessage] = useState("");
    const [uploadMessage, setUploadmessage] = useState("");
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageurl] = useState("")
    const [imLoading, setImLoading] = useState(false);
    const [searchedList, setSearchedlist] = useState([]);
    const [articleList, setarticleList] = useState([]);
    const [primaryAuth, setPrimaryauth] = useState(false);
    const [articleId, setArticleid] = useState('');
    const [sarticle, setsarticle] = useState([]);
    const [check, setCheck] = useState([]);

    useEffect(() => {

        const fetching = async () => {

            const option = {

                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/journal/getArticles/?name=`

            }

            const response = await axios.request(option);
            if (response.data.status) {
                setSearchedlist(response.data.response)
            }


        }

        fetching();

    }, [])


    const handleImageupload = async (file) => {

        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('http://localhost:3000/api/superAdmin/uploadFile', {
            method: 'POST',
            body: formData
        })

        // console.log(response);

        //editor?.insertImage('/images/Untitled_design_(1).png');


    }

    const jodit = useRef(null);
    const config = {

        readonly: false,
        toolbar: true,
        uploader: {

            //insertImageAsBase64URI: false,
            // format:'json',
            url: '/api/uploadImage',
            isSuccess: async (response) => {

                console.log(response.files[0].url);
                // editor.insertImage(await response.files[0].url);
                return await response.status;
            },
            // defaultHandlerSuccess:async(response,editor)=>{

            //    // console.log(await response);
            //    await jodit.s.insertImage(response.files[0].url);


            //         // if(await response.status)
            //         // {
            //         //     editor.s.insertImage(await response.files[0].url);
            //         // }
            // },
            // filebrowser:{

            //     process:async(response)=>{

            //         console.log(await response);
            //         return await response


            //     },

            // },



        },
        wordcount: true,
        minHeight: 300
    }




    const publishJournal = async (e) => {

        e.preventDefault();
        const details = Array.from(document.querySelectorAll('.jodit-wysiwyg'));
        let editorialDetails = [];
        details.map((item) => editorialDetails.push(item.innerHTML));
        const option = {

            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/publishJournal`,
            data: {
                volume: e.target.Journalvolume.value.trim(), issue: e.target.Issue.value.trim(), publishDate: e.target.Publishdate.value.trim(), journalsId: slug, imageUrl, editorialDetails, price: e.target.Price.value.trim(), journalTitle: e.target.Journaltitle.value.trim(), check
            }

        }

        setLoading(true);
        const response = await axios.request(option);
        setLoading(false);
        setSuccmessage(response.data.message);


    }

    const uploadImage = async (e) => {

        e.preventDefault();
        const file = document.getElementById('UploadImage').files[0];
        const formdata = new FormData();
        formdata.append('file', file);

        if (file) {

            setImLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/uploadFile`, {
                method: 'POST',
                body: formdata
            })
            const { status, message, imageUrl } = await response.json();
            if (status) {
                setImageurl(imageUrl);
            }
            setUploadmessage(message);
            setImLoading(false);

        }
        else {

            setUploadmessage("Please select image!");
        }
    }

    const searchArticles = async (e) => {

        e.preventDefault();

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/journal/getArticles/?name=${e.target.value}`);
        const response = await res.json();
        if (response.status) {
            setSearchedlist(response.response);
        }





    }


    const addArticles = async (articleId) => {

        let flag = true;
        check.map((item) => {
            if (item === articleId) {
                flag = false

            }
            return item;
        })

        if (flag) {
            setCheck((prev) => [...prev, articleId]);
        }

    }

    const removeItems = (idx) => {

        setCheck((prev) => prev.filter((item, i) => i !== idx));
    }




    return (
        <div className="main-content">
            <div className="page-content">
                {/* <Image src="/images/WhatsApp_Image_2025-01-10_at_4.11.06_PM.jpeg" alt='' width={400} height={400}/> */}
                <form className="row g-3" onSubmit={publishJournal}>

                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Journal Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullnameInput"
                            placeholder="Journal Title"
                            name='Journaltitle'
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Journal Volume
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="fullnameInput"
                            placeholder="Journal Volume"
                            name='Journalvolume'
                        />
                    </div>
                    {
                        //succMessage !== "" && <div>{succMessage}</div>
                        // sarticle.map((item,i)=><div key={i}>{item}</div>)
                    }
                    <div className="col-md-12" >
                        <label htmlFor="inputAddress2" className="form-label">
                            Search articles
                        </label>


                        <div className="form-select" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', height: '40px' }} onClick={() => setPrimaryauth(!primaryAuth)}>
                            {
                                check.map((item, i) => <div key={i} style={{ backgroundColor: '#405189', color: 'white', borderRadius: '5px', padding: '3px', display: 'flex', gap: '0.5rem' }}>{item}
                                    <span><i class="ri-home-line ri-scissors-line" onClick={() => removeItems(i)}></i></span>
                                </div>)
                            }
                        </div>

                        {

                            primaryAuth &&

                            <div className="form-control" style={{ position: 'absolute', zIndex: '99', marginTop: '10px', width: '98.5%' }}>



                                <input type="text" className="form-control" placeholder='Search articles' onChange={searchArticles} />


                                <div className="form-control" style={{ marginTop: '17px', cursor: 'pointer', overflow: 'hidden', border: 'none', height: '180px' }}>

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
                                                        <th scope="col">Id</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Status</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        searchedList.length > 0 &&
                                                        searchedList.map((item, i) =>
                                                            <tr key={i} >
                                                                <td>
                                                                    <div className="form-check">
                                                                        {/* <input
                                                                            className="form-check-input checkbox-input"
                                                                            type="checkbox"
                                                                            //defaultValue="option"
                                                                            id="cardtableCheck01"
                                                                            onClick={()=>setCheck(!check)}
                                                                            checked={check}

                                                                        /> */}
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-success add-btn"
                                                                            // style={{ height: '50px' }}
                                                                            onClick={() => addArticles(item.articleId)}
                                                                        >
                                                                            Add
                                                                        </button>
                                                                        <label className="form-check-label" htmlFor="cardtableCheck01" />
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {item.articleId}
                                                                </td>
                                                                <td>{item.articleTitle.substr(0, 30)} {item.articleTitle.length > 30 && '...'}</td>
                                                                <td>{item.publishedDate}</td>

                                                                <td><span className="badge bg-warning-subtle text-warning">{item.articleStatus}</span>



                                                                </td>

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
                        {
                            //succMessage !== "" && <div>{succMessage}</div>
                            // sarticle.map((item,i)=><div key={i}>{item}</div>)
                        }


                    </div>

                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Issue
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="fullnameInput"
                            placeholder="Issue"
                            name='Issue'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fullPriceInput" className="form-label">
                            Price
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullPriceInput"
                            placeholder="Price"
                            name='Price'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Published Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="fullnameInput"
                            placeholder="Published Date"
                            name='Publishdate'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Upload Cover Image
                        </label>
                        <input className="form-control" type='file' id='UploadImage' />



                    </div>
                    <div className="col-12">
                        <div className="text-end">
                            {

                                !imLoading ?

                                    <button type="button" className="btn btn-primary" onClick={uploadImage}>
                                        Upload
                                    </button> : <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}><div className="spinner-border text-success" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div> </div>}

                            {uploadMessage !== "" && <div>{uploadMessage}</div>}

                        </div>
                    </div>


                    {/* <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            frequency
                        </label>

                        <select name="frequency" id="" className="form-control"
                        >
                            <option value="select" selected>Select</option>
                            <option value="Yearly">Yearly</option>
                            <option value="Yearly">Half Yearly</option>
                            <option value="Quarterly">Quarterly</option>
                            <option value="Monthly">Monthly</option>
                        </select>
                    </div> */}
                    <div className="col-12">
                        <label className="form-label">
                            Cover Summary
                        </label>
                        <JoditEditor config={config} ref={jodit} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">
                            Editorial Details
                        </label>
                        <JoditEditor config={config} />
                    </div>
                    <div className="col-12">
                        <label className="form-label">
                            Subscription
                        </label>
                        <JoditEditor config={config} />
                    </div>

                    <div className="col-12">
                        <div className="text-end">
                            {

                                !loading ?
                                    <button type="submit" className="btn btn-primary" >
                                        Publish
                                    </button> :
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}><div className="spinner-border text-success" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div> </div>


                            }
                            {
                                succMessage !== "" && <div>{succMessage}</div>
                            }
                        </div>
                    </div>
                    {
                        // message !== "" && <div>{message}</div>
                    }
                </form>
            </div>
        </div>

    )
}

export default Page