"use client"
import React from 'react'
// import doctorCards from '../../data/doctorCards.json'
import { faCalendar, faComment, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import LazyYoutube from './LazyYoutube.jsx'
import DaysCalculator from './DaysCalculator'
export default function VideoPage({ doctordetail, videoList, doctor,specialization }) {

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
   
    
    return (
        <>
            {/*Breadcrumb*/}
            <section>
                <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
                    <div className="header-text mb-0">
                        <div className="container">
                            <div className="text-center text-white">
                                <h1 className="">{doctor?.videoTitle}</h1>
                                <ol className="breadcrumb text-center">
                                    <li className="breadcrumb-item">
                                        <Link href="/doctors">Doctors</Link>
                                    </li>
                                    <li className="breadcrumb-item active text-white" aria-current="page">
                                        {doctor?.videoTitle}
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Breadcrumb*/}

            {/* Doctor Details*/}
            <section className="sptb">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12">
                            {/*articalDetails*/}
                            <div className="card articalDetails">
                                <div className="card-body">
                                    <div className="item7-card-img">
                                        <Image src={doctor?.thumbnailImage} alt={doctor?.videoTitle} width={786} height={485} unoptimized />
                                        <div className="play-button" onClick={openModal}>
                                            <span className="triangle"></span>

                                        </div>

                                        <div className="item7-card-text">
                                            <span className="badge bg-pink">{doctor?.videoTitle}</span>
                                        </div>
                                    </div>
                                    <div className="item7-card-desc d-flex mb-2 mt-3">
                                        <span>
                                            <FontAwesomeIcon icon={faCalendar} />  <DaysCalculator today={new Date().toLocaleDateString()} targetDate={doctor.publishedDate}/>
                                        </span>
                                        <span>
                                            <FontAwesomeIcon icon={faUser} /> {doctor?.doctorName}
                                        </span>
                                        <div className="ms-auto">
                                            <span className="me-0">
                                                <FontAwesomeIcon icon={faEye} />{doctor?.views}
                                            </span>
                                        </div>
                                    </div>
                                    <h2 className="font-weight-semibold">
                                        {doctor?.videoTitle}
                                    </h2>
                                    {/* {
                                        doctor.description.map((item, idx) => (
                                            <p key={idx}>
                                                {item}
                                            </p>
                                        ))
                                    } */}

                                    <p dangerouslySetInnerHTML={{ __html: doctor?.videoContent }}>

                                    </p>
                                </div>
                            </div>

                            {/* doctor profile */}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">About the speaker</h3>
                                </div>
                                <div className="card-body drProfileDesc p-0">
                                    <div className="card mb-0">
                                        <div className="card-body">
                                            <div className="cat-item">
                                                <Link href={`/doctor-profile/${doctordetail?.doctorId}`} />
                                                <div className="cat-img bg-primary-transparent brround">
                                                    <Image src={doctordetail?.profileImage} className="img-fluid" width={155} height={80} alt="img" unoptimized />
                                                </div>
                                                <div className="cat-desc">
                                                    <h5>
                                                        {doctordetail?.doctorName} <span>{doctordetail?.qualification}</span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="cat-item">
                                                <Link href={`/doctor-profile/${doctordetail?.doctorId}`} />
                                                <div className="cat-desc">
                                                    <p>
                                                        {doctordetail?.shortDescription}
                                                    </p>
                                                    <small className="badge">
                                                        See Speaker Profile
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Rightside Content*/}
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card interviewCard">
                                <div className="card-header">
                                    <h3 className="card-title">Watch Next Interview</h3>
                                </div>
                                {
                                    videoList.map((item, index) => (
                                        <div key={index} className="card-body">
                                            <Link href={`/doctors/${item.videoId}`} />
                                            <div className="interviewCardBody">
                                                <figure>
                                                    <Image src={item.thumbnailImage} alt={item.videoTitle} width={96} height={80} unoptimized />
                                                    <div className="play-button">
                                                        <span className="triangle"></span>
                                                    </div>
                                                </figure>
                                                <div className="interviewCardDetails">
                                                    <h5>
                                                        {item.videoTitle}
                                                    </h5>
                                                    <p>
                                                        <span>{item.views}</span>

                                                        <span><DaysCalculator today={new Date().toLocaleDateString()} targetDate={item.publishedDate}/></span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Specialization</h3>
                                </div>
                                <div className="card-body p-0">
                                    <div className="list-catergory">
                                        <div className="item-list">
                                            <ul className="list-group mb-0 customSpecialization">
                                                {
                                                    specialization[0].map((item, id) => (
                                                        <li key={id} className="list-group-item">
                                                            <Link href="/" className="text-dark">
                                                                <span className="specializationIcon">
                                                                    <Image src="/images/doctor-profile/profile-1.jpg" className="img-fluid" width={155} height={80} alt="img" />
                                                                </span> {item.specialization}
                                                                <span className="badgetext badge rounded-pill bg-light mb-0 mt-1">
                                                                    {item.count}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
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
                    videoId={doctor.videoUrl}
                />
            )}




        </>
    )
}
