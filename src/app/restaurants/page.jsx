import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Restaurant() {
  return (
    <>
      {/*filter Section*/}
      <section>
        <div
          className="banner-1 cover-image sptb-3 pb-8 sptb-tab bg-background2"
          data-image-src="../assets/images/banners/banner1.jpg"
        >
          <div className="header-text mb-0">
            <div className="container">
              <div className="text-center text-white mb-7">
                <h1 className="mb-1">Find The Best Job For Your Future</h1>
                <p>
                  It is a long established fact that a reader will be distracted by
                  the readable.
                </p>
              </div>
              <div className="row">
                <div className="col-xl-10 col-lg-12 col-md-12 d-block mx-auto">
                  <div className="search-background bg-transparent">
                    <div className="form row no-gutters ">
                      <div className="col-xl-4 col-lg-3 col-md-12 mb-0 bg-white form-group">
                        <input
                          type="text"
                          className="form-control input-lg br-tr-md-0 br-br-md-0"
                          id="text4"
                          placeholder="Search Jobs"
                        />
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-12 mb-0 bg-white form-group">
                        <input
                          type="text"
                          className="form-control input-lg br-md-0"
                          id="text5"
                          placeholder="Select Location"
                        />
                        <span>
                          <img
                            src="../assets/images/svg/gps.svg"
                            className="location-gps"
                            alt="image"
                          />
                          <img
                            src="../assets/images/svg/gps-white.svg"
                            className="location-gps location-gps-white"
                            alt="image"
                          />
                        </span>
                      </div>
                      <div className="col-xl-3 col-lg-3 col-md-12 select2-lg  mb-0 bg-white form-group">
                        <select
                          className="form-control select2-show-search  border-bottom-0"
                          data-placeholder="Select Category"
                        >
                          <optgroup label="Categories">
                            <option>All Categories</option>
                            <option value={1}>Accountant</option>
                            <option value={2}>IT Software</option>
                            <option value={3}>Banking</option>
                            <option value={4}>Finaces</option>
                            <option value={5}>Cook/Chef</option>
                            <option value={6}>Driveing</option>
                            <option value={7}>HR Recruiter</option>
                            <option value={8}>IT Hardware</option>
                            <option value={9}>Sales</option>
                          </optgroup>
                        </select>
                      </div>
                      <div className="col-xl-2 col-lg-3 col-md-12 mb-0">
                        <a
                          href="javascript:void(0);"
                          className="btn btn-lg btn-block btn-secondary br-tl-md-0 br-bl-md-0"
                        >
                          <i className="fa fa-search me-1" />
                          Search
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*filter Section*/}

      {/*listing Section*/}
      <section className="sptb bg-white">
          <div className="container">
              <div className="p-5 bg-white item2-gl-nav d-flex">
                  <h6 className="mb-0 mt-3">
                      Restaurant <b>1 to 10</b> of 30 Entries
                  </h6>
                  <div className="d-flex">
                      <label className="me-2 mt-2 mb-sm-1">Sort By:</label>
                      <select name="item" className="form-control select2-no-search w-70">
                      <option value={1}>Relavant</option>
                      <option value={2}>Newest First</option>
                      <option value={3}>Highest Paid</option>
                      <option value={4}>Lowest Paid</option>
                      <option value={5}>High Ratings</option>
                      <option value={6}>Popular</option>
                      </select>
                  </div>
              </div>
              
              {/* <div className="section-title center-block text-center">
                  <h1>Restaurant</h1>
                  <p>Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula</p>
              </div> */}

              <div className="row g-4">
              <div className="col-md-4 col-12">
                  <div className="card customCard mb-0">
                      <Link href="/">
                      <div className="item7-card-img">
                          <figure>
                          <Image
                              src="/images/restaurant/restaurant_1.avif" width={675} height={450}
                              alt="img"
                              className="cover-image"
                          />
                          <figcaption>
                              4.0 <FontAwesomeIcon icon={faStar} />
                          </figcaption>
                          </figure>
                      </div>
                      <div className="card-body p-4">
                          <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                          <div className="item7-card-desc d-flex mb-2">
                          <span className="sec1">
                              North Indian, Chinese, Pizza, Pasta, Lebanese, Fast Food, Street Food, Desserts
                          </span>
                          <div className="ms-auto text-dark">
                              $230 for two
                          </div>
                          </div>
                          <p className="mb-2">
                          Sigma 2, Greater Noida
                          </p>
                          <div className="item7-card-desc textBlue d-flex mb-2">
                          <span className="sec1">
                              Opens in 24 minutes
                          </span>
                          <div className="ms-auto">
                              2.9 km
                          </div>
                          </div>
                      </div>
                      </Link>
                  </div>
              </div>

              <div className="col-md-4 col-12">
                  <div className="card customCard mb-0">
                      <Link href="/">
                      <div className="item7-card-img">
                          <figure>
                          <Image
                              src="/images/restaurant/restaurant_1.avif" width={675} height={450}
                              alt="img"
                              className="cover-image"
                          />
                          <figcaption>
                              4.0 <FontAwesomeIcon icon={faStar} />
                          </figcaption>
                          </figure>
                      </div>
                      <div className="card-body p-4">
                          <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                          <div className="item7-card-desc d-flex mb-2">
                          <span className="sec1">
                              North Indian, Chinese, Pizza, Pasta, Lebanese, Fast Food, Street Food, Desserts
                          </span>
                          <div className="ms-auto text-dark">
                              $230 for two
                          </div>
                          </div>
                          <p className="mb-2">
                          Sigma 2, Greater Noida
                          </p>
                          <div className="item7-card-desc textBlue d-flex mb-2">
                          <span className="sec1">
                              Opens in 24 minutes
                          </span>
                          <div className="ms-auto">
                              2.9 km
                          </div>
                          </div>
                      </div>
                      </Link>
                  </div>
              </div>

              <div className="col-md-4 col-12">
                  <div className="card customCard mb-0">
                      <Link href="/">
                      <div className="item7-card-img">
                          <figure>
                          <Image
                              src="/images/restaurant/restaurant_1.avif" width={675} height={450}
                              alt="img"
                              className="cover-image"
                          />
                          <figcaption>
                              4.0 <FontAwesomeIcon icon={faStar} />
                          </figcaption>
                          </figure>
                      </div>
                      <div className="card-body p-4">
                          <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                          <div className="item7-card-desc d-flex mb-2">
                          <span className="sec1">
                              North Indian, Chinese, Pizza, Pasta, Lebanese, Fast Food, Street Food, Desserts
                          </span>
                          <div className="ms-auto text-dark">
                              $230 for two
                          </div>
                          </div>
                          <p className="mb-2">
                          Sigma 2, Greater Noida
                          </p>
                          <div className="item7-card-desc textBlue d-flex mb-2">
                          <span className="sec1">
                              Opens in 24 minutes
                          </span>
                          <div className="ms-auto">
                              2.9 km
                          </div>
                          </div>
                      </div>
                      </Link>
                  </div>
              </div>

              <div className="col-md-4 col-12">
                  <div className="card customCard mb-0">
                      <Link href="/">
                      <div className="item7-card-img">
                          <figure>
                          <Image
                              src="/images/restaurant/restaurant_1.avif" width={675} height={450}
                              alt="img"
                              className="cover-image"
                          />
                          <figcaption>
                              4.0 <FontAwesomeIcon icon={faStar} />
                          </figcaption>
                          </figure>
                      </div>
                      <div className="card-body p-4">
                          <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                          <div className="item7-card-desc d-flex mb-2">
                          <span className="sec1">
                              North Indian, Chinese, Pizza, Pasta, Lebanese, Fast Food, Street Food, Desserts
                          </span>
                          <div className="ms-auto text-dark">
                              $230 for two
                          </div>
                          </div>
                          <p className="mb-2">
                          Sigma 2, Greater Noida
                          </p>
                          <div className="item7-card-desc textBlue d-flex mb-2">
                          <span className="sec1">
                              Opens in 24 minutes
                          </span>
                          <div className="ms-auto">
                              2.9 km
                          </div>
                          </div>
                      </div>
                      </Link>
                  </div>
              </div>

              <div className="col-md-4 col-12">
                  <div className="card customCard mb-0">
                      <Link href="/">
                      <div className="item7-card-img">
                          <figure>
                          <Image
                              src="/images/restaurant/restaurant_1.avif" width={675} height={450}
                              alt="img"
                              className="cover-image"
                          />
                          <figcaption>
                              4.0 <FontAwesomeIcon icon={faStar} />
                          </figcaption>
                          </figure>
                      </div>
                      <div className="card-body p-4">
                          <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                          <div className="item7-card-desc d-flex mb-2">
                          <span className="sec1">
                              North Indian, Chinese, Pizza, Pasta, Lebanese, Fast Food, Street Food, Desserts
                          </span>
                          <div className="ms-auto text-dark">
                              $230 for two
                          </div>
                          </div>
                          <p className="mb-2">
                          Sigma 2, Greater Noida
                          </p>
                          <div className="item7-card-desc textBlue d-flex mb-2">
                          <span className="sec1">
                              Opens in 24 minutes
                          </span>
                          <div className="ms-auto">
                              2.9 km
                          </div>
                          </div>
                      </div>
                      </Link>
                  </div>
              </div>
              </div>
          </div>
      </section>
      {/*listing Section*/}

    </>
  );
}