"use client"
import React, { useEffect } from 'react'
// import blogCards from '../../data/blogCards.json'
import { faCalendar, faFileLines  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import LazyYoutube from './LazyYoutube.jsx'
import DaysCalculator from './DaysCalculator'
import Breadcrumb from './Breadcrumb.jsx';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
export default function blogPage({ blogdetail, blogList }) {


    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);



    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title={blogdetail?.blogTitle} />

            {/* blog Details*/}
            <section className="sptb bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12">
                            {/*articalDetails*/}
                            <div className="card articalDetails">
                                <div className="card-body">
                                    <div className="item7-card-img">
                                        <Image src={blogdetail?.blogImage} alt={blogdetail?.blogTitle} fill unoptimized />



                                    </div>
                                    <div className="item7-card-desc d-flex mb-2 mt-3">
                                        <span>
                                            <FontAwesomeIcon icon={faCalendar} />  <DaysCalculator today={new Date().toLocaleDateString()} targetDate={blogdetail.publishedDate} />
                                        </span>
                                        <span className='ms-2'>

                                            <FontAwesomeIcon icon={faFileLines } /> {blogdetail?.blogTitle}
                                        </span>
                                        <div className="ms-auto">
                                            <span className="me-2">
                                                Share:
                                            </span>
                                            <span className="me-2 shareIcon">
                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                                                    target="_blank" className='m-0'
                                                    rel="noopener noreferrer">
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                </a>
                                            </span>
                                            <span className="me-2 shareIcon">
                                                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent("Check this out!")}`}
                                                    target="_blank" className='m-0'
                                                    rel="noopener noreferrer">
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </a>
                                            </span>
                                            <span className="me-2 shareIcon">
                                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                                                    target="_blank" className='m-0'
                                                    rel="noopener noreferrer">
                                                    <FontAwesomeIcon icon={faLinkedin} />
                                                </a>
                                            </span>

                                        </div>
                                    </div>
                                    <h2 className="font-weight-semibold">
                                        {blogdetail?.blogTitle}
                                    </h2>
                                    {/* {
                                        blog.description.map((item, idx) => (
                                            <p key={idx}>
                                                {item}
                                            </p>
                                        ))
                                    } */}

                                    <p dangerouslySetInnerHTML={{ __html: blogdetail?.blogContent }}>

                                    </p>
                                </div>
                            </div>

                            {/* blog profile */}

                        </div>

                        {/*Rightside Content*/}
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card interviewCard">
                                <div className="card-header">
                                    <h3 className="card-title">Read Latest Blog</h3>
                                </div>
                                {
                                    blogList.map((item, index) => (
                                        <div key={index} className="card-body">
                                            <Link href={`/blog${item.blogUrl}`} />
                                            <div className="interviewCardBody">
                                                <figure>
                                                    <Image src={item.blogImage} alt={item.blogTitle} fill unoptimized />

                                                </figure>
                                                <div className="interviewCardDetails">
                                                    <h5>
                                                        {item.blogTitle}
                                                    </h5>
                                                    <p>


                                                        <span><DaysCalculator today={new Date().toLocaleDateString()} targetDate={item.publishedDate} /></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>


                        </div>
                        {/*/Rightside Content*/}
                    </div>
                </div>
            </section>






        </>
    )
}
