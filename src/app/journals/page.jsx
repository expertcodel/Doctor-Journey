import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faEuro, faEuroSign, faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import Select2Component from "../component/Select2Component";
import ThumbnailSearchCarousel from "../component/ThumbnailSearchCarousel";
import ThumbnailSponsorCarousel from "../component/ThumbnailSponsorCarousel";
import ThumbnailBlogsCarousel from "../component/ThumbnailBlogsCarousel";
import TestimonialsCarousel from "../component/Testimonials";
// import doctorCards from "@/data/doctorCards.json";
import JournalsThumbCarousel from "../component/JournalsThumbCarousel";
import doctorProfile from "../../data/doctorProfile.json";
import JournalsBanner from "../component/JournalsBanner";
import JournalsVerticalCarousel from "../component/JournalsVerticalCarousel";
import SearchComponent from "../component/SearchComponent";

export default async function Journals() {

  let sliderList = [];
  let offerList = [];
  let doctorProfile = [];
  let journalList = [];
  let journalLeftlist = [];
  let journalCenterlist = [];
  let journalRightlist = [];
  let specialization = [];

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/journal`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      sliderList = res.sliderlist;
      offerList = res.offerlist;
      doctorProfile = res.doctorlist
      journalList = res.journallist
      journalLeftlist = res.journalleftlist;
      journalCenterlist = res.journalcenterlist;
      journalRightlist = res.journalrightlist;
      specialization=res.specialization
    }


  } catch (error) {

    console.log("fetching failed", error);


  }

  return (
    <section>
      
      <JournalsBanner />

      {/* heroBanner */}
      {/* <section className="heroBanner withSliders">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {sliderList.map((_, i) => <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={i} className={i === 0 && "active"} aria-current="true" aria-label={`Slide ${i + 1}`} />)}

          </div>
          <div className="carousel-inner">
            {sliderList.map((item, i) => <div className={i === 0 ? "carousel-item active" : "carousel-item"} key={item.sliderId}>
              <Image src={item.sliderImage} fill className="d-block w-100" alt="Journals" unoptimized />
            </div>)}

          </div>
        </div>
      </section> */}

      {/* search engine */}
      {/* <section className="banner-1 cover-image sptb-3 pb-14 sptb-tab bg-background2"
        data-image-src="../assets/images/banners/banner1.jpg">
        <div className="header-text1 mb-0">
          <div className="container">
            <div className="row">
              <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                <div className="text-center text-white ">
                  <h1 className="mb-5">
                    Search Your Favourite Journals
                  </h1>
                </div>
                <div className="search-background bg-transparent">
                  <div className="form row no-gutters searchBoxWithDiv">
                    <div className="col-md-6 col-12 mb-0 bg-white form-group searchBoxMain">
                      <span className="searchIcon"><FontAwesomeIcon icon={faSearch} /></span>
                      <input type="text" className="form-control input-lg br-tr-md-0 br-br-md-0" id="text4" placeholder="Enter Your Keywords" />
                    </div>
                   
                    <div className="col-md-6 col-12 select2-lg  mb-0 bg-white form-group">
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
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      

        <div className="header-slider-img">
          <div className="container">
            <ThumbnailSearchCarousel specialization={specialization}/>
          </div>
        </div>
      </section> */}

       <SearchComponent specialization={specialization}/>

      {/* offer */}
      <section className="sectionSpace aboutMain sptb bg-white">
        <div className="container">
          <div className="row g-md-0 g-3">
            {offerList.map((offer, i) => <div className="col-md-6 col-12" key={offer.offerId}>
              <div className={i % 2 === 0 ? 'offerBooksCard bgYellow' : `offerBooksCard bgPurple`}>
                <figure>
                  <Image width={211} height={184} src={offer.offerImage} alt="Book" className="img-fluid" unoptimized />
                  <figcaption>
                    {/* 20% <span>Off</span> */}
                    {offer.offerDiscount}
                  </figcaption>
                </figure>
                <aside dangerouslySetInnerHTML={{ __html: offer.offerContent }}>

                </aside>
              </div>
            </div>)}

            {/* <div className="col-md-6 col-12">
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
            </div> */}
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
                    <JournalsVerticalCarousel journalLeftlist={journalLeftlist} />
                  </div>

                  {journalCenterlist.map((journal) => <div className="col-lg-4 col-md-3 col-12 jrLargeCard" key={journal.journalsId}>
                    {/*** card */}
                    <div className="card">
                      <div className="card-body">
                        <div className="cat-item">
                          <Link href={`/journals/${journal.journalsUrl}`} />
                          <div className="cat-img bg-primary-transparent">
                            <Image unoptimized src={journal.imageUrl} className="img-fluid" fill alt="" />
                          </div>
                          <div className="cat-desc">
                            <h5>
                              {journal.journalsName}
                            </h5>
                            <small className="badge">
                              INR {journal.price_level_1}/
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>)}

                  {/***** jrShortCard *****/}
                  <div className="col-lg-2 col-md-3 col-12 jrShortCard">
                    {/*** card */}
                    <JournalsVerticalCarousel journalRightlist={journalRightlist} />
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
                Our Journals
                <Link href="/journals-activity">See all</Link>
              </h4>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <JournalsThumbCarousel journalList={journalList} />
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
                        <Link href={`/doctor-profile/${item.userId}`} />
                        <div className="cat-img bg-primary-transparent brround">
                          <Image unoptimized src={item.profileImage} className="img-fluid" fill alt="" />
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
                      <h3 className="text-center">
                        To click the below link <br /> get 20% Off <br /> for your Order !
                      </h3>
                      {/* <p>
                        Enter your email and receive a 10% discount on your next order !
                      </p> */}
                      <button type="button" className="btn btn-primary btn-lg">
                        {" "} Explore More{" "}
                      </button>
                      {/* <div className="input-group w-100">
                        <input type="text" className="form-control  border" placeholder="Email" />
                        <div className="">
                          <button type="button" className="btn btn-primary ">
                            {" "} Subscribe{" "}
                          </button>
                        </div>
                      </div> */}
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
