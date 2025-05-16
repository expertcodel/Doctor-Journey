"use client"

import axios from 'axios'
import { useState, useRef } from 'react';
import Image from 'next/image'
import dynamic from 'next/dynamic';
import AdminFooter from './AdminFooter.jsx'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { useRouter } from 'next/navigation';
export default function Page({doctorList}) {



    const router = useRouter();
    const editor=useRef(null)
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
        const doctorId = JSON.parse(e.target.doctor.value).id.trim();
        const doctorName = JSON.parse(e.target.doctor.value).name.trim();
        const specialization = JSON.parse(e.target.doctor.value).specialization.trim();
        const videoContent = document.querySelector('.jodit-wysiwyg').innerHTML;


        if (videoTitle === "") {
            arr[0] = 0;
            flag = false;

        }


        if (videoUrl === "") {
            arr[1] = 0;
            flag = false;
        }

        if (doctorId === "" || doctorId === "select") {
            arr[2] = 0;
            flag = false;

        }

        if (!imageUrl) {
            arr[3] = 0;
            flag = false;
        }





        if (flag) {

            setFormvalidation({ title: arr[0], url: arr[1], doctor: arr[2],image:arr[3] });


            const data = {

                videoUrl, videoTitle, doctorId, doctorName, specialization, videoContent
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
                router.push("/admin/doctors/videos/list");

            }
            else {

                setErrormsg(res.message);
            }

        }
        else {

            setFormvalidation({ title: arr[0], url: arr[1], doctor: arr[2],image:arr[3] });


        }





    }

    const fileUpload = () => {


        const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
        const imagePreview = document.getElementById('imagePreview');
        const imageurl = URL.createObjectURL(thumbnailImage);
        imagePreview.src = imageurl
        setImageurl(thumbnailImage);


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

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="category-input">Select Doctor</label>

                                            <select name="doctor" className="form-control" style={{ border: formValidation.doctor === 0 && '1px solid red' }} >

                                                <option value={JSON.stringify({ id: "select", name: "select", specialization: "select" })} >Select</option>
                                                {
                                                    doctorList.length > 0 && doctorList.map((item) => <option value={JSON.stringify({ id: item.doctorId, name: item.doctorName, specialization: item.specialization })} key={item.doctorId}>{item.doctorName.toUpperCase()}</option>)
                                                }


                                            </select>

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Thumbnail Image</label>
                                            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={fileUpload} style={{ border: formValidation.image === 0 && '1px solid red' }} />
                                            <div style={{ marginTop: '10px' }}>Choose 300 x 300 Dimension</div>
                                            {!success && <img width={imageUrl && 100} height={imageUrl && 100} id='imagePreview' alt='' />}

                                        </div>





                                        <div className="mb-3">
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
            <div
                className={success ? "modal fade zoomIn show" : "modal fade zoomIn"}
                id="deletetable"
                aria-hidden={!success && 'true'}
                role={success && 'dialog'}
                aria-modal={success && 'true'}
                style={{ display: success ? 'block' : 'none', backgroundColor: 'rgb(0,0,0,0.5)' }}



            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                // data-bs-dismiss="modal"
                                onClick={() => setSuccess(false)}


                            />
                        </div>
                        <div className="card-body p-4 text-center">
                            <div className="avatar-lg mx-auto mt-2">
                                <div className="avatar-title bg-light text-success display-3 rounded-circle">
                                    <i className="ri-checkbox-circle-fill" />
                                </div>
                            </div>
                            <div className="mt-4 pt-2">
                                <h4>Well done !</h4>
                                <p className="text-muted mx-4">Aww yeah, you successfully created your testimonial.</p>
                                <div className="mt-4">
                                    <a href="/admin/testimonial/list" className="btn btn-success w-100">Back to Dashboard</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
