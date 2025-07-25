"use client";
import { faViadeo } from "@fortawesome/free-brands-svg-icons";
import { faAngleUp, faChalkboardTeacher, faClockRotateLeft, faGamepad, faLightbulb, faRobot, faUser, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default  function AboutSection() {
    const pathname = usePathname();
    return (
        <>
            <section className="sectionSpace aboutMain sptb bg-f5d4cd">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6 col-12 aboutBody order-md-1 order-2 pe-md-5">
                            <h3>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </h3>
                            <p>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has .
                            </p>

                            {
                                pathname !== "/about-us" && (
                                    <Link className="btn btn-warning mt-2 float-md-end" href="/about-us">
                                        Know more
                                    </Link>
                                )
                            }
                        </div>

                        <div className="col-md-6 col-12 order-md-2 order-1">
                            <div className="about-image">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-6 col-md-6 col-6">
                                        <div className="image wow animate__animated animate__fadeInLeft">
                                            <img src="/images/about/about-1.webp" alt="About Us" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-6 col-md-6 col-6">
                                        <div className="image wow animate__animated animate__fadeInDown">
                                            <img src="/images/about/about-2.webp" alt="About Us" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-6 col-md-6 col-6">
                                        <div className="image wow animate__animated animate__fadeInUp">
                                            <img src="/images/about/about-3.webp" alt="About Us" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-sm-6 col-md-6 col-6">
                                        <div className="image wow animate__animated animate__fadeInRight">
                                            <img src="/images/about/about-4.webp" alt="About Us" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            pathname === "/about-us" && (
                                <div className="col-12 aboutBody order-md-3 order-3 mt-5">
                                    <p>
                                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has .
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="shape1" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape1.png" alt="image" />
                </div>
                <div className="shape3" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape3.png" alt="image" />
                </div>
                <div className="shape4" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape4.png" alt="image" />
                </div>
            </section>
        </>
    )
}