"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import organisation from "../../data/organisation.json";

export default function ParticipateOrganisation() {
    const sidebarRef = useRef(null);
    const pageTopTriggerRef = useRef(null);
    const pageBottomTriggerRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const circleRef = useRef(null);

    useEffect(() => {
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

    return (
        <>
            {/* Top of section observer trigger */}
            <div ref={pageTopTriggerRef} style={{ height: "1px", marginTop: "-1px" }}></div>

            <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-12 col-12">
                    <div
                        ref={sidebarRef}
                        className={`participateSidebar ${isSticky ? "stickSideBar" : ""}`}
                    >
                        <figure ref={circleRef}>
                            <Image src="/images/svg/gps.svg" className="img-fluid" alt="image" width={150} height={150} />
                        </figure>
                        <h4>
                            <span>Introduce with</span> PARTICIPATORY ORGANISATION
                        </h4>
                        <p>
                            Supporters from different organizations who participated in remarkable program.
                        </p>
                        <Link className="btn btn-primary" href="/">
                            Expolere All
                        </Link>
                    </div>
                </div>

                <div className="col-xl-8 col-lg-7 col-md-12 col-12 logoSecMain">
                    <div className="row no-gutters row-deck find-job">
                        {organisation.map((card, index) => {
                            const itemsPerRow = 2;
                            const row = Math.floor(index / itemsPerRow);
                            const col = index % itemsPerRow;

                            // This will alternate diagonally (checkerboard style)
                            const isLight = (row + col) % 2 === 0;

                            return (
                                <div className="col-md-6 col-12" key={card.id}>
                                    <div className={isLight ? "bg-light p-0 mt-5 mt-md-0 box-shadow2 border-transparent" : "p-0 mt-5 mt-md-0 border box-shadow2"}>
                                        <div className="card-body text-center">
                                            <div className={isLight ? "bg-white icon-bg icon-service text-purple" : "bg-light icon-bg icon-service text-purple"}>
                                                <figure>
                                                    <Image src={card.img} alt="Logo" className="img-fluid" fill />
                                                </figure>
                                            </div>
                                            <h6 className="card-title">{card.title}</h6>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Bottom of section observer trigger */}
            <div ref={pageBottomTriggerRef} style={{ height: "1px", marginBottom: "-1px" }}></div>
        </>
    );
}
