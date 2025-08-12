'use client'
import { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export default function JournalDetailsSliderCropper({ imageSrc, onCrop }) {
  const cropperRef = useRef(null)

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper
    if (!cropper) return

    const canvas = cropper.getCroppedCanvas({
      width: 335,
      height: 400,
      fillColor: '#fff'
    })

    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) onCrop(blob)
      }, 'image/png')
    }
  }

  const handleReady = () => {
    const cropper = cropperRef.current?.cropper
    if (!cropper) return

    const imageData = cropper.getImageData()
    const scale = imageData.naturalWidth / imageData.width

    const boxWidth = 335 / scale
    const boxHeight = 400 / scale

    cropper.setAspectRatio(335 / 400) // ✅ Correct non-square aspect ratio

    cropper.setCropBoxData({
      width: boxWidth,
      height: boxHeight,
      left: (imageData.width - boxWidth) / 2,
      top: (imageData.height - boxHeight) / 2
    })

    cropper.setDragMode('move')
  }

  return (
    <div className="max-w-full mx-auto">
      <Cropper
        src={imageSrc}
        style={{ height: 200, width: '100%', overflow: 'hidden' }}
        viewMode={1}
        dragMode="move"
        cropBoxResizable={false}
        cropBoxMovable={false}
        scalable={false}
        zoomable={true}
        background={false}
        responsive={true}
        autoCropArea={1}
        aspectRatio={335 / 400} // ✅ Set correct ratio here too
        ready={handleReady}
        ref={cropperRef}
      />
      <button
        onClick={handleCrop}
        className="btn mt-3 rounded btn-warning"
        type="button"
      >
        Crop Image (335×400)
      </button>
    </div>
  )
}
