"use client"
import { useAuth } from "@/context/AuthContext";
import { faFacebook, faGooglePlus, faLinkedin, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faAnglesDown, faArrowAltCircleDown, faChevronDown, faClipboardCheck, faClipboardList, faHome, faPowerOff, faSignIn, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useEffect, useState } from "react"

export default function Header() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { user, logout } = useAuth();
    const pathName = usePathname();

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    }

    return (
        <>
            {/*Header Main*/}
            <div className={`header-main ${isMenuVisible ? "active" : ""}`}>
        
                {/*Top Bar*/}
                <div className="top-bar">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-7 col-lg-7 col-sm-4 col-7">
                                <div className="top-bar-left d-flex">
                                    <div className="clearfix">
                                        <ul className="socials">
                                            <li>
                                                <a className="social-icon" href="javascript:void(0);">
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                </a>
                                            </li>
                                            <li>
                                                <a className="social-icon" href="javascript:void(0);">
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </a>
                                            </li>
                                            <li>
                                                <a className="social-icon" href="javascript:void(0);">
                                                    <FontAwesomeIcon icon={faLinkedin} />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-5 col-sm-8 col-5">
                                <div className="top-bar-right">
                                    <ul className="custom">
                                        {
                                            user ? (
                                                <li className="dropdown">
                                                    <Link href="javascript:void(0);" className="" data-bs-toggle="dropdown">
                                                        <FontAwesomeIcon icon={faHome} className="me-1" />
                                                        <span className="me-1">My Dashboard</span>
                                                        <FontAwesomeIcon icon={faChevronDown} />
                                                    </Link>
                                                    <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                                        <Link href="/user-dashboard/profile" className="dropdown-item">
                                                            <FontAwesomeIcon icon={faUser} /> My Profile
                                                        </Link>
                                                        <Link className="dropdown-item" href="/user-dashboard/my-subscription">
                                                            <FontAwesomeIcon icon={faClipboardList} /> My Subscription
                                                        </Link>
                                                        <Link className="dropdown-item" href="/user-dashboard/upgrade-subscription">
                                                            <FontAwesomeIcon icon={faClipboardCheck} /> Upgrade Subscription
                                                        </Link>
                                                        <button className="dropdown-item" onClick={logout}>
                                                            <FontAwesomeIcon icon={faPowerOff} /> Log out
                                                        </button>
                                                    </div>
                                                </li>
                                            ) : (
                                                <>
                                                    <li>
                                                        <Link href="/register" className="">
                                                            <FontAwesomeIcon icon={faUser} className="me-1" />
                                                            <span>Register</span>
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/login" className="">
                                                            <FontAwesomeIcon icon={faSignIn} className="me-1" />
                                                            <span>Login</span>
                                                        </Link>
                                                    </li>
                                                </> 
                                            )                                           
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Top Bar*/}


                {/* Mobile Header */}
                <div className="sticky">
                    <div className="horizontal-header clearfix">
                        <div className="container">
                            <a id="horizontal-navtoggle" className="animated-arrow" onClick={toggleMenu}>
                                <span />
                            </a>
                            <span className="smllogo">
                                <Image
                                    src="/images/logo.svg"
                                    className="header-brand-img desktop-logo"
                                    alt="logo" width={145} height={62}
                                />
                                {/* <Image
                                    src="/images/brand/logo-white.png"
                                    className="header-brand-img dark-logo"
                                    alt="logo" width={152} height={40}
                                /> */}
                            </span>
                            {
                                user ? 
                                <Link className="btn btn-info ad-post mt-1 callusbtn packages" href="/user-dashboard">
                                    Restaurants
                                </Link> :
                                <Link className="btn btn-info ad-post mt-1 callusbtn packages" href="/subscribe">
                                    Subscribe Now
                                </Link>
                            }
                        </div>
                    </div>
                </div>
                {/* /Mobile Header */}
                {/*Horizontal-main*/}
                <div className="horizontal-main clearfix">
                    <div className="horizontal-mainwrapper container clearfix">
                        <Link className="desktoplogo" href="/">
                            <Image
                                src="/images/logo.svg"
                                className="header-brand-img desktop-logo"
                                alt="logo" width={150} height={40}
                            />
                            {/* <Image
                                src="/images/brand/logo-white.png"
                                className="header-brand-img dark-logo"
                                alt="logo" width={152} height={40}
                            /> */}
                        </Link>
                        {/*Nav*/}
                        <nav className="horizontalMenu clearfix d-md-flex">
                            <div className="horizontal-overlapbg" onClick={toggleMenu} />
                            <ul className="horizontalMenu-list">
                                <li className="mobileToggleHeading">
                                    <span className="toggleLogo">
                                        <Image
                                            src="/images/logo.svg"
                                            className="header-brand-img desktop-logo"
                                            alt="logo" width={145} height={62}
                                        />
                                    </span>
                                    <a id="horizontal-navtoggle" className="animated-arrow" onClick={toggleMenu}>
                                        <span />
                                    </a>
                                </li>
                                <li>
                                    <Link href="/"
                                        className={`link ${
                                            pathName === '/' ? 'active' : ''
                                        }`}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about-us"
                                        className={`link ${
                                            pathName === '/about-us' ? 'active' : ''
                                        }`}
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/journals"
                                        className={`link ${
                                            pathName === '/journals' ? 'active' : ''
                                        }`}
                                    >
                                        Journals
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/journey"
                                        className={`link ${
                                            pathName === '/journey' ? 'active' : ''
                                        }`}
                                    >
                                        Journey
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/events"
                                        className={`link ${
                                            pathName === '/events' ? 'active' : ''
                                        }`}
                                    >
                                        Events
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact-us"
                                        className={`link ${
                                            pathName === '/contact-us' ? 'active' : ''
                                        }`}
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>

                            {!user && (
                                <ul className="mb-0 ps-2 create-resume-btn">
                                    <li className="d-none d-lg-flex">
                                        <span>
                                            <Link className="btn btn-info ad-post mt-1" href="/">
                                                Book Your Slot
                                            </Link>
                                        </span>
                                    </li>
                                </ul>
                            )}

                        </nav>
                        {/*/Nav*/}
                    </div>
                </div>
                {/*/Horizontal-main*/}
            </div>
            {/*/Header Main*/}
        </>
    )
}