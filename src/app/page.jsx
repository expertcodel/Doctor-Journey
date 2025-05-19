import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faEuro, faEuroSign, faStar } from "@fortawesome/free-solid-svg-icons";
import Select2Component from "./component/Select2Component";
import ThumbnailSearchCarousel from "./component/ThumbnailSearchCarousel";
import ThumbnailSponsorCarousel from "./component/ThumbnailSponsorCarousel";
import ThumbnailBlogsCarousel from "./component/ThumbnailBlogsCarousel";
import TestimonialsCarousel from "./component/Testimonials";
import DaysCalculator from '@/app/component/DaysCalculator'
// import doctorCards from "@/data/doctorCards.json";
//  import doctorProfile from "@/data/doctorProfile.json";

export default async function Home() {


  let blogList = [];
  let testimonialList = [];
  let doctorProfile =[];
   let doctorCards = [];

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
      doctorCards=res.videolist;
    }


  } catch (error) {

    console.log("fetching failed", error);


  }

  return (
    <section>
      {/* heroBanner */}
      <section className="heroBanner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-12 bodyContent">
              <h1>
                <span>DOCTOR'S  JOURNEY SPECIALS</span>
                CURING CANCER
                <em>NEW RELEASE</em>
              </h1>
              <ul className="list-unstyled">
                <li>
                  2024
                </li>
                <li>
                  Season 1
                </li>
                <li>
                  Hindi/English
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas dictum efficitur ligula, sit amet iaculis magna vehicula eu. Sed quis gravida magna, vel sodales elit. Mauris ac lacus fermentum, finibus lorem ac, volutpat ligula. Suspendisse orci orci, egestas sit amet posuere eget, malesuada eget tortor. In eget aliquam dolor. Praesent sit amet odio ex. Vestibulum aliquam convallis nisl, quis finibus dolor bibendum eget.
              </p>
              <Link className="btn btn-primary mt-2 float-md-end" href="/">
                Subscribe to watch
              </Link>
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
                    Search Your favourite videos
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

      {/* about */}
      <section className="sectionSpace aboutMain sptb bg-white">
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-12 aboutBody order-md-1 order-2">
              <h3>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </h3>
              <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has .
              </p>

              <Link className="btn btn-primary mt-2 float-md-end" href="/">
                See more
              </Link>
            </div>

            <div className="col-md-5 col-12 order-md-2 order-1">
              <figure>
                <Image width={467} height={418} src="/images/index/about.jpg" alt="About Us" className="img-fluid" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* doctor JOURNEY */}
      <section className="sectionSpace sptb bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="mainHeading">
                New from doctor's journey
                <Link href="/doctors">Browse all journey</Link>
              </h4>
            </div>
          </div>

        <div className="row g-md-4 g-3">
            {doctorCards.map((card) => (
               <div className="col-md-4 col-12 drCard" key={card.videoId}>
                                <div className="card mb-0">
                                    <div className="item7-card-img">
                                        <Link href={`/doctors/${card.videoId}`} />
                                        <Image src={card.thumbnailImage} width={368} height={190} alt="img" className="cover-image" unoptimized />
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
                                               
                                                <span> <DaysCalculator targetDate={card.publishedDate} today={new Date().toLocaleDateString()} /></span>
                                                {/* <span></span> */}
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
        </div>
      </section>

      {/* users JOURNEY */}
      <section className="sectionSpace sptb bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="mainHeading">
                Recommended for users
                <Link href="/doctor-profile">Browse all activity</Link>
              </h4>
            </div>
          </div>

          <div className="row g-md-4 g-3 drCard userJourneyCard">
            <div className="col-md-5 col-12">
              <div className="card mb-0 h-276">
                <div className="item7-card-img">
                  <Link href="javascript:void(0);" />
                  <Image src="/images/doctor-profile/profile-2.jpg" width={466} height={276} alt="img" className="cover-image" />
                  <div className="play-button">
                    <span className="triangle"></span>
                  </div>
                </div>
                <div className="card-body">
                  <Link href="/" className="text-dark">
                    <h4 className="font-weight-semibold">Dr. Alice Kim</h4>
                  </Link>
                  <p className="cardDescription">
                    Right now, invisible signals are flying through the air all around you. Massive radio waves carry information between computers, GPS systems, cell phones, and more.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-7 col-12">
              <div className="row g-md-4 g-3">
                <div className="col-md-6 col-12">
                  <div className="card mb-0">
                    <div className="item7-card-img">
                      <Link href="javascript:void(0);" />
                      <Image src="/images/doctor-profile/profile-1.jpg" width={368} height={190} alt="img" className="cover-image" />
                      <div className="play-button">
                        <span className="triangle"></span>
                      </div>
                    </div>
                    <div className="card-body">
                      <Link href="/" className="text-dark">
                        <h4 className="font-weight-semibold">Dr. Alice Kim</h4>
                      </Link>
                      <p>
                        Why violence is rising with global temperatures
                      </p>
                      <p className="cardDescription">
                        Right now, invisible signals are flying through the air all around you. Massive radio waves carry information between computers, GPS systems, cell phones, and more.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="card noImg mb-0">
                    <div className="card-body pt-0">
                      <Link className="noImgLink" href="/" />
                      <p>
                        Why violence is rising with global temperatures
                      </p>
                      <p className="cardDescription">
                        Right now, invisible signals are flying through the air all around you. Massive radio waves carry information between computers, GPS systems, cell phones, and more.
                      </p>
                    </div>
                    <div className="card-body">
                      <Link className="noImgLink" href="/" />
                      <p>
                        Why violence is rising with global temperatures
                      </p>
                      <p className="cardDescription">
                        Right now, invisible signals are flying through the air all around you. Massive radio waves carry information between computers, GPS systems, cell phones, and more.
                      </p>
                      <Link href="/doctors" className="btn btn-primary mt-2">
                        See more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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

      {/* Our Sponsor */}
      <section className="sectionSpace sptb bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title center-block text-center">
                <h3>Our Sponsor</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <ThumbnailSponsorCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Our Sponsor */}
      <section className="sectionSpace sptb position-relative pattern">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title center-block text-center">
                <h3 className="text-white position-relative">Testimonials</h3>
              </div>
            </div>
          </div>

          <div className="row g-md-4 g-3">
            <div className="col-md-8 offset-md-2 col-12">
              <TestimonialsCarousel testimonialList={testimonialList}/>
            </div>
          </div>
        </div>
      </section>

      {/* Our Blogs */}
      <section className="sectionSpace sptb bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="mainHeading">
                Our Blogs
                <Link href="/">Browse all activity</Link>
              </h4>
            </div>
          </div>

          <div className="row g-md-4 g-3">
            <div className="col-12">
              <ThumbnailBlogsCarousel blogList={blogList}/>
            </div>
          </div>
        </div>
      </section>

      {/* Our Sponsor */}
      <section className="sectionSpace sptb bg-white">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title center-block text-center">
                <h3>Frequently Asked Questions</h3>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="accordion accordion-box" id="faqAccordion">
                {/* Block 1 */}
                <div className="accordion-item block">
                  <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button acc-btn" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Interdum et malesuada fames ac ante ipsum
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                    <div className="accordion-body content">
                      Suspendisse finibus urna mauris, vitae consequat quam vel.
                    </div>
                  </div>
                </div>

                {/* Block 2 */}
                <div className="accordion-item block">
                  <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button acc-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Maecenas condimentum sollicitudin ligula
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                    <div className="accordion-body content">
                      Suspendisse finibus urna mauris, vitae consequat quam vel.
                    </div>
                  </div>
                </div>

                {/* Block 3 */}
                <div className="accordion-item block">
                  <h2 className="accordion-header" id="headingThree">
                    <button className="accordion-button acc-btn collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Duis rhoncus orci ut metus rhoncus
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                    <div className="accordion-body content">
                      Suspendisse finibus urna mauris, vitae consequat quam vel.
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
