"use client"
import Image from "next/image";
import Link from "next/link";
import Select2Component from "../component/Select2Component";
import { useState } from "react";
import DaysCalculator from '../component/DaysCalculator'
export default function VideoList({ doctorCard, totalItems }) {


    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [doctorLists, setdoctorLists] = useState(doctorCard);
    const [name, setName] = useState("");
    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos/?page=${idx}&name=${name}`);
        setName(name);

        const res = await response.json();
        if (res.status) {
            setdoctorLists(res.videolist);
            setButton(Math.ceil(res.totalItems / 10));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos/?page=${idx}&name=${name}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setdoctorLists(res.videolist);
                setButton(Math.ceil(res.totalItems / 10));
            }

        }


    }



    return (
        <>
            {/* search engine */}
            <section className="cover-image sptb-1 bg-background2"
                data-image-src="../assets/images/banners/banner1.jpg">
                <div className="header-text1 mb-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                                <div className="text-center text-white ">
                                    <h1 className="mb-5">
                                        Search Your favourite videos
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

            {/* doctor JOURNEY */}
            <section className="sectionSpace sptb bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mainHeading">
                                New from doctor's journey
                            </h4>
                        </div>
                    </div>

                    <div className="row g-md-4 g-3">
                        {doctorLists.map((card) => (
                            <div className="col-md-4 col-12 drCard" key={card.videoId}>
                                <div className="card mb-0">
                                    <div className="item7-card-img">
                                        <Link href={`/doctors/${card.videoId}`} />
                                        <Image src={card.thumbnailImage} width={368} height={190} alt="img" className="cover-image" unoptimized />
                                        <div className="play-button">
                                            <span className="triangle"></span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="item7-card-desc d-flex">
                                            <Link href={`/doctors/${card.videoId}`} className="text-dark">
                                            <h4 className="font-weight-semibold">{card.doctorName}</h4>
                                        </Link>
                                            <div className="ms-auto">
                                               
                                                <span> <DaysCalculator targetDate={card.publishedDate} today={new Date().toLocaleDateString()} /></span>
                                                {/* <span></span> */}
                                            </div>
                                        </div>
                                        
                                        <p>{card.specialization}</p>
                                        <div className="item7-card-desc d-flex">
                                            <span>{card.videoTitle}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="row g-md-4 g-3">
                        <div className="col-12">
                            <div className="center-block text-center d-flex justify-content-center">
                                {button > 1 && <ul className="pagination mb-5 mb-lg-0">
                                    <li className="page-item page-prev disabled">
                                        <button className="page-link" onClick={() => pagination(idx - 1)} tabIndex={-1}>
                                            Prev
                                        </button>
                                    </li>
                                    {Array.from({ length: button }, (_, i) => <li className="page-item active" key={i}>
                                        <button className="page-link" >
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
        </>
    )
}