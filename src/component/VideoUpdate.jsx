"use client"

import axios from 'axios'
import { useState, useRef } from 'react';
import { UniversalContext } from './context.js';
import dynamic from 'next/dynamic';
import AdminFooter from './AdminFooter.jsx'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import { useRouter } from 'next/navigation';
export default function VideoUpdate({ videoDetail, Videostatus, Videostatus1 }) {


    const { userData } = UniversalContext();
    const router = useRouter();
    const editor = useRef(null)
    const [success, setSuccess] = useState(false);
    const [videoStatus, setVideostatus] = useState(Videostatus);
    const [videoStatus1, setVideostatus1] = useState(Videostatus1);
    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl, setImageurl] = useState(null);
    const [imageUrl1, setImageurl1] = useState(videoDetail.thumbnailImage);

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
       

        let videostatus;
        if (videoStatus1 === 'active') {
            videostatus = true;
        }
        else {
            videostatus = false;
        }




        if (videoTitle === "") {
            arr[0] = 0;
            flag = false;

        }


        if (videoUrl === "") {
            arr[1] = 0;
            flag = false;
        }

       

        // if (!imageUrl) {
        //     arr[3] = 0;
        //     flag = false;
        // }





        if (flag) {

            setFormvalidation({ title: arr[0], url: arr[1], doctor: arr[2], image: arr[3] });


            const data = {

                videoUrl, videoTitle, videoContent, videoId: videoDetail.videoId, videoStatus: videostatus

            }

            const formData = new FormData();
            formData.append('file', imageUrl);
            formData.append('data', JSON.stringify(data));

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors/uploadVideo`, {
                method: 'PUT',
                body: formData
            })

            const res = await response.json();

            if (res.status) {

                sessionStorage.setItem('successMsg', 'Video Updated Successfully');
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

    const fileUpload = () => {


        const thumbnailImage = document.getElementById('project-thumbnail-img').files[0];
        const imageurl = URL.createObjectURL(thumbnailImage);
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
                                <h4 className="mb-sm-0">Update Video</h4>

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
                                            <input type="text" className="form-control" id="menu-title-input" placeholder="Enter title" name='title' style={{ border: formValidation.title === 0 && '1px solid red' }} defaultValue={videoDetail.videoTitle} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-serial-input">Video Url</label>
                                            <input type="text" className="form-control" id="menu-serial-input" placeholder="Enter url" name='url' style={{ border: formValidation.url === 0 && '1px solid red' }} defaultValue={videoDetail.videoUrl} />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="choices-categories-input" className="form-label">Status</label>
                                            <select className="form-select" onChange={(e) => setVideostatus1(e.target.value)}  >
                                                <option value={videoStatus === 'active' ? 'active' : 'inactive'} >{videoStatus === 'active' ? 'active' : 'inactive'}</option>
                                                <option value={videoStatus === 'active' ? 'inactive' : 'active'} >{videoStatus === 'active' ? 'inactive' : 'active'}</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="project-thumbnail-img">Thumbnail Image</label>
                                            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={fileUpload} style={{ border: formValidation.image === 0 && '1px solid red' }} />
                                            <div style={{ marginTop: '10px' }}>Choose 300 x 300 Dimension</div>
                                            <img width={imageUrl1 && 100} height={imageUrl1 && 100} id='imagePreview' alt='' src={imageUrl1} />

                                        </div>





                                        <div className="mb-3">
                                            <label className="form-label">Description</label>


                                            <JoditEditor
                                                config={config}
                                                ref={editor}
                                                value={videoDetail.videoContent}

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

        </div>
    )
}
