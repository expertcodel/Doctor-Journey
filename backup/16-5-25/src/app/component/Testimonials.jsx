"use client";
import { faArrowLeft, faArrowRight, faLongArrowAltRight, faQuoteLeft, faStar, faStarHalf, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function TestimonialsCarousel({testimonialList}) {
  return (
    <>
        <div id="carouselTestimonials" className="carousel slide customTestimonial" data-bs-ride="carousel">
            <div className="carousel-indicators">
              { testimonialList.map((testimonial,i)=><button type="button" data-bs-target="#carouselTestimonials" data-bs-slide-to={i} className="active" aria-current="true" aria-label={`Slide ${i}`} key={testimonial.testimonialId}>
                    <img width={368} height={190} src={testimonial.image} alt="Decorative Icon" className="img-fluid" />
                </button>)}
                {/* <button type="button" data-bs-target="#carouselTestimonials" data-bs-slide-to={1} aria-label="Slide 2">
                    <Image width={368} height={190} src="/images/doctor-profile/profile-3.jpg" alt="Decorative Icon" className="img-fluid" />
                </button>
                <button type="button" data-bs-target="#carouselTestimonials" data-bs-slide-to={2} aria-label="Slide 3">
                    <Image width={368} height={190} src="/images/doctor-profile/profile-1.jpg" alt="Decorative Icon" className="img-fluid" />
                </button> */}
            </div>
            <div className="carousel-inner">
               {testimonialList.map((testimonial,i)=><div key={testimonial.testimonialId}className={i===0?"carousel-item active":"carousel-item"}>
                    <div className="testimonialCard">
                        <p className="desc">
                            <FontAwesomeIcon icon={faQuoteLeft} /> {testimonial.description}
                        </p>
                        <h3 className="title">{testimonial.name}</h3>
                        <span className="post">{testimonial.designation}</span>
                        <div className="ratingStars">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalfStroke} />
                        </div>
                    </div>
                </div>)}
                {/* <div className="carousel-item active">
                    <div className="testimonialCard">
                        <p className="desc">
                            <FontAwesomeIcon icon={faQuoteLeft} /> Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat
                            ad velit ab. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolore cum accusamus eveniet molestias voluptatum inventore laboriosam
                            labore sit, aspernatur praesentium iste impedit quidem dolor veniam.
                        </p>
                        <h3 className="title">Elizabeth</h3>
                        <span className="post">Web Developer</span>
                        <div className="ratingStars">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalfStroke} />
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <div className="testimonialCard">
                        <p className="desc">
                            <FontAwesomeIcon icon={faQuoteLeft} /> Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit. Quod eos id officiis hic tenetur quae quaerat
                            ad velit ab. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Dolore cum accusamus eveniet molestias voluptatum inventore laboriosam
                            labore sit, aspernatur praesentium iste impedit quidem dolor veniam.
                        </p>
                        <h3 className="title">Elizabeth</h3>
                        <span className="post">Web Developer</span>
                        <div className="ratingStars">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStarHalfStroke} />
                        </div>
                    </div>
                </div> */}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="prev">
                <span className="arrowDefine" aria-hidden="true">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="next">
                <span className="arrowDefine" aria-hidden="true">
                    <FontAwesomeIcon icon={faArrowRight} />
                </span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </>
  );
}