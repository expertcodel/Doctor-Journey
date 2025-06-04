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
                        src={item} fill
                        alt="img"
                        className="cover-image"
                        unoptimized
                    />
                </figure>
            </div>)
            }
        </div>
    </>
  );
}
