"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Image from "next/image";
import eventsCards from "../../data/eventsCards.json";

export default function ThumbnailEventGalleryCarousel() {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      freeMode={true}
      grabCursor={true}
      loop={true}
      spaceBetween={0}
      slidesPerView={3}
      centeredSlides={true}
      breakpoints={{
        320: { slidesPerView: 1, spaceBetween: 0 },
        768: { slidesPerView: 3, spaceBetween: 0 },
        1280: { slidesPerView: 3, spaceBetween: 0 },
      }}
      className="eventGallery-slider customSwiper"
    >
      {eventsCards.map((card) => (
        <SwiperSlide key={card.eventId}>
            <Image src={card.galleryImage} width={500} height={500} alt="img" className="cover-image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
