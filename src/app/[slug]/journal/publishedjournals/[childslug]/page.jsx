'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Articlelist from '../../../../../component/Articlelist'

function Page() {

    const { slug } = useParams();
    const [journalDetail, setJournaldetail] = useState([]);
    const [loading,setLoading]=useState(false);
    const [articleDetails, setArticledetails] = useState([]);
    useEffect(() => {

        const fetching = async () => {
           // setLoading(true);
            const res = await fetch(`http://localhost:3000/api/loadArticles?journalsId=${slug}`);
            const { response } = await res.json();
            
            setJournaldetail(response[0][0]);
            setArticledetails(response[0]);
            //setLoading(false);
            document.getElementById('editorialDetails').innerHTML = response[0][0].editorialDetails
            document.getElementById('subscription').innerHTML = response[0][0].subscription
            document.getElementById('coverSummary').innerHTML = response[0][0].coverSummary
           

        }
        fetching();

    }, [])

    return (

        <div className="main-content">
            <div className="page-content" >
                {/* { */}
                {/* loading?   */}
                {/* <div className='container-fluid' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div className="spinner-border text-success" role="status">
                <span className="sr-only">Loading...</span>
            </div> </div>:  */}
                <div className="container-fluid">
                    {/* start page title */}
                    {/* <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0"></h4>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <button className='btn btn-danger' onClick={() => setJournalpage(false)}>Back</button>
                                        </li>

                                    </ol>
                                </div>
                            </div>
                        </div>
                        </div> */}
                      {/* end page title */}
                     <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card">
                                <div className="bg-warning-subtle position-relative">
                                    <div className="card-body p-5">
                                        <div className="text-center">
                                            <h3>
                                                {journalDetail.journalTitle}
                                            </h3>
                                            <p className="mb-0 text-muted">Last update:{journalDetail.publishDate} </p>
                                        </div>
                                    </div>
                                    {/* <div className="shape">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            version="1.1"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            xmlns:svgjs="http://svgjs.com/svgjs"
                                            width={1440}
                                            height={60}
                                            preserveAspectRatio="none"
                                            viewBox="0 0 1440 60"
                                        >
                                            <g mask='url("#SvgjsMask1001")' fill="none">
                                                <path
                                                    d="M 0,4 C 144,13 432,48 720,49 C 1008,50 1296,17 1440,9L1440 60L0 60z"
                                                    style={{ fill: "var(--vz-secondary-bg)" }}
                                                />
                                            </g>
                                            <defs>
                                                <mask id="SvgjsMask1001">
                                                    <rect width={1440} height={60} fill="#ffffff" />
                                                </mask>
                                            </defs>
                                        </svg>
                                    </div> */}
                                </div>
                                <div className="card-body p-4">

                                    <div className="d-flex" style={{ backgroundImage: `url(${journalDetail.imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>

                                        <div id='coverSummary' style={{ color: 'gray', fontWeight: '700' }}>{journalDetail.coverSummary}</div>

                                        <div>Volume {journalDetail.volume} | Issue {journalDetail.issue}</div>
                                        <div>{journalDetail.publishDate}</div>


                                    </div>
                                    <div id='editorialDetails' style={{ marginTop: '30px' }}>
                                        {journalDetail.editorialDetails}
                                    </div>

                                    <div id='subscription'>
                                        {journalDetail.subscription}
                                    </div>
                                    <div id='contents' >
                                         <h3>Contents</h3>
                                        {
                                             articleDetails.map((item,i)=><Articlelist key={i} articleDetails={item} idx={i}/>)
                                           
                                        }
                                    </div>
                                    <div className="text-end">
                                        <div className="btn btn-danger">
                                            &#8377;{journalDetail.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* } */}
            </div>
        </div>
    )
}

export default Page