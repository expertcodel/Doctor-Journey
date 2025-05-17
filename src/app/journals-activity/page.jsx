import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/app/component/Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faEuro, faEuroSign, faStar } from "@fortawesome/free-solid-svg-icons";
import Select2Component from "@/app/component/Select2Component";
import ThumbnailSearchCarousel from "@/app/component/ThumbnailSearchCarousel";
import ThumbnailSponsorCarousel from "@/app/component/ThumbnailSponsorCarousel";
import ThumbnailBlogsCarousel from "@/app/component/ThumbnailBlogsCarousel";
import TestimonialsCarousel from "@/app/component/Testimonials";
import doctorCards from "@/data/doctorCards.json";
import JournalsThumbCarousel from "../component/JournalsThumbCarousel";
//  import doctorProfile from "@/data/doctorProfile.json";

export default async function JournalsActivities() {

  return (
    <section>
        {/*Breadcrumb*/}
        <Breadcrumb title="Journals Activities" />

        {/* users JOURNEY */}
        <section className="sectionSpace sptb bg-white">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h4 className="mainHeading">
                            Our Journals Activities
                        </h4>
                    </div>
                </div>

                <div className="row g-3">
                    {/* jrLargeCard */}
                    <div className="col-md-4 col-12 jrLargeCard">
                        {/*** card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="cat-item">
                                    <Link href="/" />
                                    <div className="cat-img bg-primary-transparent">
                                        <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                                    </div>
                                    <div className="cat-desc">
                                        <h5>
                                            Walk into the Shadow
                                        </h5>
                                        <small className="badge">
                                            INR 1999/
                                        </small>
                                        <div className="catFooter">
                                            <Link href="/hello" className="btn btn-warning">
                                                Read Now
                                            </Link>
                                            <Link href="/hello2" className="btn btn-primary">
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* jrLargeCard */}
                    <div className="col-md-4 col-12 jrLargeCard">
                        {/*** card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="cat-item">
                                    <Link href="/" />
                                    <div className="cat-img bg-primary-transparent">
                                        <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                                    </div>
                                    <div className="cat-desc">
                                        <h5>
                                            Walk into the Shadow
                                        </h5>
                                        <small className="badge">
                                            INR 1999/
                                        </small>
                                        <div className="catFooter">
                                            <Link href="/hello" className="btn btn-warning">
                                                Read Now
                                            </Link>
                                            <Link href="/hello2" className="btn btn-primary">
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* jrLargeCard */}
                    <div className="col-md-4 col-12 jrLargeCard">
                        {/*** card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="cat-item">
                                    <Link href="/" />
                                    <div className="cat-img bg-primary-transparent">
                                        <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                                    </div>
                                    <div className="cat-desc">
                                        <h5>
                                            Walk into the Shadow
                                        </h5>
                                        <small className="badge">
                                            INR 1999/
                                        </small>
                                        <div className="catFooter">
                                            <Link href="/hello" className="btn btn-warning">
                                                Read Now
                                            </Link>
                                            <Link href="/hello2" className="btn btn-primary">
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* jrLargeCard */}
                    <div className="col-md-4 col-12 jrLargeCard">
                        {/*** card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="cat-item">
                                    <Link href="/" />
                                    <div className="cat-img bg-primary-transparent">
                                        <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                                    </div>
                                    <div className="cat-desc">
                                        <h5>
                                            Walk into the Shadow
                                        </h5>
                                        <small className="badge">
                                            INR 1999/
                                        </small>
                                        <div className="catFooter">
                                            <Link href="/hello" className="btn btn-warning">
                                                Read Now
                                            </Link>
                                            <Link href="/hello2" className="btn btn-primary">
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* jrLargeCard */}
                    <div className="col-md-4 col-12 jrLargeCard">
                        {/*** card */}
                        <div className="card">
                            <div className="card-body">
                                <div className="cat-item">
                                    <Link href="/" />
                                    <div className="cat-img bg-primary-transparent">
                                        <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={347} height={332} alt=""  />
                                    </div>
                                    <div className="cat-desc">
                                        <h5>
                                            Walk into the Shadow
                                        </h5>
                                        <small className="badge">
                                            INR 1999/
                                        </small>
                                        <div className="catFooter">
                                            <Link href="/hello" className="btn btn-warning">
                                                Read Now
                                            </Link>
                                            <Link href="/hello2" className="btn btn-primary">
                                                Buy Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
  );
}