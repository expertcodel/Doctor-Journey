'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CarouselIndicators from './CarouselIndicators';

const slides = [
  { type: 'image', image: '/images/dr-banners/banner-1.webp', alt: 'Banner 1' },
  { type: 'image', image: '/images/dr-banners/banner-2.webp', alt: 'Banner 2' },
  { type: 'image', image: '/images/dr-banners/banner-3.webp', alt: 'Banner 3' },
  { type: 'image', image: '/images/dr-banners/banner-4.webp', alt: 'Banner 4' },
  { type: 'image', image: '/images/dr-banners/banner-5.webp', alt: 'Banner 5' },
];

export default function JournalsBanner() {
  const carouselRef = useRef(null);
  const [showVideoIndex, setShowVideoIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const carouselEl = carouselRef.current;
    if (!carouselEl) return;

    const moveToNextSlide = () => {
      const nextIndex = (activeIndex + 1) % slides.length;
      setActiveIndex(nextIndex);
    };

    const handleSlideLogic = () => {
      clearTimeout(timerRef.current);
      setShowVideoIndex(null);

      const current = slides[activeIndex];
      if (current?.type === 'video') {
        playVideoSlide(activeIndex);
      } else {
        timerRef.current = setTimeout(moveToNextSlide, 4000);
      }
    };

    const playVideoSlide = (index) => {
      const activeItem = carouselEl.querySelectorAll('.carousel-item')[index];
      const video = activeItem?.querySelector('video');

      if (!video) return;

      setShowVideoIndex(null);
      timerRef.current = setTimeout(() => {
        setShowVideoIndex(index);
        video.currentTime = 0;

        video.onended = () => {
          setShowVideoIndex(null);
          moveToNextSlide();
        };

        video.play().catch((error) => console.error('Video play failed:', error));
      }, 2000);
    };

    handleSlideLogic();

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [activeIndex]);

  return (
    <section className="heroBanner detailCardTop">
      <div id="carouselExampleIndicators" className="carousel slide carousel-fade customCarousel" data-bs-ride="false" data-bs-pause="false" ref={carouselRef}>
        <div className="carousel-indicators">
          <CarouselIndicators slides={slides} activeIndex={activeIndex} />
        </div>
        <div className="carousel-inner">
          {slides.map((slide, idx) => (
            <div key={idx} className={`carousel-item ${idx === activeIndex ? 'active' : ''}`}>
              <figure style={{ position: 'relative' }}>
                <Image
                  src={slide.image}
                  fill
                  alt={slide.alt}
                  className="cover-image img-fluid"
                  style={{ display: showVideoIndex === idx ? 'none' : 'block' }}
                />
                {slide.video && (
                  <video
                    src={slide.video}
                    muted
                    playsInline
                    preload="auto"
                    className="cover-video"
                    style={{
                      display: showVideoIndex === idx ? 'block' : 'none',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </figure>
              <div className="carousel-caption">
                <div className="container">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12 bodyContent">
                      <h1>
                        <span>DOCTOR'S JOURNEY SPECIALS</span>
                        CURING CANCER
                        <em>NEW RELEASE</em>
                      </h1>
                      <ul className="list-unstyled">
                        <li>2024</li>
                        <li>Season 1</li>
                        <li>Hindi/English</li>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}