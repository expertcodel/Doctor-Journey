"use client"

import axios from 'axios'
import { useState, useRef } from 'react';
import Image from 'next/image'
import dynamic from 'next/dynamic';
import AdminFooter from './AdminFooter.jsx'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { useRouter } from 'next/navigation';
export default function Page({ offerDetail }) {



    const router = useRouter();
    const editor = useRef(null)
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl, setImageurl] = useState(null);
     const [imageUrl1, setImageurl1] = useState(offerDetail.offerImage);

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

    const [formValidation, setFormvalidation] = useState({ discount: -1, image: -1 })
    const createOffer = async (e) => {

        e.preventDefault();
        let arr = [1, 1, 1];
        let flag = true;
        const offerDiscount = e.target.discount.value.trim();
        // const videoUrl = e.target.url.value.trim();
        // const doctorId = JSON.parse(e.target.doctor.value).id.trim();
        // const doctorName = JSON.parse(e.target.doctor.value).name.trim();
        //const specialization = JSON.parse(e.target.doctor.value).specialization.trim();
        const offerContent = document.querySelector('.jodit-wysiwyg').innerHTML;


        if (offerDiscount === "") {
            arr[0] = 0;
            flag = false;

        }

        // if (!imageUrl) {
        //     arr[1] = 0;
        //     flag = false;
        // }





        if (flag) {

            setFormvalidation({ discount: arr[0], image: arr[1] });


            const data = {

                offerContent, offerDiscount,offerId:offerDetail.offerId
            }

            const formData = new FormData();
            formData.append('file', imageUrl);
            formData.append('data', JSON.stringify(data));

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/offer`, {
                method: 'PUT',
                body: formData
            })

            const res = await response.json();

            if (res.status) {

                sessionStorage.setItem('successMsg', 'Offer Updated Successfully');
                router.push("/admin/journal/offer/list");

            }
            else {

                setErrormsg(res.message);
            }

        }
        else {

            setFormvalidation({ discount: arr[0], image: arr[1] });
        }





    }

    const fileUpload = () => {


        const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
        const imageurl = URL.createObjectURL(thumbnailImage);
        //imagePreview.src = imageurl
        setImageurl(thumbnailImage);
        setImageurl1(imageurl);


    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0">Update Offers</h4>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}
                    <div className="row">
                        <div className="col-md-8 offset-md-2 col-12 offset-0">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={createOffer}>


                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-title-input">Discount</label>
                                            <input type="text" className="form-control" id="menu-title-input" placeholder="Enter discount" name='discount' style={{ border: formValidation.discount === 0 && '1px solid red' }} defaultValue={offerDetail.offerDiscount} />
                                        </div>



                                     
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Offer Image</label>
                                            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={fileUpload} style={{ border: formValidation.image === 0 && '1px solid red' }} />
                                            <div style={{ marginTop: '10px' }}>Choose 300 x 300 Dimension</div>
                                            {!success && <img width={imageUrl1 && 100} height={imageUrl1 && 100} id='imagePreview' alt='' src={imageUrl1}/>}

                                        </div>





                                        <div className="mb-3">
                                            <label className="form-label">Offer Description</label>


                                            <JoditEditor
                                                config={config}
                                                ref={editor}
                                                value={offerDetail.offerContent}

                                            />

                                        </div>


                                        <div className="text-end mb-4">

                                            <button type="submit" className="btn btn-success w-sm">Update</button>
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
