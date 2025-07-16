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
import DaysCalculator from "./DaysCalculator";
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
         
       
        { blogList.map((blog)=><div key={blog.blogId} className="swiper-slide">
            <div className="card mb-0">
                <div className="item7-card-img">
                    <Link href={`/blog${blog.blogUrl}`} />
                    <Image unoptimized src={blog.blogImage} fill alt="img" className="cover-image" />
                </div>
                <div className="card-body p-4">
                    <div className="item7-card-desc d-flex mb-2">
                        <Link href={`/blog${blog.blogUrl}`}>
                            <FontAwesomeIcon icon={faCalendar} /> {blog.publishedDate}
                        </Link>
                        <div className="ms-auto">
                            <Link href={`/blog${blog.blogUrl}`}>
                                    <small className="d-block text-muted"><DaysCalculator targetDate={blog.publishedDate} today={new Date().toLocaleDateString()}/></small>
                            </Link>
                        </div>
                    </div>
                    <Link href={`/blog${blog.blogUrl}`} className="text-dark">
                        <h4 className="font-weight-semibold">{blog.blogTitle}</h4>
                    </Link>
                    <p>
                        {blog.blogDescription.substr(0,50)}...{" "}
                    </p>
                   
                </div>
            </div>
          </div>)}


        
        </div>
      </div>
    </>
  );
}