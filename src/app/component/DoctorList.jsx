"use client"
import Image from "next/image";
import Link from "next/link";
import Select2Component from "../component/Select2Component";
//  import doctorProfile from "@/data/doctorProfile.json";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faBuilding, faCalendar, faChevronRight, faClock, faFilter, faLocation, faLocationArrow, faMap, faSearch, faStar, faTimesCircle, faUsd, faUserFriends } from "@fortawesome/free-solid-svg-icons";
import RangeSlider from "../component/RangeSlider";
import Pagination from './Pagination';
import FilterList from './FilterList.jsx'
import Breadcrumb from './Breadcrumb.jsx';
import ThumbnailVProfileDepartmentCarousel from "./ThumbnailVProfileDepartmentCarousel";
export default function DoctorList({ doctorProfile, totalItems, specialization, total, category,departmentlist }) {

    const [bsOffcanvas, setBsOffcanvas] = useState(null);
    const offcanvasRef = useRef(null);
    const [specializations, setSpecializations] = useState([]);
    const [locations, setLocations] = useState([]);
    const [itemCount, setItemcount] = useState(total);
    const [doctorLists, setdoctorLists] = useState(doctorProfile);
    const [sort, setSort] = useState("select");
    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState([0, 50]);

    useEffect(() => {
        console.log(specialization);
        


        import("bootstrap/dist/js/bootstrap.esm.min.js").then((module) => {
            const { Offcanvas } = module;
            const instance = Offcanvas.getInstance(offcanvasRef.current) || new Offcanvas(offcanvasRef.current);
            setBsOffcanvas(instance);
        });
        const fetching = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors/?page=${1}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify(specializations)}&location=${JSON.stringify(locations)}`);
            setIdx(1);
            const res = await response.json();
            if (res.status) {
                setdoctorLists(res.doctorlist);
                setItemcount(res.totalItems);
                setButton(Math.ceil(res.totalItems / 10));
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


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors/?page=${1}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify(specializations)}&location=${JSON.stringify(locations)}`);
        setName(name);
        setIdx(1);
        const res = await response.json();
        if (res.status) {
            setdoctorLists(res.doctorlist);
            setItemcount(res.totalItems);
            setButton(Math.ceil(res.totalItems / 10));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors/?page=${idx}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify(specializations)}&location=${JSON.stringify(locations)}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setdoctorLists(res.doctorlist);
                setItemcount(res.totalItems);
                setButton(Math.ceil(res.totalItems / 10));
            }

        }
    }

    const applyFilter = async (value) => {

        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors/?page=${idx}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify(specializations)}&location=${JSON.stringify(locations)}`);
        setName(name);
        setIdx(1);
        const res = await response.json();
        setLoading(false);

        if (res.status) {
            setdoctorLists(res.doctorlist);
            setItemcount(res.totalItems);
            setButton(Math.ceil(res.totalItems / 10));
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }

    }

    const applyCheckbox = () => {

        const checkboxes = Array.from(document.querySelectorAll('.checkbox'));
        const checkboxes1 = Array.from(document.querySelectorAll('.checkbox1'));
        let specialization = [];
        let location = [];
        checkboxes.map((box) => box.checked && specialization.push(box.value));
        checkboxes1.map((box) => box.checked && location.push(box.value));
        setSpecializations(specialization);
        setLocations(location);
    }

    const resetCheckbox = async (value) => {

        const checkboxes = Array.from(document.querySelectorAll('.checkbox'));
        const checkboxes1 = Array.from(document.querySelectorAll('.checkbox1'));
        setSpecializations([]);
        setLocations([]);
        checkboxes.map((box) => box.checked = false);
        checkboxes1.map((box) => box.checked = false);
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors/?page=${idx}&name=${name}&category=${category}&sort=${sort}&value=${JSON.stringify(value)}&specialization=${JSON.stringify([])}&location=${JSON.stringify([])}`);
        setName(name);
        setIdx(1);
        const res = await response.json();
        setLoading(false);

        if (res.status) {
            setdoctorLists(res.doctorlist);
            setItemcount(res.totalItems);
            setButton(Math.ceil(res.totalItems / 10));
            if (bsOffcanvas) {
                bsOffcanvas.hide();
            }
        }

    }


    return (
        <>
            {/* search engine */}
             <Breadcrumb title={category!=='null' ? `${category} Doctors`: 'listing'} />
            <section className="cover-image sptb-1 bg-background2"
                data-image-src="../assets/images/banners/banner1.jpg">
                <div className="header-text1 mb-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                                <div className="text-center text-white ">
                                    <h1 className="mb-5">
                                        Search Your favourite doctors
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


                                                    specialization[0].map((item, i) => { return { value: i + 1, label: item.specialization } })

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
                                     {name !== "" && <FilterList filtered={doctorLists} />}
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*Restaurants listing*/}
            <section className="sptb bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-12">
                            {/*Restaurants lists*/}
                            <div className=" mb-lg-0">
                                <div className="">
                                    <div className="item2-gl">
                                        <div className=" mb-0">
                                            <div className="">
                                                <div className="p-md-5 p-3 bg-white item2-gl-nav d-sm-flex d-block">
                                                    <h6 className="mb-0 mt-3">
                                                        Showing <b>{(idx-1)*10+1} to {10*idx}</b> of {itemCount} Doctors
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
                                                            <button className="active" type="button" aria-controls="offcanvasRight" onClick={openOffcanvas}>
                                                                <FontAwesomeIcon className="active" icon={faBarsStaggered} /> FIlter
                                                            </button>
                                                        </span>
                                                        <label className="me-2 mt-2 mb-sm-1">Sort By:</label>
                                                        <Select2Component id="select1" options={[{ value: "1", label: "Newest" }, { value: "2", label: "Oldest" }, { value: "3", label: "Views" },]} select2Options={{ placeholder: "Sort", allowClear: true }} showSearch={false} type="sort" setSort={setSort} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-content">
                                            <div className="tab-pane active">
                                                {
                                                    doctorLists.map((item, idx) => (
                                                        <div key={idx} className="card overflow-hidden br-0 overflow-hidden customCard">
                                                            <div className="customCardSec">
                                                                <div className="p-0 m-0 item-card9-img">
                                                                    <div className="item-card9-imgs">

                                                                        <div id={`carousel-${item.userId}`} className="carousel slide customCarousel" data-bs-ride="carousel">

                                                                            <div className="carousel-inner">
                                                                                <div className="carousel-item active">
                                                                                    <figure>
                                                                                        <Image
                                                                                            unoptimized
                                                                                            src={item.profileImage} fill
                                                                                            alt={item.doctorName}
                                                                                            className="cover-image"
                                                                                        />
                                                                                    </figure>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="card overflow-hidden  border-0 box-shadow-0 border-start br-0 mb-0">
                                                                    <div className="card-body pt-3 pt-md-5">
                                                                        <div className="item-card9">
                                                                            <Link href={`/doctor-profile/${item.userId}`} className="text-dark">
                                                                                <h4 className="font-weight-semibold mt-1">
                                                                                    {item.doctorName}
                                                                                </h4>
                                                                            </Link>
                                                                            <div className="mt-2 mb-2">
                                                                                <span className="me-4">
                                                                                    <FontAwesomeIcon icon={faMap} />{" "}
                                                                                    {item.specialization}
                                                                                </span>
                                                                            </div>
                                                                            <p className="mb-0 leading-tight">
                                                                                {item.qualification}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-footer pt-3 pb-3">
                                                                        <div className="item-card9-footer d-flex">
                                                                            <div className="d-flex align-items-center mb-0 mt-auto posted me-3">
                                                                                <div>
                                                                                    <span className="fs-13">
                                                                                        {" "}
                                                                                        Available at - {item.hospital}
                                                                                    </span>
                                                                                    <small className="d-block text-default">
                                                                                        {item.zip}
                                                                                    </small>
                                                                                </div>
                                                                            </div>
                                                                            <div className="ms-auto">
                                                                                {
                                                                                    item.available_days && (
                                                                                        <span className="me-4">
                                                                                            <FontAwesomeIcon icon={faCalendar} />{" "}
                                                                                            {item.available_days}
                                                                                        </span>
                                                                                    )
                                                                                }

                                                                                {
                                                                                    item.available_time && (
                                                                                        <span className="me-4">
                                                                                            <FontAwesomeIcon icon={faClock} />{" "}
                                                                                            {item.available_time}
                                                                                        </span>
                                                                                    )
                                                                                }

                                                                                {
                                                                                    item.rating && (
                                                                                        <span className="reviewText me-5">
                                                                                            {item.rating} <FontAwesomeIcon icon={faStar} />
                                                                                        </span>
                                                                                    )
                                                                                }

                                                                                <Link href={`/doctor-profile/${item.userId}`} className="text-primary viewDetailsBtn">
                                                                                    View Profile <FontAwesomeIcon icon={faChevronRight} />
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="center-block text-center">
                                        {button > 1 &&
                                            <Pagination
                                                currentPage={idx}
                                                totalPages={button}
                                                onPageChange={pagination}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                            {/*/Restaurants lists*/}
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
                                                <ThumbnailVProfileDepartmentCarousel departmentlist={departmentlist} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="offcanvas offcanvas-end filterMainSec" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
                            <div className="offcanvas-header">
                                <h5 id="offcanvasRightLabel">Select Filter  {(value[0] !== 0 || value[1] !== 50 || specializations.length > 0 || locations.length > 0) && <small onClick={() => [resetCheckbox([0, 50]), setValue([0, 50])]} style={{ cursor: 'pointer', color: 'red' }}>Reset</small>}</h5>
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
                                                {specialization[0].map((item, i) => <label className="custom-control form-checkbox mb-3" key={i}>
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
                                        <h3 className="card-title">Profile Views</h3>
                                    </div>
                                    <div className="card-body">
                                        <h6>
                                            <label htmlFor="price">Range:</label>
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
                                    <div className="card-header border-top">
                                        <h3 className="card-title">Location</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="filter-product-checkboxs">
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input checkbox1" name="checkbox1" defaultValue="Delhi" onChange={applyCheckbox} />
                                                <span className="custom-control-label">Delhi</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input checkbox1" name="checkbox2" defaultValue="Kolkata" onChange={applyCheckbox} />
                                                <span className="custom-control-label">Kolkata</span>
                                            </label>
                                            <label className="custom-control form-checkbox mb-2">
                                                <input type="checkbox" className="custom-control-input checkbox1" name="checkbox2" defaultValue="Mumbai" onChange={applyCheckbox} />
                                                <span className="custom-control-label">Mumbai</span>
                                            </label>
                                        </div>
                                    </div>
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
            {/*/Restaurants Listings*/}
        </>
    )
}