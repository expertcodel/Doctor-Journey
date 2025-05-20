"use client"
import React from 'react'
import dynamic from 'next/dynamic';
import { useState, useRef, useMemo, useEffect } from 'react';
import Image from 'next/image'
import AdminFooter from './AdminFooter.jsx'
import { useRouter } from 'next/navigation';
import { extractErrorMessage } from '../utils/errorMessage'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import DoctorFormUpdate from './DoctorFormUpdate.jsx'
export default function DoctorUpdate({ doctorDetail }) {



    const router = useRouter();
    const editor = useRef(null);
    const [location, setLocation] = useState(doctorDetail.location ? doctorDetail.location : [{ latitude: "", longitude: "" }]);
    const [video, setVideo] = useState(doctorDetail.videos ? doctorDetail.videos : [{ url: "", videoImage: "" }]);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl, setImageurl] = useState(null);
    const [formValidation, setFormvalidation] = useState({ doctorName: -1, specialization: -1, qualification: -1, shortDescription: -1, address: -1, number: -1, email: -1, image: -1 })

    // useEffect(() => {



    //     document.getElementById("imagePreview").src = doctorDetail.profileImage
    //     video.forEach((video, i) => document.getElementById(`imagePreview${i}`).src = video.videoImage);


    // }, [])


    // const addLocation = () => {

    //     setLocation((prev) => [...prev, { latitude: "", longitude: "" }]);

    // }

    // const removeLocation = (i) => {

    //     setLocation(location.filter((_, idx) => idx !== i));

    // }

    // const handleLocation = (e, i) => {

    //     e.preventDefault();
    //     const { name, value } = e.target;
    //     const updatedlocation = [...location];
    //     updatedlocation[i][name] = value;
    //     setLocation(updatedlocation);

    // }


    // const addVideo = () => {

    //     setVideo((prev) => [...prev, { url: "", videoImage: "" }]);

    // }

    // const removeVideo = (i) => {

    //     setVideo(video.filter((_, idx) => idx !== i));

    // }

    // const handleVideo = (event, index) => {

    //     const { name, value } = event.target;
    //     if (name === 'videoImage') {
    //         const videolist = [...video];
    //         const file = document.getElementById(`project-video-img${index}`).files[0]
    //         const imageurl = URL.createObjectURL(file);
    //         document.getElementById(`imagePreview${index}`).src = imageurl;
    //         videolist[index][name] = file
    //         setVideo(videolist);

    //     }
    //     else {

    //         const videolist = [...video];
    //         videolist[index][name] = value;
    //         setVideo(videolist);
    //     }

    // }

    // const phoneValidator = (inputtxt) => {

    //     let phoneno = /^\d{10}$/;
    //     if (inputtxt.match(phoneno)) {
    //         return true;
    //     }
    //     else {

    //         return false;
    //     }


    // }

    // const validateEmail = (email) => {
    //     return String(email)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };

    // const createDoctor = async (e) => {

    //     e.preventDefault();
    //     let arr = [1, 1, 1, 1, 1, 1, 1, 1];
    //     let flag = true;

    //     const gallery = e.target.gallery.files;
    //     const email = e.target.email.value.trim();
    //     const number = e.target.number.value.trim();
    //     const doctorName = e.target.name.value.trim();
    //     const specialization = e.target.specialization.value.trim();
    //     const qualification = e.target.qualification.value.trim();
    //     const shortDescription = e.target.description.value.trim();
    //     const address = e.target.address.value.trim();
    //     const doctorContent = document.querySelector('.jodit-wysiwyg').innerHTML;

    //     if (doctorName.length < 3) {
    //         arr[0] = 0;
    //         flag = false;
    //     }

    //     if (specialization === "") {
    //         arr[1] = 0;
    //         flag = false;

    //     }

    //     if (qualification === "") {
    //         arr[2] = 0;
    //         flag = false;

    //     }

    //     if (shortDescription === "") {
    //         arr[3] = 0;
    //         flag = false;

    //     }

    //     if (address === "") {
    //         arr[4] = 0;
    //         flag = false;

    //     }

    //     if (!phoneValidator(number)) {

    //         arr[5] = 0;
    //         flag = false;
    //     }


    //     if (!validateEmail(email)) {

    //         arr[6] = 0;
    //         flag = false;
    //     }

    //     // if (!imageUrl) {
    //     //     arr[7] = 0;
    //     //     flag = false;
    //     // }


    //     // if (doctorContent === "<p><br></p>") {
    //     //     arr[8] = 0;
    //     //     flag = false;
    //     // }



    //     if (flag) {

    //         setFormvalidation({ doctorName: arr[0], specialization: arr[1], qualification: arr[2], shortDescription: arr[3], address: arr[4], number: arr[5], email: arr[6], image: arr[7] });


    //         try {

    //             const data = {

    //                 doctorName, specialization, qualification, email, number, shortDescription, address, doctorContent, location, video,doctorId:doctorDetail.doctorId
    //             }

    //             const formData = new FormData();
    //             formData.append('file', imageUrl);
    //             for (let i = 0; i < video.length; i++) {
    //                 formData.append('videoImage', video[i]['videoImage']);
    //             }

    //             for (let i = 0; i < gallery.length; i++) {
    //                 formData.append('gallery', gallery[i]);
    //             }

    //             formData.append('data', JSON.stringify(data));

    //             const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors`, {
    //                 method: 'PUT',
    //                 body: formData
    //             })

    //             const res = await response.json();

    //             if (res.status) {

    //                 sessionStorage.setItem('successMsg', 'Doctor Profile Updated Successfully');
    //                 router.push("/admin/doctors/list");

    //             }
    //             else {

    //                 setErrormsg(res.message);
    //             }

    //         } catch (error) {

    //             const message = extractErrorMessage(error);
    //             setErrormsg(message)

    //         }

    //     }
    //     else {

    //         setFormvalidation({ doctorName: arr[0], specialization: arr[1], qualification: arr[2], shortDescription: arr[3], address: arr[4], number: arr[5], email: arr[6], image: arr[7] });

    //     }






    // }

    // const fileUpload = async () => {


    //     const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
    //     const imagePreview = document.getElementById('imagePreview');
    //     const imageurl = URL.createObjectURL(thumbnailImage);
    //     imagePreview.src = imageurl
    //     setImageurl(thumbnailImage);


    // }

    // const config = useMemo(() => ({
    //     readonly: false,
    //     toolbar: true,
    //     minHeight: 300,
    //     spellcheck: true,
    //     placeholder: 'Type something here...',
    //     uploader: {
    //         insertImageAsBase64URI: true
    //     }

    // }), [])



    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">




                    <div className="row">
                        <div className="col-xxl-3">

                            {/*end card*/}
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title mb-0">Update Doctor Profile</h5>
                                        </div>

                                    </div>
                                    <div className="progress animated-progress custom-progress progress-label">
                                        <div
                                            className="progress-bar bg-danger"
                                            role="progressbar"
                                            style={{ width: "30%" }}
                                            aria-valuenow={30}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <div className="label">30%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <DoctorFormUpdate doctorDetail={doctorDetail}/>

                    </div>










                    {/* start page title */}
                    {/* <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0">Update Doctor Profile</h4>

                            </div>
                        </div>
                    </div> */}
                    {/* end page title */}
                    {/* <div className="row">
                        <div className="col-md-8 offset-md-2 col-12 offset-0">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={createDoctor}>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="doctor-name">Doctor Name</label>
                                            <input type="text" className="form-control" id="doctor-name" placeholder="Enter doctor name" name='name' style={{ border: formValidation.doctorName === 0 && '1px solid red' }} defaultValue={doctorDetail.doctorName} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="specialization">Specialization</label>
                                            <input type="text" className="form-control" id="specialization" placeholder="Enter Specialization" name='specialization' style={{ border: formValidation.specialization === 0 && '1px solid red' }} defaultValue={doctorDetail.specialization} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="qualification">qualification</label>
                                            <input type="text" className="form-control" id="qualification" placeholder="Enter qualification" name='qualification' style={{ border: formValidation.qualification === 0 && '1px solid red' }} defaultValue={doctorDetail.qualification} />
                                        </div>



                                        <div className="mb-3" >
                                            {video?.length > 0 && video?.map((video, i) => <div key={i} className="content-section">

                                                <h3>Video {i + 1}</h3>
                                                <label className="form-label" htmlFor={`project-video-img${i}`}>Thumbnail Image</label>
                                                <input className="form-control" id={`project-video-img${i}`} type="file" name='videoImage' accept="image/*" onChange={(e) => handleVideo(e, i)}  />
                                                <div style={{ marginTop: '10px' }}>Choose 1520 x 451 Dimension</div>
                                                <Image priority width={video.videoImage && 100} height={video.videoImage && 100} id={`imagePreview${i}`} alt='' style={{ marginTop: '10px' }}  unoptimized />
                                                <br />


                                                <label className="form-label" htmlFor="video-url">Video Url</label>
                                                <input type='text' name="url" id="video-url" className="form-control"  onChange={(e) => handleVideo(e, i)} placeholder='Enter video url'  required={video.videoImage?true:false} value={video.url} />

                                                <br />



                                                <button type="button" onClick={() => removeVideo(i)} className="remove-btn">
                                                    Remove Video
                                                </button>




                                            </div>)}

                                            <br />

                                            <button type="button" onClick={addVideo} className="add-btn">
                                                Add Video
                                            </button>
                                            <br />


                                        </div>



                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Profile Image</label>
                                            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={fileUpload} style={{ border: formValidation.image === 0 && '1px solid red' }} />
                                            <div style={{ marginTop: '10px' }}>Choose 1920 x 970 Dimension</div>
                                            <Image priority width={imageUrl && 100} height={imageUrl && 100} id='imagePreview' alt='' />

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="short-description">Short Description</label>
                                            <textarea className="form-control" rows={4} placeholder='type...' name='description' id='short-description' style={{ border: formValidation.shortDescription === 0 && '1px solid red' }} defaultValue={doctorDetail.shortDescription} />

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="address">Address</label>
                                            <textarea className="form-control" rows={4} placeholder='type...' name='address' id='address' style={{ border: formValidation.address === 0 && '1px solid red' }} defaultValue={doctorDetail.address} />

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" >Doctor's Content</label>
                                            <JoditEditor ref={editor} config={config} value={doctorDetail.doctorContent} />

                                        </div>

                                        <div className="cardBodySec">
                                            <h4>
                                                Location
                                                <button type="button" onClick={addLocation} className="add-btn" >
                                                    <i className="ri-add-line" /> Add
                                                </button>
                                            </h4>
                                            {location.length > 0 && location?.map((item, i) => <div key={i} className="content-section">

                                                <div class="text-end">
                                                    {location.length > 1 && <button type="button" onClick={() => removeLocation(i)} className="remove-btn">
                                                        <i className="ri-delete-bin-line" />
                                                    </button>
                                                    }
                                                </div>

                                                <label className="form-label" htmlFor="latitude-input">Latitude {location.length === 1 ? "" : i + 1}</label>

                                                <div class="input-group">
                                                    <input type="text" className="form-control" id="latitude-input" placeholder="Enter latitude" name='latitude' value={item.latitude} onChange={(e) => handleLocation(e, i)} required={item.longitude!==""?true:false} />


                                                </div>
                                                <label className="form-label" htmlFor="longitude-input">Longitude {location.length === 1 ? "" : i + 1}</label>
                                                <div class="input-group">
                                                    <input type="text" className="form-control" id="longitude-input" placeholder="Enter longitude" name='longitude' value={item.longitude} onChange={(e) => handleLocation(e, i)} required={item.latitude!==""?true:false} />


                                                </div>
                                            </div>)}
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="gallery-img">Gallery</label>
                                            <input type="file" className="form-control" id="gallery-img" placeholder="Choose File" name='gallery' multiple />
                                            <div style={{ marginTop: '10px' }}>Choose 400 x 300 Dimension</div>

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="email-id">Email</label>
                                            <input type="email" className="form-control" id="email-id" placeholder="Enter email" name='email' style={{ border: formValidation.email === 0 && '1px solid red' }} defaultValue={doctorDetail.email} />

                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="number-id">Mobile Number</label>
                                            <input type="text" className="form-control" id="number-id" placeholder="Enter mobile number" name='number' style={{ border: formValidation.number === 0 && '1px solid red' }} defaultValue={doctorDetail.number} />

                                        </div>




                                        <div className="text-end mb-4">

                                            <button type="submit" className="btn btn-success w-sm">Update</button>
                                        </div>
                                        {
                                            errorMsg !== "" && <div style={{ color: 'red' }}>{errorMsg}</div>
                                        }
                                    </form>
                                </div>
                               
                            </div>
                            

                            

                        </div>
                       

                      
                    </div>  */}
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
                                <p className="text-muted mx-4">Aww yeah, you successfully created your Slider.</p>
                                <div className="mt-4">
                                    <a href="/admin/slider/list" className="btn btn-success w-100">Back to Dashboard</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
