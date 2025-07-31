"use client"
import Image from "next/image";
import Link from "next/link";
import Select2Component from "../component/Select2Component";
import { useState, useEffect, useRef } from "react";
import DaysCalculator from '../component/DaysCalculator';
import Pagination from './Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered, faCalendar, faEye, faSearch } from "@fortawesome/free-solid-svg-icons";
import RangeSlider from "./RangeSlider";
import FilterListBlog from './FilterListBlog.jsx'
import Breadcrumb from './Breadcrumb.jsx';
import { useSearchParams } from "next/navigation";
export default function blogList({ blogCard, totalItems, total,categorylist ,category}) {


    const params=useSearchParams()
    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [blogLists, setblogLists] = useState(blogCard);
    const [name, setName] = useState("");
    const [itemCount, setItemcount] = useState(total);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState("select");
    useEffect(() => {

        const fetching = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/blogs/?page=${1}&name=${name}&sort=${sort}&category=${category}`);
            setIdx(1);
            const res = await response.json();
            if (res.status) {
                setblogLists(res.bloglist);
                setItemcount(res.totalItems);
                setButton(Math.ceil(res.totalItems / 9));
            }
        }

        fetching();

    }, [sort,params])

    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/blogs/?page=${1}&name=${name}&sort=${sort}&category=${category}`)
        setName(name);
        setIdx(1);
        const res = await response.json();
        if (res.status) {
            setblogLists(res.bloglist);
            setButton(Math.ceil(res.totalItems / 9));
            setItemcount(res.totalItems);
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/blogs/?page=${idx}&name=${name}&sort=${sort}&category=${category}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setblogLists(res.bloglist);
                setButton(Math.ceil(res.totalItems / 9));
                setItemcount(res.totalItems);
            }

        }


    }



    return (
        <>
            {/* search engine */}
             <Breadcrumb title={category !== 'null' ? `${category} Blog` : 'listing'} />
            <section className="cover-image sptb-1 bg-background2"
                data-image-src="../assets/images/banners/banner1.jpg">
                <div className="header-text1 mb-0">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                                <div className="text-center text-white ">
                                    <h1 className="mb-5">
                                        Search Your favourite Blog
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
                                        </div> */}
                                        {/* <div className="col-xl-2 col-lg-3 col-md-12 mb-0">
                                            <Link href="/" className="btn btn-lg btn-block btn-secondary br-tl-md-0 br-bl-md-0">
                                                Search Here
                                            </Link>
                                        </div> */}
                                    </div>

                                     {name !=="" && <FilterListBlog filtered={blogLists} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* blog JOURNEY */}
            <section className="sectionSpace sptb bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9 col-md-8 col-12">
                            <div className="row">
                                <div className="col-12 item2-gl">
                                    <div className="p-md-5 p-3 bg-white item2-gl-nav d-sm-flex d-block">
                                        <h6 className="mb-0 mt-3">
                                            Showing <b>{(idx-1)*9+1} to {9*idx}</b> of {itemCount} Blogs
                                        </h6>
                                        <ul className="nav item2-gl-menu mt-1 ms-auto">
                                            {/* <li className="d-flex align-items-center">
                                                <button className="active" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <FontAwesomeIcon className="active" icon={faBarsStaggered} /> FIlter
                                                </button>
                                            </li> */}
                                        </ul>
                                        <div className="d-flex align-items-center">
                                            {/* <span className="customFilter">
                                                <button className="active" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                                                    <FontAwesomeIcon className="active" icon={faBarsStaggered} /> FIlter
                                                </button>
                                            </span> */}
                                            <label className="me-2 mt-2 mb-sm-1">Sort By:</label>
                                            <Select2Component id="select1" options={[{ value: "1", label: "Newest" }, { value: "2", label: "Oldest" }]} select2Options={{ placeholder: "Sort", allowClear: true }} showSearch={false} type="sort" setSort={setSort} />
                                        </div>
                                    </div>
                                </div>

                                <div className="offcanvas offcanvas-end filterMainSec" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                    <div className="offcanvas-header">
                                        <h5 id="offcanvasRightLabel">Select Filter</h5>
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
                                                        <label className="custom-control form-checkbox mb-3">
                                                            <input type="checkbox" className="custom-control-input" name="checkbox1" defaultValue="option1" />
                                                            <span className="custom-control-label">
                                                                Cardiacsurgeon
                                                                <span className="label label-secondary float-end">
                                                                    14
                                                                </span>
                                                            </span>
                                                        </label>
                                                        <label className="custom-control form-checkbox mb-3">
                                                            <input type="checkbox" className="custom-control-input" name="checkbox2" defaultValue="option2" />
                                                            <span className="custom-control-label">
                                                                Dermatologist
                                                                <span className="label label-secondary float-end">
                                                                    14
                                                                </span>
                                                            </span>
                                                        </label>
                                                        <label className="custom-control form-checkbox mb-3">
                                                            <input type="checkbox" className="custom-control-input" name="checkbox3" defaultValue="option3" />
                                                            <span className="custom-control-label">
                                                                Gastroenterologist
                                                                <span className="label label-secondary float-end">
                                                                    10
                                                                </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="card-header border-top">
                                                <h3 className="card-title">Views</h3>
                                            </div>
                                            <div className="card-body">
                                                <h6>
                                                    <label htmlFor="price">Views:</label>
                                                    <RangeSlider />
                                                </h6>
                                            
                                            </div> */}
                                            <div className="card-header border-top">
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
                                            </div>
                                            <div className="card-header border-top">
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
                                            </div>
                                            <div className="card-footer">
                                                <button type="submit" className="btn btn-warning btn-block">
                                                    Apply Filter
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-md-4 g-3">
                                {blogLists.map((card) => (
                                    <div className="col-md-4 col-12 drCard" key={card.blogId}>
                                        <div className="card mb-0">
                                            <div className="item7-card-img">
                                                <Link href={`/blogs${card.blogUrl}`} />
                                                <Image src={card.blogImage} fill alt="img" className="cover-image" unoptimized />

                                            </div>
                                            <div className="card-body p-4">
                                                <div className="item7-card-desc d-flex mb-2">
                                                    <Link href={`/blog${card.blogUrl}`}>
                                                        <FontAwesomeIcon icon={faCalendar} /> {card.publishedDate}
                                                    </Link>
                                                    <div className="ms-auto">
                                                        <Link href={`/blog${card.blogUrl}`}>
                                                                <small className="d-block text-muted"><DaysCalculator targetDate={card.publishedDate} today={new Date().toLocaleDateString()}/></small>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <Link href={`/blog${card.blogUrl}`} className="text-dark">
                                                    <h4 className="font-weight-semibold">{card.blogTitle}</h4>
                                                </Link>
                                                <p>
                                                    {card.blogDescription.substr(0,50)}...{" "}
                                                </p>
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

                        <div className="col-lg-3 col-md-4 col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Category</h3>
                                </div>
                                <div className="card-body p-0">
                                    <div className="list-catergory">
                                        <div className="item-list">
                                            <ul className="list-group mb-0 customSpecialization">
                                                {
                                                    categorylist.map((item, id) => (
                                                        <li key={id} className="list-group-item">
                                                            <Link href={`/blog?category=${item.categoryname}`} className="text-dark">
                                                                 {item.categoryname}
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
                    </div>

                    
                </div>
            </section>
        </>
    )
}