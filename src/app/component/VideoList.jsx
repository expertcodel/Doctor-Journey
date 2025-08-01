"use client"
import Image from "next/image";
import Link from "next/link";
import Select2Component from "./Select2Component";
import { useState, useEffect, useRef } from "react";
import DaysCalculator from './DaysCalculator';
import Pagination from './Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import RangeSlider from "./RangeSlider";
import FilterListVideo from './FilterListVideo.jsx'
import Breadcrumb from './Breadcrumb.jsx';
import ThumbnailVDepartmentCarousel from './ThumbnailVDepartmentCarousel';

export default function VideoList({ doctorCard, totalItems, specialization, total, category ,departmentlist}) {


    const [bsOffcanvas, setBsOffcanvas] = useState(null);
    const offcanvasRef = useRef(null);
    const [specializations, setSpecializations] = useState([]);
    const [sort, setSort] = useState("select");
    const [itemCount, setItemcount] = useState(total);
    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [doctorLists, setdoctorLists] = useState(doctorCard);
    const [name, setName] = useState("");
    const [value, setValue] = useState([0, 50]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {


        import("bootstrap/dist/js/bootstrap.esm.min.js").then((module) => {
            const { Offcanvas } = module;
            const instance = Offcanvas.getInstance(offcanvasRef.current) || new Offcanvas(offcanvasRef.current);
            setBsOffcanvas(instance);
        });
        const fetching = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos/?page=${1}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify(specializations)}`);
            setIdx(1);
            const res = await response.json();
            if (res.status) {
                setdoctorLists(res.videolist);
                setItemcount(res.totalItems);
                setButton(Math.ceil(res.totalItems / 9));
            }
        }

        fetching();

    }, [sort, category])

    const openOffcanvas = () => {
        if (bsOffcanvas) {
            bsOffcanvas.show();
        }
    };

    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos/?page=${1}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify(specializations)}`);
        setName(name);
        setIdx(1);
        const res = await response.json();
        if (res.status) {
            setdoctorLists(res.videolist);
            setItemcount(res.totalItems);
            setButton(Math.ceil(res.totalItems / 9));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos/?page=${idx}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify(specializations)}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setdoctorLists(res.videolist);
                setItemcount(res.totalItems);
                setButton(Math.ceil(res.totalItems / 9));
            }

        }


    }


    const applyFilter = async (value) => {

        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos/?page=${idx}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify(specializations)}`);
        setName(name);
        setIdx(1);
        const res = await response.json();
        setLoading(false);

        if (res.status) {
            setdoctorLists(res.videolist);
            setItemcount(res.totalItems);
            setButton(Math.ceil(res.totalItems / 9));
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }

    }

    const applyCheckbox = () => {

        const checkboxes = Array.from(document.querySelectorAll('.checkbox'));
        let specialization = [];
        checkboxes.map((box) => box.checked && specialization.push(box.value));
        setSpecializations(specialization);
    }

    const resetCheckbox = async (value) => {

        const checkboxes = Array.from(document.querySelectorAll('.checkbox'));
        setSpecializations([]);
        checkboxes.map((box) => box.checked = false);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/videos/?page=${idx}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify([])}`);
        setName(name);
        setIdx(1);
        const res = await response.json();
        setLoading(false);

        if (res.status) {
            setdoctorLists(res.videolist);
            setItemcount(res.totalItems);
            setButton(Math.ceil(res.totalItems / 9));
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }

    }



    return (
        <>
            {/* search engine */}
            <Breadcrumb title={category !== 'null' ? `${category} Videos` : 'listing'} />

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
                                    <div className="form">
                                        <div className="col-12 mb-0 bg-white form-group searchBoxMain">
                                            <span className="searchIcon"><FontAwesomeIcon icon={faSearch} /></span>
                                            <input type="text" className="form-control input-lg br-tr-md-0 br-br-md-0" id="text4" placeholder="Enter Your Keywords" onChange={(e) => searching(idx, e.target.value)} />
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
                                        {/* <div className="col-xl-3 col-lg-3 col-md-12 select2-lg  mb-0 bg-white form-group">
                                            <Select2Component id="select2"

                                                options=
                                                {


                                                    specialization[0].map((item, i) => { return { value: i + 1, label: item.departmentName } })

                                                }
                                                select2Options={{ placeholder: "Select category", allowClear: true }}
                                                showSearch={true} type="category" setSort={setSort} />
                                        </div>
                                        <div className="col-xl-2 col-lg-3 col-md-12 mb-0">
                                            <Link href="/" className="btn btn-lg btn-block btn-secondary br-tl-md-0 br-bl-md-0">
                                                Search Here
                                            </Link>
                                        </div> */}

                                    </div>

                                    {name !== "" && <FilterListVideo filtered={doctorLists} />}
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
                        <div className="col-md-8 col-12">
                            <div className="row">
                                <div className="col-12 item2-gl">
                                    <div className="p-md-5 p-3 bg-white item2-gl-nav d-sm-flex d-block">
                                        <h6 className="mb-0 mt-3">
                                            Showing <b>{(idx - 1) * 9 + 1} to {9 * idx}</b> of {itemCount} Videos
                                        </h6>
                                        <ul className="nav item2-gl-menu mt-1 ms-auto">
                                            {/* <li className="d-flex align-items-center">
                                                <button className="active" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <FontAwesomeIcon className="active" icon={faBarsStaggered} /> FIlter
                                                </button>
                                            </li> */}
                                        </ul>
                                        <div className="d-flex align-items-center">
                                            <span className="customFilter">
                                                <button className="active" type="button" aria-controls="offcanvasRight" onClick={openOffcanvas}
                                                >
                                                    <FontAwesomeIcon className="active" icon={faBarsStaggered} /> FIlter
                                                </button>
                                            </span>
                                            <label className="me-2 mt-2 mb-sm-1">Sort By:</label>

                                            <Select2Component id="select1" options={[{ value: "1", label: "Newest" }, { value: "2", label: "Oldest" }, { value: "3", label: "Views" }]} select2Options={{ placeholder: "Sort", allowClear: true }} showSearch={false} type="sort" setSort={setSort} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-md-4 g-3">
                                {doctorLists.map((card) => (
                                    <div className="col-md-6 col-12 drCard" key={card.videoId}>
                                        <div className="card mb-0">
                                            <div className="item7-card-img">
                                                <Link href={`/doctors/${card.videoId}`} />
                                                <Image src={card.thumbnailImage} fill alt="img" className="cover-image" unoptimized />
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

                                                        <span className="me-2"> <DaysCalculator targetDate={card.publishedDate} today={new Date().toLocaleDateString()} /></span>
                                                        <span> <FontAwesomeIcon icon={faEye} /> {card.views}</span>
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
                                        {
                                            button > 1 &&
                                            <Pagination
                                                currentPage={idx}
                                                totalPages={button}
                                                onPageChange={pagination}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Departments</h3>
                                </div>
                                <div className="card-body p-0">
                                    <div className="list-catergory">
                                        <div className="item-list">
                                            <div className="list-group mb-0 customSpecialization">
                                                <ThumbnailVDepartmentCarousel departmentlist={departmentlist} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="offcanvas offcanvas-end filterMainSec" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
                            <div className="offcanvas-header">
                                <h5 id="offcanvasRightLabel">Select Filter  {(value[0] !== 0 || value[1] !== 50 || specializations.length > 0) && <small onClick={() => [resetCheckbox([0, 50]), setValue([0, 50])]} style={{ cursor: 'pointer', color: 'red' }}>Reset</small>}</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
                            </div>
                            <div className="offcanvas-body">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Specialization</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="" id="container">
                                            <div className="filter-product-checkboxs">
                                                {specialization.map((item, i) => <label className="custom-control form-checkbox mb-3" key={i}>
                                                    <input type="checkbox" className="custom-control-input checkbox" name={`checkbox${i}`} defaultValue={item.specialization} onChange={applyCheckbox} />
                                                    <span className="custom-control-label">
                                                        {item.specialization}
                                                        <span className="label label-secondary float-end">
                                                            {item.count}
                                                        </span>
                                                    </span>
                                                </label>)}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-header border-top">
                                        <h3 className="card-title">Views</h3>
                                    </div>
                                    <div className="card-body">
                                        <h6>
                                            <label htmlFor="price">Views:</label>
                                            <RangeSlider value={value} setValue={setValue} />
                                        </h6>
                                        {/* <div id="mySlider" /> */}
                                    </div>
                                    {/* <div className="card-header border-top">
                                        <h3 className="card-title">Rating</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="filter-product-checkboxs">
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox1" defaultValue="option1" />
                                                <span className="custom-control-label">Any</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">3.5</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">4.0</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-0">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">4.5</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-0">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">5</span>
                                            </label>
                                        </div>
                                    </div> */}
                                    {/* <div className="card-header border-top">
                                        <h3 className="card-title">Location</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="filter-product-checkboxs">
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox1" defaultValue="option1" />
                                                <span className="custom-control-label">Delhi</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">Noida</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                <span className="custom-control-label">Gurugram</span>
                                            </label>
                                        </div>
                                    </div> */}
                                    <div className="card-footer">


                                        <button type="submit" className="btn btn-warning btn-block" onClick={() => applyFilter(value)}>
                                            {loading ? <div className="spinner-border text-white" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div> : <> Apply Filter
                                                <span /> </>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}