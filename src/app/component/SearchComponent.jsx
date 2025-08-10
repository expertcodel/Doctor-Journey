"use client"
import Image from "next/image";
import Link from "next/link";
import Select2Component from "./Select2Component";
import ThumbnailSearchCarousel from "./ThumbnailSearchCarousel";
import { useState, useEffect, useRef } from "react";
import FilterListVideo from './FilterListVideo.jsx'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
function SearchComponent({ specialization }) {


    const path = usePathname();
    const [videoLists, setvideoLists] = useState([]);
    const searching = async (name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/searching/?name=${name}&path=${path}`);
        const res = await response.json();
        if (res.status) {

            if (path === '/') {
                setvideoLists(res.videolist);
            }
            else {
                setvideoLists(res.journallist);
            }


        }

    }

    return (
        <section className="banner-1 cover-image sptb-3 pb-14 sptb-tab bg-background2"
            data-image-src="../assets/images/banners/banner1.jpg">
            <div className="header-text1 mb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                            <div className="text-center text-white ">
                                <h1 className="mb-5">
                                    {path==='/'?'Search Your favourite videos':'Search Your favourite journals'}
                                </h1>
                            </div>
                            <div className="search-background bg-transparent">
                                <div className="form row no-gutters searchBoxWithDiv">
                                    <div className="col-md-6 col-12 mb-0 bg-white form-group searchBoxMain">
                                        <span className="searchIcon"><FontAwesomeIcon icon={faSearch} /></span>
                                        <input type="text" className="form-control input-lg br-tr-md-0 br-br-md-0" id="text4" placeholder="Enter Your Keywords" onChange={(e) => searching(e.target.value)} />
                                    </div>
                                    {/* <div className="col-xl-3 col-lg-3 col-md-12 mb-0 bg-white form-group">
                                        <input type="text" className="form-control input-lg br-md-0" id="text5" placeholder="Select Location" />
                                        <span>
                                            <Image
                                                src="/images/svg/gps.svg"
                                                className="location-gps-sm"
                                                alt="image" width={150} height={150}
                                            />
                                        </span>
                                    </div> */}
                                    <div className="col-md-6 col-12 select2-lg  mb-0 bg-white form-group">
                                        <Select2Component id="select2"

                                            options=
                                            {


                                                specialization.map((item, i) => { return { value: i + 1, label: item.departmentName } })

                                            }
                                            select2Options={{ placeholder: "Select category", allowClear: true }}
                                            showSearch={true} type="category" setSort="select" />
                                    </div>
                                    {/* <div className="col-xl-2 col-lg-3 col-md-12 mb-0">
                                        <Link href="/" className="btn btn-lg btn-block btn-secondary br-tl-md-0 br-bl-md-0">
                                            Search Here
                                        </Link>
                                    </div> */}
                                </div>
                                {videoLists.length > 0 && <FilterListVideo filtered={videoLists} />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* /header-text */}

            <div className="header-slider-img">
                <div className="container">
                    <ThumbnailSearchCarousel specialization={specialization} />
                </div>
            </div>
        </section>
    )
}

export default SearchComponent