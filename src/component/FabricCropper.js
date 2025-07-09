// components/ImageCropper.js
'use client'

import { useRef, useState } from 'react'
import Cropper from 'react-cropper'
// import 'cropperjs/dist/cropper.css'

export default function ImageCropper({ imageSrc, onCrop }) {
  const cropperRef = useRef(null)

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      cropper.getCroppedCanvas({ width: 150, height: 150 }).toBlob((blob) => {
        if (blob) {
          onCrop(blob)
        }
      })
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Cropper
        src={imageSrc}
        style={{ height: 300, width: '100%' }}
        initialAspectRatio={1}
        viewMode={1}
        guides={true}
        zoomable={true}
        scalable={true}
        movable={true}
        cropBoxResizable={true}
        cropBoxMovable={true}
        ref={cropperRef}
      />
      <button
        onClick={handleCrop}
        className="mt-4 bg-blue-600 text-red px-4 py-2 rounded"
        type="button"
      >
        Crop Image (150×150)
      </button>
    </div>
  )
}
