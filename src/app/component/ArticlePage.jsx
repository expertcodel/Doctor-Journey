"use client"
import React, { useEffect } from 'react'
// import articleCards from '../../data/articleCards.json'
import { faCalendar, faComment, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import LazyYoutube from './LazyYoutube.jsx'
import DaysCalculator from './DaysCalculator'
import Breadcrumb from './Breadcrumb.jsx';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
export default function ArticlePage({ articledetail, articleList }) {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
        setCurrentUrl(window.location.href);
        }
    }, []);


    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title={articledetail?.articleTitle} />

            {/* article Details*/}
            <section className="sptb">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12">
                            {/*articalDetails*/}
                            <div className="card articalDetails">
                                <div className="card-body">
                                    <div className="item7-card-img">
                                        <Image src={articledetail?.thumbnailImage} alt={articledetail?.articleTitle} fill unoptimized />


                                        <div className="item7-card-text">
                                            <span className="badge bg-pink">{articledetail?.articleTitle}</span>
                                        </div>
                                    </div>
                                    <div className="item7-card-desc d-flex mb-2 mt-3">
                                        <span className='me-2'>
                                            <FontAwesomeIcon icon={faCalendar} /> {articledetail.publishedDate}
                                        </span>
                                        <span className='me-2'>
                                            <FontAwesomeIcon icon={faUser} /> {articledetail?.articleTitle}
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
                                            <span className="me-0 viewIcon">
                                                <FontAwesomeIcon icon={faEye} />{articledetail?.views}
                                            </span>
                                        </div>
                                    </div>
                                    <h2 className="font-weight-semibold">
                                        {articledetail?.articleTitle}
                                    </h2>
                                    {/* {
                                        article.description.map((item, idx) => (
                                            <p key={idx}>
                                                {item}
                                            </p>
                                        ))
                                    } */}

                                    <p dangerouslySetInnerHTML={{ __html: articledetail?.Introduction }}>

                                    </p>
                                </div>
                            </div>
                        </div>

                        {/*Rightside Content*/}
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card interviewCard">
                                <div className="card-header">
                                    <h3 className="card-title">Read Next Articles</h3>
                                </div>
                                {
                                    articleList.map((item, index) => (
                                        <div key={index} className="card-body">
                                            <Link href={`/articles/${item.articleId}`} />
                                            <div className="interviewCardBody">
                                                <figure>
                                                    <Image src={item.thumbnailImage} alt={item.articleTitle} width={96} height={80} unoptimized />

                                                </figure>
                                                <div className="interviewCardDetails">
                                                    <h5>
                                                        {item.articleTitle}
                                                    </h5>
                                                    <p>
                                                        {/* <span>{item.views}</span> */}

                                                        <span>{item.publishedDate}</span>
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



            {isOpen && (
                <LazyYoutube
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    articleId={article.articleUrl}
                />
            )}




        </>
    )
}
