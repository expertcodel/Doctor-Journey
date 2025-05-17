import Link from "next/link";
import Breadcrumb from "@/app/component/Breadcrumb";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faEye, faStar, faStarHalf, faUser } from "@fortawesome/free-solid-svg-icons";
import JournalsThumbCarousel from "../../component/JournalsThumbCarousel";

export default function JournalsDetails() {
    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="Journals Details" />

            {/* Doctor Details*/}
            <section className="sptb journalsDetails">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 col-12">
                            {/*imgSec*/}
                            <div className="card imgSec">
                                <div className="card-body">
                                    <div className="item7-card-img">
                                        <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                                        <div className="item7-card-text">
                                            <span className="badge bg-pink">by Author Name</span>
                                        </div>
                                    </div>
                                    <div className="item7-card-desc">
                                        <Link href="/hello2" className="btn btn-primary">
                                            Buy Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7 col-12">
                            <div className="productsDetails">
                                <h3 className="title">
                                    Walk into the shadow
                                    <span>Paperback – 24 April 2025</span>
                                </h3>
                                <div className="productsReview">
                                    <span className="reviewText">
                                        4.2 <FontAwesomeIcon icon={faStar} />
                                    </span>
                                    <span className="reviewContent">
                                        reviews
                                    </span>
                                </div>
                                <div className="priceSec">
                                    <span className="newPrice">₹664</span>
                                    <span className="oldPrice">₹725</span>
                                </div>
                                <p className="shortDec">
                                    <strong>FROM THE SUNDAY TIMES BESTSELLING AUTHOR & GLOBAL TIK TOK SENSATION, Author Name</strong>
                                </p>
                                <p className="shortDec">
                                    This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids. Lorem ipsum dolor
                                    sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt et.
                                </p>
                                <p className="shortDec">
                                    This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of a treasure buried near the Pyramids. Lorem ipsum dolor
                                    sit amet.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Sponsor */}
            <section className="sectionSpace sptb bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mainHeading">
                                Our Related Journals
                                <Link href="/doctor-profile">See all</Link>
                            </h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <JournalsThumbCarousel />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}