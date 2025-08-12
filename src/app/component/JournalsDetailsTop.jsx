"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AuthorsThumbCarousel from "./AuthorsThumbCarousel";
import JournalsDetailsBanner from "./JournalsDetailsBanner";
import { faAngleRight, faCheck, faPhone, faStar, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import LazyYoutube from './LazyYoutube.jsx'
import { Modal } from 'bootstrap';
export default function JournalsDetailsTop({ doctorProfile, subscriptionsList, journalDetail, articlelist }) {

    const [totalAmount, setTotalamount] = useState(parseFloat(journalDetail.price_level_1))
    const [checkAmount, setCheckamount] = useState({ plan1: true, plan2: false, plan3: false })
    const [checkPlans, setCheckplans] = useState({ plan1: true, plan2: false, plan3: false })
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const [views, setViews] = useState(0);
    const [subscription, setSubscription] = useState({ plan: null, price: null, duration: null });
    const sidebarRef = useRef(null);
    const pageTopTriggerRef = useRef(null);
    const pageBottomTriggerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const circleRef = useRef(null);
    const [subscriptionAmount, setSubscriptionamount] = useState(0);
    const [modelStatus, setModelstatus] = useState(false);
    const [errMsg, setErrmsg] = useState("");
    const [loading, setLoading] = useState(false);

    
    
    useEffect(() => {
        console.log(journalDetail);
        
        const handleScroll = () => {
            const sidebarTop = sidebarRef.current?.getBoundingClientRect().top;
            const isAboveTopTrigger = pageTopTriggerRef.current?.getBoundingClientRect().bottom <= 0;
            const isBelowBottomTrigger = pageBottomTriggerRef.current?.getBoundingClientRect().top > window.innerHeight;

            const shouldStick = isAboveTopTrigger && isBelowBottomTrigger && sidebarTop <= 100;
            setIsSticky(shouldStick);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const scrollDelta = window.scrollY - lastScrollY;
            lastScrollY = window.scrollY;

            if (circleRef.current) {
                const currentRotation = parseFloat(circleRef.current.style.getPropertyValue('--circle-angle')) || 0;
                const newRotation = currentRotation + scrollDelta * 0.5; // adjust multiplier for speed
                circleRef.current.style.setProperty('--circle-angle', `${newRotation}deg`);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    useEffect(() => {
        const modalEl = document.getElementById('exampleModal');


        const handleClose = () => setSubscriptionamount(0);


        modalEl?.addEventListener('hidden.bs.modal', handleClose);

        return () => {

            modalEl?.removeEventListener('hidden.bs.modal', handleClose);
        };
    }, []);


    const router = useRouter();

    const setJournaldetail = async () => {
        const plan1Checked = document.getElementById("plan-1")?.checked;
        const plan2Checked = document.getElementById("plan-2")?.checked;

        if (!plan1Checked && !plan2Checked) {
            setErrmsg("Please select at least one option: Soft Copy or Hard Copy.");
            return;
        }
        setErrmsg("");

        setLoading(true);
        const updatedPlan = { ...checkPlans };
        updatedPlan['plan3'] = subscription;
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/journal-detail`, { method: 'POST', body: JSON.stringify({ journal_name: journalDetail.journalsName, amount: totalAmount, journal_id: journalDetail.journalsId, volume: journalDetail.volume, plans: updatedPlan }) });
        const res = await response.json();
        setLoading(false);
        if (res.status) {
            router.push(`/buy-now?id=${res.id}`)
        }
        else {
            setErrmsg(res.message);
        }

    }

    const Amount1 = () => {

        const price1 = document.getElementById('plan-1').checked;
        let price = totalAmount
        let updatedcheckAmount = { ...checkAmount };
        let updatedPlans = { ...checkPlans };
        if (price1) {
            price = totalAmount + parseFloat(journalDetail.price_level_1)
            updatedcheckAmount['plan1'] = true;
            updatedPlans['plan1'] = true;
        }
        else {
            price = Math.abs(totalAmount - parseFloat(journalDetail.price_level_1))
            updatedcheckAmount['plan1'] = false;
            updatedPlans['plan1'] = false;
        }

        setTotalamount(price);
        setCheckamount(updatedcheckAmount)
        setCheckplans(updatedPlans);
    }

    const Amount2 = () => {

        const price2 = document.getElementById('plan-2').checked;
        let updatedcheckAmount = { ...checkAmount };
        let updatedPlans = { ...checkPlans };
        let price = totalAmount
        if (price2) {
            price = totalAmount + parseFloat(journalDetail.price_level_2)
            updatedcheckAmount['plan2'] = true;
            updatedPlans['plan2'] = true;
        }
        else {

            price = Math.abs(totalAmount - parseFloat(journalDetail.price_level_2))
            updatedcheckAmount['plan2'] = false;
            updatedPlans['plan2'] = false;
        }



        setTotalamount(price);
        setCheckamount(updatedcheckAmount)
        setCheckplans(updatedPlans);
    }

    const subscribe = (subscription_plan) => {


        setSubscription({ plan: subscription_plan.plan, price: subscription_plan.price, duration: subscription_plan.duration })
        setModelstatus(true);
        setTotalamount(parseFloat(totalAmount) + parseFloat(subscription_plan.price) - subscriptionAmount)
        setSubscriptionamount(parseFloat(subscription_plan.price));


    }



    const handleCheckbox = () => {

        if (modelStatus) {
            setSubscription({ plan: null, duration: null, price: null });
            setTotalamount(Math.abs(totalAmount - subscription.price))
            setModelstatus(false);
        }

    }





    return (
        <>
            {/* Top of section observer trigger */}
            <div ref={pageTopTriggerRef} style={{ height: "1px", marginTop: "-1px" }}></div>

            <div className="row">
                <div className="col-xl-9 col-lg-8 col-md-12 col-12">
                    <div className="card mb-md-0">
                        <div className="card-body detailCardTop detailSideCardTop">
                            <div className='row'>
                                <div className='col-md-5 col-12'>
                                    <JournalsDetailsBanner journalSlider={journalDetail.journal_slider} />
                                </div>

                                <div className='col-md-7 col-12'>
                                    <h3>
                                        {journalDetail.journalsName}
                                        <span className='reviewSec'>
                                            <span className="reviewText">
                                                4.2 <FontAwesomeIcon icon={faStar} />
                                            </span>
                                            <em className='totalReviews'>3620 <span>Reviews</span></em>
                                        </span>
                                    </h3>
                                    <p>
                                        Paperback – {journalDetail.publishDate}
                                    </p>
                                    <p dangerouslySetInnerHTML={{ __html: journalDetail.coverSummary }}>

                                    </p>
                                </div>

                                <div className="col-12 mt-5">
                                    <h4 className="mainHeading">
                                        Related Author's
                                    </h4>
                                    <div className="row">
                                        <div className="col-12 drShortDesc">
                                            <AuthorsThumbCarousel doctorProfile={doctorProfile} />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 mt-5">
                                    <div className="tab-content mobileTabs">
                                        <div>
                                            <div className="wideget-user-tab">
                                                <div className="tab-menu-heading">
                                                    <div className="tabs-menu1 customeTabs">
                                                        <ul className="nav">
                                                            <li className="">
                                                                <a href="#tab-1" className="active" data-bs-toggle="tab">
                                                                    Overview
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#tab-2" data-bs-toggle="tab" className="">
                                                                    Contents
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#tab-3" data-bs-toggle="tab" className="">
                                                                    Reviews
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a href="#tab-4" data-bs-toggle="tab" className="">
                                                                    FAQ
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane active" id="tab-1">
                                            <div className="card mb-0 border-0">
                                                <div className="card-body">
                                                    <p dangerouslySetInnerHTML={{ __html: journalDetail.description }}>

                                                    </p>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane userprof-tab" id="tab-2">
                                            {/*Job listing*/}
                                            <div className="card mb-0 border-0">
                                                <div className="card-body">
                                                    <p>
                                                        Journal Title: {journalDetail.journalsName} – {journalDetail.volume}
                                                    </p>
                                                    <p>
                                                        Publication Date: {journalDetail.publishDate}
                                                    </p>
                                                    <p>
                                                        Format: Paperback & Soft Copy (PDF)
                                                    </p>
                                                    <h5>Articles Included:</h5>
                                                    <ol>
                                                        {articlelist.map((article, i) => <li key={i}>
                                                            {article.articleTitle}
                                                            <h4>Authors: </h4>
                                                            <dl>
                                                                {article.articleAuthor.map((author, j) => <dt key={author.userId}>{j + 1}. {author.name} : {author.qualification}</dt>)}
                                                                <dd>{article.articleSummary}</dd>
                                                            </dl>
                                                        </li>)}

                                                    </ol>
                                                </div>
                                            </div>
                                            {/*Job Listing*/}
                                        </div>

                                        <div className="tab-pane" id="tab-3">
                                            <div className="card border-0">
                                                <div className="card-body">
                                                    <h3 className="card-title">Rating And Reviews</h3>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="badge badge-default mb-2">
                                                                5 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-4">
                                                                <div className="progress-bar bg-success w-100">
                                                                    6,532
                                                                </div>
                                                            </div>
                                                            <div className="badge badge-default mb-2">
                                                                4 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-4">
                                                                <div className="progress-bar bg-primary w-80">
                                                                    7,532
                                                                </div>
                                                            </div>
                                                            <div className="badge badge-default mb-2">
                                                                3 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-4">
                                                                <div className="progress-bar bg-info w-60">3,526</div>
                                                            </div>
                                                            <div className="badge badge-default mb-2">
                                                                2 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-4">
                                                                <div className="progress-bar bg-warning w-60">485</div>
                                                            </div>
                                                            <div className="badge badge-default mb-2">
                                                                1 <i className="fa fa-star" />
                                                            </div>
                                                            <div className="progress progress-md mb-0">
                                                                <div className="progress-bar bg-danger w-20">126</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 text-center align-items-center"></div>
                                                    </div>
                                                </div>
                                                <div className="card-body p-0">
                                                    <div className="media mt-0 p-5">
                                                        <div className="d-flex me-3">
                                                            <a href="javascript:void(0);">
                                                                <img className="media-object brround" alt="64x64" src="/images/users/male/1.jpg" />{" "}
                                                            </a>
                                                        </div>
                                                        <div className="media-body">
                                                            <h5 className="mt-0 mb-1 font-weight-semibold">
                                                                Joanne Scott
                                                                <span
                                                                    className="fs-14 ms-0"
                                                                    data-bs-toggle="tooltip"
                                                                    data-bs-placement="top"
                                                                    title=""
                                                                    data-bs-original-title="verified"
                                                                >
                                                                    <i className="fa fa-check-circle-o text-success" />
                                                                </span>
                                                                <span className="fs-14 ms-2">
                                                                    {" "}
                                                                    4.5 <i className="fa fa-star text-yellow" />
                                                                </span>
                                                            </h5>
                                                            <small className="text-muted">
                                                                <i className="fa fa-calendar" /> Dec 21st{" "}
                                                                <i className=" ms-3 fa fa-clock-o" /> 13.00{" "}
                                                                <i className=" ms-3 fa fa-map-marker" /> Brezil
                                                            </small>
                                                            <p className="font-13  mb-2 mt-2">
                                                                On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue
                                                            </p>
                                                            <a href="javascript:void(0);" className="me-2">
                                                                <span className="badge bg-primary">Helpful</span>
                                                            </a>
                                                            <a href="" className="me-2" data-bs-toggle="modal" data-bs-target="#Comment">
                                                                <span className="">Comment</span>
                                                            </a>
                                                            <a href="" className="me-2" data-bs-toggle="modal" data-bs-target="#report">
                                                                <span className="">Report</span>
                                                            </a>
                                                            <div className="media mt-5">
                                                                <div className="d-flex me-3">
                                                                    <a href="javascript:void(0);">
                                                                        {" "}
                                                                        <img
                                                                            className="media-object brround"
                                                                            alt="64x64"
                                                                            src="/images/users/female/2.jpg"
                                                                        />{" "}
                                                                    </a>
                                                                </div>
                                                                <div className="media-body">
                                                                    <h5 className="mt-0 mb-1 font-weight-semibold">
                                                                        Rose Slater{" "}
                                                                        <span
                                                                            className="fs-14 ms-0"
                                                                            data-bs-toggle="tooltip"
                                                                            data-bs-placement="top"
                                                                            title=""
                                                                            data-bs-original-title="verified"
                                                                        >
                                                                            <i className="fa fa-check-circle-o text-success" />
                                                                        </span>
                                                                    </h5>
                                                                    <small className="text-muted">
                                                                        <i className="fa fa-calendar" /> Dec 22st{" "}
                                                                        <i className=" ms-3 fa fa-clock-o" /> 6.00{" "}
                                                                        <i className=" ms-3 fa fa-map-marker" /> Brezil
                                                                    </small>
                                                                    <p className="font-13  mb-2 mt-2">
                                                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris commodo Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur consequat.
                                                                    </p>
                                                                    <a href="" data-bs-toggle="modal" data-bs-target="#Comment">
                                                                        <span className="badge badge-default">Comment</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="media p-5 border-top mt-0">
                                                        <div className="d-flex me-3">
                                                            <a href="javascript:void(0);">
                                                                {" "}
                                                                <img
                                                                    className="media-object brround"
                                                                    alt="64x64"
                                                                    src="/images/users/male/3.jpg"
                                                                />{" "}
                                                            </a>
                                                        </div>
                                                        <div className="media-body">
                                                            <h5 className="mt-0 mb-1 font-weight-semibold">
                                                                Edward
                                                                <span
                                                                    className="fs-14 ms-0"
                                                                    data-bs-toggle="tooltip"
                                                                    data-bs-placement="top"
                                                                    title=""
                                                                    data-bs-original-title="verified"
                                                                >
                                                                    <i className="fa fa-check-circle-o text-success" />
                                                                </span>
                                                                <span className="fs-14 ms-2">
                                                                    {" "}
                                                                    4 <i className="fa fa-star text-yellow" />
                                                                </span>
                                                            </h5>
                                                            <small className="text-muted">
                                                                <i className="fa fa-calendar" /> Dec 21st{" "}
                                                                <i className=" ms-3 fa fa-clock-o" /> 16.35{" "}
                                                                <i className=" ms-3 fa fa-map-marker" /> UK
                                                            </small>
                                                            <p className="font-13  mb-2 mt-2">
                                                                On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue
                                                            </p>
                                                            <a href="javascript:void(0);" className="me-2">
                                                                <span className="badge bg-primary">Helpful</span>
                                                            </a>
                                                            <a href="" className="me-2" data-bs-toggle="modal" data-bs-target="#Comment">
                                                                <span className="">Comment</span>
                                                            </a>
                                                            <a href="" className="me-2" data-bs-toggle="modal" data-bs-target="#report">
                                                                <span className="">Report</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card mb-0">
                                                <div className="card-header">
                                                    <h3 className="card-title">Leave a reply</h3>
                                                </div>
                                                <div className="card-body">
                                                    <div>
                                                        <div className="mb-3">
                                                            <input type="text" className="form-control" placeholder="Your Name" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <input type="email" className="form-control" placeholder="Email Address" />
                                                        </div>
                                                        <div className="mb-3">
                                                            <textarea className="form-control" name="example-textarea-input" rows={6} placeholder="Comment" defaultValue={""} />
                                                        </div>
                                                        <a href="javascript:void(0);" className="btn btn-primary">
                                                            Send Reply
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane" id="tab-4">
                                            <div className='card border-0'>
                                                <div className='card-body'>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="accordion accordion-box" id="faqAccordion">
                                                                {/* Block 1 */}

                                                                {journalDetail.faqs && journalDetail.faqs.map((faq, i) => <div className="accordion-item block" key={i}>
                                                                    <h2 className="accordion-header" id={`heading${i}`}>
                                                                        <button className="accordion-button acc-btn" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded={i === 0 ? "true" : "false"} aria-controls={`collapse${i}`}>
                                                                            {faq.question}
                                                                        </button>
                                                                    </h2>
                                                                    <div id={`collapse${i}`} className={i === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby={`heading${i}`} data-bs-parent="#faqAccordion">
                                                                        <div className="accordion-body content">
                                                                            {faq.answer}
                                                                        </div>
                                                                    </div>
                                                                </div>)}



                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-md-12 col-12">
                    <div
                        ref={sidebarRef}
                        className={`participateSidebar journalsPriceSec ${isSticky ? "stickSideBar" : ""}`}
                    >
                        <div className="drCard w-100">
                            <div className="card mb-0">
                                {
                                    journalDetail.video_id && (
                                        <div className="item7-card-img">
                                            <Image src={`https://img.youtube.com/vi/${journalDetail.video_id}/mqdefault.jpg`} fill alt="img" className="cover-image" unoptimized />
                                            <div className="play-button" onClick={openModal}>
                                                <span className="triangle"></span>
                                            </div>
                                        </div>
                                    )
                                }
                                
                                <div className="card-header">
                                    <h3 className="card-title">Select Price Level</h3>
                                </div>
                                <div className="card-body">
                                    <div className="filter-product-checkboxs">
                                        <label className="custom-control form-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" name="checkbox1" id="plan-1" checked={checkAmount.plan1} onChange={Amount1} />
                                            <span className="custom-control-label">
                                                Soft Copy
                                                <span className="label float-end">
                                                    ₹ {journalDetail.price_level_1}
                                                </span>
                                            </span>
                                        </label>
                                        <label className="custom-control form-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" name="checkbox2" id="plan-2" checked={checkAmount.plan2} onChange={Amount2} />
                                            <span className="custom-control-label">
                                                Hard Copy
                                                <span className="label float-end">
                                                    ₹ {journalDetail.price_level_2}
                                                </span>
                                            </span>
                                        </label>
                                        {
                                            journalDetail.subscription_plan && (
                                                <label className="custom-control form-checkbox mb-3" data-bs-toggle={!modelStatus ? "modal" : ""} data-bs-target={!modelStatus ? "#exampleModal" : ""}>
                                                    <input type="checkbox" className="custom-control-input" name="checkbox3" checked={modelStatus} onChange={handleCheckbox} />
                                                    <span className="custom-control-label">
                                                        <span>Subscription <small>{subscription.duration && <>({subscription.duration})</>}</small></span>
                                                        <span className="label float-end">
                                                            {
                                                                subscription.price ? <>₹ {subscription.price}</> : "--"
                                                            }
                                                        </span>
                                                    </span>
                                                </label>
                                            )
                                        }
                                        
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <h5>
                                        Total: {" "}<span>₹ {totalAmount}</span>
                                    </h5>


                                    <button className={totalAmount === 0 ? "btn btn-primary d-block w-100 mt-5 disabled" : "btn btn-primary d-block w-100 mt-5"} onClick={setJournaldetail}>

                                        {loading ? <div className="spinner-border text-white" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : <>  Buy Now <FontAwesomeIcon icon={faAngleRight} /></>}


                                    </button>
                                    <span className="text-danger mt-2 d-block">{errMsg !== "" && errMsg}</span>
                                </div>
                                <h4 className="mt-5">
                                    <span className="mb-0">
                                        Call for Assistance
                                    </span>

                                    <Link className="btn border-0 d-block w-100" href={`tel:+91 ${journalDetail.assistance_call}`}>
                                        <FontAwesomeIcon icon={faPhone} /> {journalDetail.assistance_call}
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade customModal" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Subscription Plan
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <div className="row g-3">
                                {journalDetail.subscription_plan &&
                                    journalDetail.subscription_plan.map((plan, i) => (
                                        <div className="col-lg-4 col-md-6 col-12" key={i}>
                                            <div className={`pricingTable bg-white advance-pricing ${subscription.price === plan.price ? 'border border-danger' : ''}`}>
                                                <div className="price-value">
                                                    ₹{plan.price}
                                                    <span className="month">{plan.duration}</span>
                                                </div>
                                                <h3 className="title">{plan.plan}</h3>
                                                <ul className="pricing-content" dangerouslySetInnerHTML={{ __html: plan.details }} />
                                                <button
                                                    className="pricingTable-signup"
                                                    style={{ border: 'none' }}
                                                    onClick={() => subscribe(plan)}
                                                     data-bs-dismiss="modal"
                                                >
                                                    Subscribe Now
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {isOpen && (
                <LazyYoutube
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    videoId={journalDetail.video_id}
                    setViews={setViews}
                />
            )}

            {/* Bottom of section observer trigger */}
            <div ref={pageBottomTriggerRef} style={{ height: "1px", marginBottom: "-1px" }}></div>
        </>
    );
}
