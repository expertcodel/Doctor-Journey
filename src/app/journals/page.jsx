import Image from "next/image";
import Link from "next/link";
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

export default async function Journals() {


  let blogList = [];
  let testimonialList = [];
  let doctorProfile =[];

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/home`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      blogList = res.bloglist;
      testimonialList=res.testimoniallist;
      doctorProfile=res.doctorprofile
    }


  } catch (error) {

    console.log("fetching failed", error);


  }

  return (
    <section>
      {/* heroBanner */}
      <section className="heroBanner withSliders">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <Image src="/images/banners/banner1.jpg" width={1920} height={600} className="d-block w-100" alt="Journals" />
                </div>
                <div className="carousel-item">
                    <Image src="/images/banners/banner2.jpg" width={1920} height={600} className="d-block w-100" alt="Journals" />
                </div>
                <div className="carousel-item">
                    <Image src="/images/banners/banner3.jpg" width={1920} height={600} className="d-block w-100" alt="Journals" />
                </div>
            </div>
        </div>
      </section>

      {/* search engine */}
      <section className="banner-1 cover-image sptb-3 pb-14 sptb-tab bg-background2"
        data-image-src="../assets/images/banners/banner1.jpg">
        <div className="header-text1 mb-0">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                <div className="text-center text-white ">
                  <h1 className="mb-5">
                    Search Your favourite Journals
                  </h1>
                </div>
                <div className="search-background bg-transparent">
                  <div className="form row no-gutters ">
                    <div className="col-xl-4 col-lg-3 col-md-12 mb-0 bg-white form-group">
                      <input type="text" className="form-control input-lg br-tr-md-0 br-br-md-0" id="text4" placeholder="Enter Your Keywords" />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-12 mb-0 bg-white form-group">
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
                    </div>
                    <div className="col-xl-2 col-lg-3 col-md-12 mb-0">
                      <Link href="/" className="btn btn-lg btn-block btn-secondary br-tl-md-0 br-bl-md-0">
                        Search Here
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /header-text */}

        <div className="header-slider-img">
          <div className="container">
            <ThumbnailSearchCarousel />
          </div>
        </div>
      </section>

      {/* offer */}
      <section className="sectionSpace aboutMain sptb bg-white">
        <div className="container">
          <div className="row g-md-0 g-3">
            <div className="col-md-6 col-12">
                <div className="offerBooksCard bgPurple">
                    <figure>
                        <Image width={211} height={184} src="/images/journals/books/offer-thumb/book-1.webp" alt="Book" className="img-fluid" />
                        <figcaption>
                            20% <span>Off</span>
                        </figcaption>
                    </figure>
                    <aside>
                        <h3>Get Membership</h3>
                        <ul className="list-unstyled">
                            <li>For your individuals</li>
                            <li>Get started quickly with unlimited</li>
                            <li>catalog access & easy-to-use tools</li>
                        </ul>
                    </aside>
                </div>
            </div>

            <div className="col-md-6 col-12">
                <div className="offerBooksCard bgYellow">
                    <figure>
                        <Image width={211} height={184} src="/images/journals/books/offer-thumb/book-2.webp" alt="Book" className="img-fluid" />
                        <figcaption>
                            20% <span>Off</span>
                        </figcaption>
                    </figure>
                    <aside>
                        <h3>Get Membership</h3>
                        <ul className="list-unstyled">
                            <li>For your individuals</li>
                            <li>Get started quickly with unlimited</li>
                            <li>catalog access & easy-to-use tools</li>
                        </ul>
                    </aside>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journals Overview */}
      <section className="sectionSpace sptb bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="mainHeading">
                Our Favourite Journals
                <Link href="/journals-activity">Browse all activity</Link>
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
                <div className="journalsMain">
                    <div className="row">
                        {/***** jrShortCard *****/}
                        <div className="col-lg-2 col-md-3 col-12 jrShortCard">
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href="/" />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={68} height={89} alt=""  />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                Walk into the Shadow
                                            </h5>
                                            <small className="badge">
                                                INR 1999/
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href="/" />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={68} height={89} alt=""  />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                Walk into the Shadow
                                            </h5>
                                            <small className="badge">
                                                INR 1999/
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href="/" />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={68} height={89} alt=""  />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                Walk into the Shadow
                                            </h5>
                                            <small className="badge">
                                                INR 1999/
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href="/" />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={68} height={89} alt=""  />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                Walk into the Shadow
                                            </h5>
                                            <small className="badge">
                                                INR 1999/
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-3 col-12 jrLargeCard">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-3 col-12 jrLargeCard">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/***** jrShortCard *****/}
                        <div className="col-lg-2 col-md-3 col-12 jrShortCard">
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href="/" />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={68} height={89} alt=""  />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                Walk into the Shadow
                                            </h5>
                                            <small className="badge">
                                                INR 1999/
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href="/" />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={68} height={89} alt=""  />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                Walk into the Shadow
                                            </h5>
                                            <small className="badge">
                                                INR 1999/
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href="/" />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={68} height={89} alt=""  />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                Walk into the Shadow
                                            </h5>
                                            <small className="badge">
                                                INR 1999/
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*** card */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="cat-item">
                                        <Link href="/" />
                                        <div className="cat-img bg-primary-transparent">
                                            <Image unoptimized src="/images/journals/books/walk-into-the-shadow.webp" className="img-fluid" width={68} height={89} alt=""  />
                                        </div>
                                        <div className="cat-desc">
                                            <h5>
                                                Walk into the Shadow
                                            </h5>
                                            <small className="badge">
                                                INR 1999/
                                            </small>
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
      </section>

      {/* users JOURNEY */}
      <section className="sectionSpace sptb bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="mainHeading">
                Our Favourite Journals
                <Link href="/journals-activity">See all</Link>
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

      {/* doctor JOURNEY short */}
      <section className="sectionSpace sptb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="mainHeading">
                POPULAR ON DOCTOR'S JOURNEY
                <Link href="/doctor-profile">Browse all activity</Link>
              </h4>
            </div>
          </div>

          <div className="row g-md-4 g-3">
            {/* drShortDesc */}
            {
              doctorProfile.map((item, index) => (
                <div key={index} className="col-lg-3 col-md-4 col-12 drShortDesc">
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="cat-item">
                        <Link href={`/doctor-profile/${item.doctorId}`} />
                        <div className="cat-img bg-primary-transparent brround">
                          <Image  unoptimized src={item.profileImage} className="img-fluid" width={155} height={80} alt=""  />
                        </div>
                        <div className="cat-desc">
                          <h5>
                            {item.doctorName} <span>{item.qualification}</span>
                          </h5>
                          <small className="badge">
                            view Details
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* subscription */}
      <section className="sectionSpace sptb bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
                <div className="subscriptionBooksCard bgPink">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <figure>
                                <Image width={607} height={494} src="/images/journals/books/subsBook.png" alt="Book" className="img-fluid" />
                            </figure>
                        </div>
                        <div className="col-md-6 col-12">
                            <aside>
                                <h3>
                                    Get 20% Off Your Order !
                                </h3>
                                <p>
                                    Enter your email and receive a 10% discount on your next order !
                                </p>
                                <div className="input-group w-100">
                                    <input type="text" className="form-control  border" placeholder="Email" />
                                    <div className="">
                                        <button type="button" className="btn btn-primary ">
                                            {" "} Subscribe{" "}
                                        </button>
                                    </div>
                                </div>
                            </aside>
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
