"use client"
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../../app/component/Breadcrumb";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faEuro, faEuroSign, faStar } from "@fortawesome/free-solid-svg-icons";
import Select2Component from "../../app/component/Select2Component";
import ThumbnailSearchCarousel from "../../app/component/ThumbnailSearchCarousel";
import ThumbnailSponsorCarousel from "../../app/component/ThumbnailSponsorCarousel";
import ThumbnailBlogsCarousel from "../../app/component/ThumbnailBlogsCarousel";
import TestimonialsCarousel from "../../app/component/Testimonials";
import JournalsThumbCarousel from "../component/JournalsThumbCarousel";
//  import doctorProfile from "@/data/doctorProfile.json";

export default function JournalActivity({ journalCard, totalItems }) {




    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [journalList, setjournalList] = useState(journalCard);
    const [name, setName] = useState("");
    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/journal/journals-list/?page=${idx}&name=${name}`);
        setName(name);

        const res = await response.json();
        if (res.status) {
            setjournalList(res.journallist);
            setButton(Math.ceil(res.totalItems / 9));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/journal/journals-list/?page=${idx}&name=${name}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setjournalList(res.journallist);
                setButton(Math.ceil(res.totalItems / 9));
            }

        }


    }




    return (
        <section>
            {/*Breadcrumb*/}
            {/* <Breadcrumb title="Journals Activities" /> */}

            <section className="cover-image sptb-1 bg-background2"
                data-image-src="../assets/images/banners/banner1.jpg">
                <div className="header-text1 mb-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                                <div className="text-center text-white ">
                                    <h1 className="mb-5">
                                        Search Your favourite journals
                                    </h1>
                                </div>
                                <div className="search-background bg-transparent">
                                    <div className="form row no-gutters ">
                                        <div className="col-xl-4 col-lg-3 col-md-12 mb-0 bg-white form-group">
                                            <input type="text" className="form-control input-lg br-tr-md-0 br-br-md-0" id="text4" placeholder="Enter Your Keywords" onChange={(e) => searching(idx, e.target.value)} />
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-12 mb-0 bg-white form-group">
                                            <input type="text" className="form-control input-lg br-md-0" id="text5" placeholder="Select Location" />
                                            <span>
                                                <Image
                                                    src="/images/svg/gps.svg"
                                                    className="location-gps-sm"
                                                    alt="image" width={150} height={150}
                                                />
                                            </span>
                                        </div>
                                        <div className="col-xl-3 col-lg-3 col-md-12 select2-lg  mb-0 bg-white form-group">
                                            <Select2Component id="select2"
                                                options={[
                                                    { value: "1", label: "South Indian" },
                                                    { value: "2", label: "North Indian" },
                                                    { value: "3", label: "West Indian" },
                                                    { value: "4", label: "Australia" },
                                                    { value: "5", label: "Afgani" },
                                                    { value: "6", label: "Russian" },
                                                ]}
                                                select2Options={{ placeholder: "Select category", allowClear: true }}
                                                showSearch={true} />
                                        </div>
                                        <div className="col-xl-2 col-lg-3 col-md-12 mb-0">
                                            <Link href="/" className="btn btn-lg btn-block btn-secondary br-tl-md-0 br-bl-md-0">
                                                Search Here
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* users JOURNEY */}
            <section className="sectionSpace sptb bg-white">
                <div className="container">

                    <div className="row g-3">
                        {/* jrLargeCard */}
                        {journalList.map((journal) => <div className="col-md-4 col-12 jrLargeCard" key={journal.journalsId}>
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href={`/journals/${journal.journalsUrl}`} />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src={journal.imageUrl} className="img-fluid" fill alt="" />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                Walk into the Shadow
                                            </h5>
                                            <small className="badge">
                                                INR {journal.price}/
                                            </small>
                                            <div className="catFooter">
                                                <Link href={`/journals/${journal.journalsUrl}`} className="btn btn-warning">
                                                    Read Now
                                                </Link>
                                                <Link href={`/journals/${journal.journalsUrl}`} className="btn btn-primary">
                                                    Buy Now
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                        {/* jrLargeCard */}

                        {/* jrLargeCard */}

                        {/* jrLargeCard */}

                        {/* jrLargeCard */}

                    </div>


                    <div className="row g-md-4 g-3">
                        <div className="col-12">
                            <div className="center-block text-center d-flex justify-content-center">
                                {button > 1 && <ul className="pagination mb-5 mb-lg-0">
                                    <li className="page-item page-prev">
                                        <button className="page-link" onClick={() => pagination(idx - 1)} tabIndex={-1}>
                                            Prev
                                        </button>
                                    </li>
                                    {Array.from({ length: button }, (_, i) => <li className="page-item active" key={i}>
                                        <button className="page-link" onClick={() => pagination(i + 1)} style={{ backgroundColor: idx === i + 1 && 'orange' }}>
                                            {i + 1}
                                        </button>
                                    </li>)}

                                    <li className="page-item page-next">
                                        <button className="page-link" onClick={() => pagination(idx + 1)}>
                                            Next
                                        </button>
                                    </li>
                                </ul>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}