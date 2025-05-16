"use client"
import { useEffect } from 'react';
import Image from "next/image";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from '@fancyapps/ui';

export default function DoctorProfileGallery({gallery}) {
    useEffect(() => {
        Fancybox.bind("[data-fancybox]", {}); // Initialize Fancybox
        return () => {
        Fancybox.destroy(); // Cleanup on unmount
        };
    }, []);
  return (
    <>
        {/* doctorProfileGallery */}
        <div className='doctorProfileGallery'>
            {/* imageSec */}
            {
                gallery.map((item,i)=>  <div className='imageSec' key={i}>
                <a data-fancybox="image-gallery" data-src={item} />
                <figure>
                    <Image
                        src={item} width={675} height={450}
                        alt="img"
                        className="cover-image"
                        unoptimized
                    />
                </figure>
            </div>)
            }
          
            {/* imageSec */}
            {/* <div className='imageSec'>
                <a data-fancybox="image-gallery" data-src="/images/doctor-profile/profile-2.jpg" />
                <figure>
                    <Image
                        src="/images/doctor-profile/profile-2.jpg" width={675} height={450}
                        alt="img"
                        className="cover-image"
                    />
                </figure>
            </div> */}
            {/* imageSec */}
            {/* <div className='imageSec'>
                <a data-fancybox="image-gallery" data-src="/images/doctor-profile/profile-3.jpg" />
                <figure>
                    <Image
                        src="/images/doctor-profile/profile-3.jpg" width={675} height={450}
                        alt="img"
                        className="cover-image"
                    />
                </figure>
            </div> */}
            {/* imageSec */}
            {/* <div className='imageSec'>
                <a data-fancybox="image-gallery" data-src="/images/doctor-profile/details.jpg" />
                <figure>
                    <Image
                        src="/images/doctor-profile/details.jpg" width={675} height={450}
                        alt="img"
                        className="cover-image"
                    />
                </figure>
            </div> */}
        </div>
    </>
  );
}
