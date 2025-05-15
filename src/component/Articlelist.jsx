"use client"
import React from 'react'
import '../component/css/custom.css'
import { useEffect } from 'react';

function Articlelist({ articleDetails, idx }) {

    

    useEffect(() => {



        document.querySelector(`#abstract${idx}`).innerHTML = articleDetails.Abstract;
        document.querySelector(`#keywords${idx}`).innerHTML = articleDetails.Keywords;
        document.querySelector(`#introduction${idx}`).innerHTML = articleDetails.Introduction;
        document.querySelector(`#methods${idx}`).innerHTML = articleDetails.Methods;
        document.querySelector(`#results${idx}`).innerHTML = articleDetails.Results;
        document.querySelector(`#discussion${idx}`).innerHTML = articleDetails.Discussion;
        if (articleDetails.Conclusion !== "<p><br></p>") {
            document.querySelector(`#conclusion${idx}`).innerHTML = articleDetails.Conclusion;
        }

        document.querySelector(`#references${idx}`).innerHTML = articleDetails.References;

        if (articleDetails.Abbreviations !== "<p><br></p>") {
            document.querySelector(`#abbreviations${idx}`).innerHTML = articleDetails.Abbreviations;
        }
        document.querySelector(`#copyright${idx}`).innerHTML = articleDetails.Copyright;


    }, [])



    return (



        <div className="container-fluid">
            {/* start page title */}
            {/* <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                        <h4 className="mb-sm-0">DOI : {articleDetails?.DOI}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item">
                                    <button className='btn btn-danger' onClick={() => setArticlepage(false)}>Back</button>
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
                                    <h3>{articleDetails?.articleTitle}</h3>
                                    <p className="mb-0 text-muted">Last update: {articleDetails?.publishedDate}</p>
                                </div>
                            </div>
                           
                        </div>
                        
                    </div>
                </div>
            </div>

            <div className="card-body p-4">

                {
                    articleDetails.Abstract !==
                    "<p><br></p>" &&
                    <div className="d-flex" >
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1">
                            <h5>Abstract</h5>
                            <div className="text-muted" id={`abstract${idx}`}>

                            </div>
                        </div>
                    </div>
                }

                {
                    articleDetails.Keywords !==
                    "<p><br></p>" &&
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1">
                            <h5>Keywords</h5>
                            <div className="text-muted" id={`keywords${idx}`}>

                            </div>


                        </div>
                    </div>
                }

                {
                    articleDetails.Introduction !==
                    "<p><br></p>" &&
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1">
                            <h5>Introduction</h5>
                            <div className="text-muted" id={`introduction${idx}`}>

                            </div>


                        </div>
                    </div>
                }
                {
                    articleDetails.Methods !==
                    "<p><br></p>" &&
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1">
                            <h5>Methods</h5>
                            <div className="text-muted" id={`methods${idx}`}>

                            </div>


                        </div>
                    </div>
                }

                {
                    articleDetails.Results !==
                    "<p><br></p>" &&
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1" style={{ imageRendering: { width: '100px', height: '300px' } }}>
                            <h5>Results</h5>
                            <div className="text-muted" id={`results${idx}`}>

                            </div>


                        </div>
                    </div>
                }

                {
                    articleDetails.Discussion !==
                    "<p><br></p>" &&
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1">
                            <h5>Discussion</h5>
                            <div className="text-muted" id={`discussion${idx}`}>

                            </div>


                        </div>
                    </div>
                }

                {
                    articleDetails.Conclusion !==
                    "<p><br></p>" &&
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1">
                            <h5>Conclusion</h5>
                            <div className="text-muted" id={`conclusion${idx}`}>

                            </div>


                        </div>
                    </div>
                }

                {
                    articleDetails.References !==
                    "<p><br></p>" &&
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1">
                            <h5>References</h5>
                            <div className="text-muted" id={`references${idx}`}>

                            </div>


                        </div>
                    </div>
                }

                {
                    articleDetails.Abbreviations !==
                    "<p><br></p>" &&
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1">
                            <h5>Abbreviations</h5>
                            <div className="text-muted" id={`abbreviations${idx}`}>

                            </div>


                        </div>
                    </div>
                }

                {
                    articleDetails.Copyright !==
                    "<p><br></p>" &&
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-check-circle text-success icon-dual-success icon-xs"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div className="flex-grow-1">
                            <h5>Copyright</h5>
                            <div className="text-muted" id={`copyright${idx}`}>

                            </div>


                        </div>
                    </div>
                }



                <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-check-circle text-success icon-dual-success icon-xs"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                    <div className="flex-grow-1">
                        <h5>Article Summary</h5>
                        <p className="text-muted">
                            {articleDetails?.articleSummary}
                        </p>


                    </div>
                </div>
                <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-check-circle text-success icon-dual-success icon-xs"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                    </div>
                    <div className="flex-grow-1">
                        <h5>Remarks</h5>
                        <p className="text-muted">
                            {
                                articleDetails?.remarks
                            }
                        </p>

                    </div>
                </div>
                {/* <div className="text-end">
    <div className="btn btn-danger">
        &#8377;{articleDetails.price}
    </div>
</div> */}
            </div>
        </div>



    )
}

export default Articlelist