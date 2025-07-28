// 'use client'
// import { useRef } from 'react'
// import Cropper from 'react-cropper'
// // import 'cropperjs/dist/cropper.css'

// export default function ProfileCropper({ imageSrc, onCrop }) {
//   const cropperRef = useRef(null)

//   const handleCrop = () => {
//     const cropper = cropperRef.current?.cropper
//     if (cropper) {
//       cropper.getCroppedCanvas({
//         width: 216,
//         height: 216,
//         fillColor: '#fff' // optional for PNG background
//       }).toBlob((blob) => {
//         if (blob) {
//           onCrop(blob)
//         }
//       }, 'image/png')
//     }
//   }

//   const handleReady = () => {
//     const cropper = cropperRef.current?.cropper
//     if (cropper) {
//       setTimeout(() => {
//         const containerData = cropper.getContainerData()
//         const boxWidth = 216
//         const boxHeight = 216

//         cropper.setCropBoxData({
//           width: boxWidth,
//           height: boxHeight,
//           left: (containerData.width - boxWidth) / 2,
//           top: (containerData.height - boxHeight) / 2
//         })

//         cropper.setAspectRatio(1)
//       }, 100)
//     }
//   }

//   return (
//     <div className="max-w-full mx-auto">
//       <Cropper
//         src={imageSrc}
//         style={{ height: '100%', width: '100%' }}
//         viewMode={1}
//         dragMode="move"
//         cropBoxResizable={false}
//         cropBoxMovable={true}
//         scalable={false}
//         zoomable={true}
//         background={false}
//         responsive={true}
//         autoCropArea={1}
//         aspectRatio={1}
//         ready={handleReady}
//         ref={cropperRef}
//       />
//       <button
//         onClick={handleCrop}
//         className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         type="button"
//       >
//         Crop Image (216×216)
//       </button>
//     </div>
//   )
// }



'use client'
import { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

export default function ProfileCropper({ imageSrc, onCrop }) {
  const cropperRef = useRef(null)

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper
    if (!cropper) return

    const canvas = cropper.getCroppedCanvas({
      width: 216,
      height: 216,
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
    const boxSize = 216 / scale

    cropper.setAspectRatio(1)

    cropper.setCropBoxData({
      width: boxSize,
      height: boxSize,
      left: (imageData.width - boxSize) / 2,
      top: (imageData.height - boxSize) / 2
    })

    cropper.setDragMode('move') // ✅ Allow image to move
    // DO NOT call cropper.disable()
  }

  return (
    <div className="max-w-full mx-auto">
      <Cropper
        src={imageSrc}
        style={{ height: 400, width: '100%' }}
        viewMode={1}
        dragMode="move"
        cropBoxResizable={false}
        cropBoxMovable={false}
        scalable={false}
        zoomable={true}
        background={false}
        responsive={true}
        autoCropArea={1}
        aspectRatio={1}
        ready={handleReady}
        ref={cropperRef}
      />
      <button
        onClick={handleCrop}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        type="button"
      >
        Crop Image (216×216)
      </button>
    </div>
  )
}
