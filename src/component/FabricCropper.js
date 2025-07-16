'use client'
import { useRef } from 'react'
import Cropper from 'react-cropper'
// import 'cropperjs/dist/cropper.css'

export default function FabricCropper({ imageSrc, onCrop }) {
  const cropperRef = useRef(null)

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      cropper.getCroppedCanvas({ width: 774, height: 485 }).toBlob((blob) => {
        if (blob) {
          onCrop(blob)
        }
      })
    }
  }

  const handleReady = () => {
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      const containerData = cropper.getContainerData()

      // Center fixed-size crop box
      const boxWidth = 774
      const boxHeight = 485

      cropper.setCropBoxData({
        width: boxWidth,
        height: boxHeight,
        left: (containerData.width - boxWidth) / 2,
        top: (containerData.height - boxHeight) / 2
      })

      cropper.setAspectRatio(NaN) // Remove aspect ratio lock (we're fixing it ourselves)
    }
  }

  return (
    <div className="max-w-full mx-auto">
      <Cropper
        src={imageSrc}
        style={{ height: 800, width: '100%' }}
        viewMode={1}
        dragMode="move"               // Allow moving the crop box/image
        cropBoxResizable={false}      // Prevent resizing
        cropBoxMovable={true}         // Allow dragging
        scalable={false}
        zoomable={false}
        background={false}
        responsive={true}
        autoCropArea={1}
        ready={handleReady}
        ref={cropperRef}
      />
      <button
        onClick={handleCrop}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="button"
      >
        Crop Image (774×485)
      </button>
    </div>
  )
}
