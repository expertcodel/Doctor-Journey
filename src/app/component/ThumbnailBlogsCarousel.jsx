"use client";
import { faCalendar, faComment, faHeart, faLongArrowAltRight, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

export default function ThumbnailBlogsCarousel({blogList}) {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Initialize Swiper
    swiperRef.current = new Swiper(".blogsSlider", {
      slidesPerView: 3, // Show 4 thumbnails at a time
      spaceBetween: 16, // Spacing between slides
      freeMode: true, // Enable free scrolling
      grabCursor: true, // Enable mouse dragging
      navigation: false, // Show next/prev buttons
      loop: true,
      // Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: 1, // 1 slide for mobile
          spaceBetween: 10
        },
        768: {
          slidesPerView: 3, // 3 slides for tablets
          spaceBetween: 8
        },
        1280: {
          slidesPerView: 3, // 3 slides for tablets
          spaceBetween: 16
        },
      }
    });
  }, []);

  return (
    <>
      {/* Thumbnail Slider */}
      <div className="swiper blogsSlider customSwiper">
        <div className="swiper-wrapper">
          <div className="swiper-slide item">
            <div className="card mb-0">
                <div className="item7-card-img">
                    <Link href="javascript:void(0);" />
                    <Image src="/images/doctor-profile/profile-1.jpg" width={368} height={190} alt="img" className="cover-image" />
                </div>
                <div className="card-body p-4">
                    <div className="item7-card-desc d-flex mb-2">
                        <Link href="javascript:void(0);">
                            <FontAwesomeIcon icon={faCalendar} /> Dec-03-2018
                        </Link>
                        <div className="ms-auto">
                            <Link href="javascript:void(0);">
                                <FontAwesomeIcon icon={faComment} /> 4 Comments
                            </Link>
                        </div>
                    </div>
                    <Link href="/" className="text-dark">
                        <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                    </Link>
                    <p>
                        Ut enim ad minima veniam, quis exercitationem, enim ad minima veniam, quis nostrum exercitationem{" "}
                    </p>
                    <div className="d-flex align-items-center pt-2 mt-auto">
                        <figure>
                            <Image src="/images/clients/2.png" width={40} height={40} alt="avatar-img" />
                        </figure>
                        <div>
                            <Link href="/" className="text-default">
                                Joanne Nash
                            </Link>
                            <small className="d-block text-muted">1 day ago</small>
                        </div>
                        <div className="ms-auto text-muted">
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
       
        { blogList.map((blog)=><div key={blog.blogId} className="swiper-slide">
            <div className="card mb-0">
                <div className="item7-card-img">
                    <Link href="javascript:void(0);" />
                    <Image unoptimized src={blog.blogImage} width={368} height={190} alt="img" className="cover-image" />
                </div>
                <div className="card-body p-4">
                    <div className="item7-card-desc d-flex mb-2">
                        <Link href="javascript:void(0);">
                            <FontAwesomeIcon icon={faCalendar} /> {blog.publishedDate}
                        </Link>
                        <div className="ms-auto">
                            <Link href="javascript:void(0);">
                                <FontAwesomeIcon icon={faComment} /> 4 Comments
                            </Link>
                        </div>
                    </div>
                    <Link href="/" className="text-dark">
                        <h4 className="font-weight-semibold">{blog.blogTitle}</h4>
                    </Link>
                    <p>
                        {blog.blogDescription.substr(0,50)}...{" "}
                    </p>
                    <div className="d-flex align-items-center pt-2 mt-auto">
                        <figure>
                            <Image src="/images/clients/2.png" width={40} height={40} alt="avatar-img" />
                        </figure>
                        <div>
                            <Link href="/" className="text-default">
                                Joanne Nash
                            </Link>
                            <small className="d-block text-muted">1 day ago</small>
                        </div>
                        <div className="ms-auto text-muted">
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>)}


          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="item7-card-img">
                    <Link href="javascript:void(0);" />
                    <Image src="/images/doctor-profile/profile-1.jpg" width={368} height={190} alt="img" className="cover-image" />
                </div>
                <div className="card-body p-4">
                    <div className="item7-card-desc d-flex mb-2">
                        <Link href="javascript:void(0);">
                            <FontAwesomeIcon icon={faCalendar} /> Dec-03-2018
                        </Link>
                        <div className="ms-auto">
                            <Link href="javascript:void(0);">
                                <FontAwesomeIcon icon={faComment} /> 4 Comments
                            </Link>
                        </div>
                    </div>
                    <Link href="/" className="text-dark">
                        <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                    </Link>
                    <p>
                        Ut enim ad minima veniam, quis exercitationem, enim ad minima veniam, quis nostrum exercitationem{" "}
                    </p>
                    <div className="d-flex align-items-center pt-2 mt-auto">
                        <figure>
                            <Image src="/images/clients/2.png" width={40} height={40} alt="avatar-img" />
                        </figure>
                        <div>
                            <Link href="/" className="text-default">
                                Joanne Nash
                            </Link>
                            <small className="d-block text-muted">1 day ago</small>
                        </div>
                        <div className="ms-auto text-muted">
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="item7-card-img">
                    <Link href="javascript:void(0);" />
                    <Image src="/images/doctor-profile/profile-1.jpg" width={368} height={190} alt="img" className="cover-image" />
                </div>
                <div className="card-body p-4">
                    <div className="item7-card-desc d-flex mb-2">
                        <Link href="javascript:void(0);">
                            <FontAwesomeIcon icon={faCalendar} /> Dec-03-2018
                        </Link>
                        <div className="ms-auto">
                            <Link href="javascript:void(0);">
                                <FontAwesomeIcon icon={faComment} /> 4 Comments
                            </Link>
                        </div>
                    </div>
                    <Link href="/" className="text-dark">
                        <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                    </Link>
                    <p>
                        Ut enim ad minima veniam, quis exercitationem, enim ad minima veniam, quis nostrum exercitationem{" "}
                    </p>
                    <div className="d-flex align-items-center pt-2 mt-auto">
                        <figure>
                            <Image src="/images/clients/2.png" width={40} height={40} alt="avatar-img" />
                        </figure>
                        <div>
                            <Link href="/" className="text-default">
                                Joanne Nash
                            </Link>
                            <small className="d-block text-muted">1 day ago</small>
                        </div>
                        <div className="ms-auto text-muted">
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="item7-card-img">
                    <Link href="javascript:void(0);" />
                    <Image src="/images/doctor-profile/profile-1.jpg" width={368} height={190} alt="img" className="cover-image" />
                </div>
                <div className="card-body p-4">
                    <div className="item7-card-desc d-flex mb-2">
                        <Link href="javascript:void(0);">
                            <FontAwesomeIcon icon={faCalendar} /> Dec-03-2018
                        </Link>
                        <div className="ms-auto">
                            <Link href="javascript:void(0);">
                                <FontAwesomeIcon icon={faComment} /> 4 Comments
                            </Link>
                        </div>
                    </div>
                    <Link href="/" className="text-dark">
                        <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                    </Link>
                    <p>
                        Ut enim ad minima veniam, quis exercitationem, enim ad minima veniam, quis nostrum exercitationem{" "}
                    </p>
                    <div className="d-flex align-items-center pt-2 mt-auto">
                        <figure>
                            <Image src="/images/clients/2.png" width={40} height={40} alt="avatar-img" />
                        </figure>
                        <div>
                            <Link href="/" className="text-default">
                                Joanne Nash
                            </Link>
                            <small className="d-block text-muted">1 day ago</small>
                        </div>
                        <div className="ms-auto text-muted">
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card mb-0">
                <div className="item7-card-img">
                    <Link href="javascript:void(0);" />
                    <Image src="/images/doctor-profile/profile-1.jpg" width={368} height={190} alt="img" className="cover-image" />
                </div>
                <div className="card-body p-4">
                    <div className="item7-card-desc d-flex mb-2">
                        <Link href="javascript:void(0);">
                            <FontAwesomeIcon icon={faCalendar} /> Dec-03-2018
                        </Link>
                        <div className="ms-auto">
                            <Link href="javascript:void(0);">
                                <FontAwesomeIcon icon={faComment} /> 4 Comments
                            </Link>
                        </div>
                    </div>
                    <Link href="/" className="text-dark">
                        <h4 className="font-weight-semibold">Excepteur occaecat cupidatat</h4>
                    </Link>
                    <p>
                        Ut enim ad minima veniam, quis exercitationem, enim ad minima veniam, quis nostrum exercitationem{" "}
                    </p>
                    <div className="d-flex align-items-center pt-2 mt-auto">
                        <figure>
                            <Image src="/images/clients/2.png" width={40} height={40} alt="avatar-img" />
                        </figure>
                        <div>
                            <Link href="/" className="text-default">
                                Joanne Nash
                            </Link>
                            <small className="d-block text-muted">1 day ago</small>
                        </div>
                        <div className="ms-auto text-muted">
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faHeart} />
                            </Link>
                            <Link href="/" className="icon d-none d-md-inline-block ms-3">
                                <FontAwesomeIcon icon={faThumbsUp} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}