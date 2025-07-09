"use client"


import { useState, useRef } from 'react';
import { UniversalContext } from './context.js';
import dynamic from 'next/dynamic';
import AdminFooter from './AdminFooter.jsx'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { useRouter } from 'next/navigation';
import FabricCropper from './FabricCropper'
export default function Page({ doctorList, doctorDetail }) {

    const [image, setImage] = useState(null)
    const [croppedUrl, setCroppedUrl] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImage(reader.result)
            reader.readAsDataURL(file)
        }
    }

    const handleCrop = (blob) => {
        const url = URL.createObjectURL(blob);
        setImageurl(blob);
        setCroppedUrl(url)
    }

    const { userData } = UniversalContext();
    const router = useRouter();
    const editor = useRef(null)
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl, setImageurl] = useState(null);

    const config = {
        readonly: false,
        toolbar: true,
        minHeight: 300,
        spellcheck: true,
        placeholder: 'Type something here...',
        uploader: {
            insertImageAsBase64URI: true,
        }

    };

    const [formValidation, setFormvalidation] = useState({ title: -1, url: -1, doctor: -1, image: -1 })
    const uploadVideo = async (e) => {

        e.preventDefault();
        let arr = [1, 1, 1, 1];
        let flag = true;
        const videoTitle = e.target.title.value.trim();
        const videoUrl = e.target.url.value.trim();
        const videoContent = document.querySelector('.jodit-wysiwyg').innerHTML;
        let userId
        let doctorName
        let specialization
        if (typeof (userData.usertype) === 'string') {
            userId = JSON.parse(e.target.doctor.value).id.trim();
            doctorName = JSON.parse(e.target.doctor.value).name.trim();
            specialization = JSON.parse(e.target.doctor.value).specialization.trim();
        }
        else {

            userId = doctorDetail.userId;
            doctorName = doctorDetail.doctorName;
            specialization = doctorDetail.specialization

        }




        if (videoTitle === "") {
            arr[0] = 0;
            flag = false;

        }


        if (videoUrl === "") {
            arr[1] = 0;
            flag = false;
        }

        if (userId === "" || userId === "select") {
            arr[2] = 0;
            flag = false;

        }

        if (!imageUrl) {
            arr[3] = 0;
            flag = false;
        }





        if (flag) {

            setFormvalidation({ title: arr[0], url: arr[1], doctor: arr[2], image: arr[3] });


            const data = {

                videoUrl, videoTitle, userId, doctorName, specialization, videoContent
            }

            const formData = new FormData();
            formData.append('file', imageUrl);
            formData.append('data', JSON.stringify(data));

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors/uploadVideo`, {
                method: 'POST',
                body: formData
            })

            const res = await response.json();

            if (res.status) {

                sessionStorage.setItem('successMsg', 'Video Uploaded Successfully');
                router.push("/dashboard/doctors/videos/list");

            }
            else {

                setErrormsg(res.message);
            }

        }
        else {

            setFormvalidation({ title: arr[0], url: arr[1], doctor: arr[2], image: arr[3] });


        }





    }

   

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0">Upload Videos</h4>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-12 offset-0">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={uploadVideo}>


                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-title-input">Video Title</label>
                                            <input type="text" className="form-control" id="menu-title-input" placeholder="Enter title" name='title' style={{ border: formValidation.title === 0 && '1px solid red' }} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-serial-input">Video Url</label>
                                            <input type="text" className="form-control" id="menu-serial-input" placeholder="Enter url" name='url' style={{ border: formValidation.url === 0 && '1px solid red' }} />
                                        </div>

                                        {typeof (userData.usertype) === 'string' && <div className="mb-3">
                                            <label className="form-label" htmlFor="category-input">Select Doctor</label>

                                            <select name="doctor" className="form-control" style={{ border: formValidation.doctor === 0 && '1px solid red' }} >

                                                <option value={JSON.stringify({ id: "select", name: "select", specialization: "select" })} >Select</option>
                                                {
                                                    doctorList.length > 0 && doctorList.map((item) => <option value={JSON.stringify({ id: item.userId, name: item.doctorName, specialization: item.specialization })} key={item.userId}>{item.doctorName.toUpperCase()}</option>)
                                                }


                                            </select>

                                        </div>}

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Thumbnail Image</label>
                                           

                                            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={handleFileChange} style={{ border: formValidation.image === 0 && '1px solid red' }} />

                                            {image && <FabricCropper imageSrc={image} onCrop={handleCrop} />}

                                            {croppedUrl && (
                                                <div className="mt-4">
                                                    <h3 className="text-lg font-medium">Cropped Preview:</h3>
                                                    <img src={croppedUrl} width={150} height={150} alt="Cropped result" />
                                                </div>
                                            )}
                                          

                                        </div>





                                        <div className="mb-3" style={{ zIndex: '0' }}>
                                            <label className="form-label">Description</label>


                                            <JoditEditor
                                                config={config}
                                                ref={editor}

                                            />

                                        </div>


                                        <div className="text-end mb-4">

                                            <button type="submit" className="btn btn-success w-sm">Upload</button>
                                        </div>
                                        {
                                            errorMsg !== "" && <div style={{ color: 'red' }}>{errorMsg}</div>
                                        }
                                    </form>
                                </div>
                                {/* end card body */}
                            </div>
                            {/* end card */}

                            {/* end card */}

                        </div>
                        {/* end col */}

                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* container-fluid */}
            </div>
            {/* End Page-content */}
            <AdminFooter />

        </div>
    )
}
