"use client"
import React, { useState, useMemo } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import FabricCropper from './FabricCropper.js'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

function JournalUpdate({ journalDetail }) {

    const [message, setMessage] = useState("");
    const [faq, setFaq] = useState(journalDetail.faqs ? journalDetail.faqs : [{ question: "", answer: "" }]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [image, setImage] = useState(journalDetail.journal_slider ? journalDetail.journal_slider : [""])
    const [imageUrl, setImageurl] = useState(journalDetail.journal_slider ? journalDetail.journal_slider : [""])
    const [croppedUrl, setCroppedUrl] = useState(journalDetail.journal_slider ? journalDetail.journal_slider : [""])
    const [plan, setPlan] = useState(journalDetail.subscription_plan ? journalDetail.subscription_plan : [{ plan: "", duration: "", price: "", details: "" }]);
    const [imageUrl1, setImageurl1] = useState(null);
    const [image1, setImage1] = useState(journalDetail.imageUrl)
    const [croppedUrl1, setCroppedUrl1] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setImage1(reader.result)
            reader.readAsDataURL(file)
        }
    }

    const handleCropImage = (blob) => {
        const url = URL.createObjectURL(blob);
        setImageurl1(blob);
        setCroppedUrl1(url)
    }

    const handleCrop = (blob, index) => {

        const url = URL.createObjectURL(blob);
        const updatedImageurl = [...imageUrl];
        const updatedurl = [...croppedUrl];
        updatedImageurl[index] = blob;
        updatedurl[index] = url;
        setImageurl(updatedImageurl);
        setCroppedUrl(updatedurl);
    }


    async function saveJournal(e) {

        e.preventDefault();

        let arr = [];
        let parent = Array.from(document.querySelectorAll('.subscription'))

        parent.forEach((p) => {
            const child = p.querySelector('.jodit-wysiwyg');
            if (child) {
                arr.push(child.innerHTML);
            } else {
                console.log('No .jodit-wysiwyg found in this parent');
            }
        })


        let updatedPlans = [...plan];
        for (let i = 0; i < updatedPlans.length; i++) {
            updatedPlans[i]['details'] = arr[i];
        }

        const journalsName = e.target.Journalname.value.trim();
        const journalsIsbn = e.target.ISBN.value.trim();
        const publisherName = e.target.Publishername.value.trim();
        const volume = e.target.volume.value.trim();
        const frequency = e.target.frequency.value.trim();
        // const parent_journal = e.target.journal.value.trim();
        const video_id = e.target.videoId.value.trim();
        const description = document.querySelector('.jodit-wysiwyg').innerHTML
        const formData = new FormData();
        const subscription_plan = updatedPlans;
        const data =
        {
            journalsName,
            journalsIsbn,
            publisherName,
            video_id,
            volume,
            frequency,
            description,
            faq,
          
            subscription_plan,
            journalsId: journalDetail.journalsId

        }

        for (let i = 0; i < imageUrl.length; i++) {
            formData.append('file', imageUrl[i]);
        }
        formData.append('image', imageUrl1);
        formData.append('data', JSON.stringify(data));
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getJournal`, { method: 'PATCH', body: formData })
        const res = await response.json();
        setLoading(false);
        if (res.status) {
            sessionStorage.setItem('successMsg', 'Journal Updated Successfully');
            router.push("/dashboard/journal/journalslist");
        }
        else {
            setMessage(res.message);
            setTimeout(() => {
                setMessage("");
            }, 3000);
        }


    }

    const config = useMemo(() => {
        return {
            readonly: false,
            toolbar: true,
            minHeight: 300,
            spellcheck: true,
            placeholder: 'Type something here...',
            uploader: {
                insertImageAsBase64URI: true
            }
        }

    }, []);

    const handleChange = (event, index) => {

        const { name, value } = event.target;
        const faqlist = [...faq];
        faqlist[index][name] = value;
        setFaq(faqlist);
    }

    const handleAdd = () => {

        setFaq((prev) => [...prev, { question: "", answer: "" }]);

    }

    const handleRemove = (index) => {


        setFaq(faq.filter((_, i) => i !== index));
    }


    const handleSlider = (event, index) => {

        const file = document.getElementById(`project-section-img${index}`).files[0]
        if (file) {

            const reader = new FileReader();
            reader.onload = () => {
                const imagelist = [...image];
                // imagelist[index] = { image: reader.result };
                imagelist[index] = reader.result;
                setImage(imagelist);
            };
            reader.readAsDataURL(file);
        }


    }

    const addSlider = () => {

        setImage((prev) => [...prev, ""]);
        setCroppedUrl((prev) => [...prev, ""]);
        setImageurl((prev) => [...prev, ""]);
    }

    const removeSlider = (index) => {

        setImage(image.filter((_, i) => i !== index));
        setCroppedUrl(croppedUrl.filter((_, i) => i !== index));
        setImageurl(imageUrl.filter((_, i) => i !== index));
    }



    const handlePlan = (event, index) => {

        const { name, value } = event.target;
        const planlist = [...plan];
        planlist[index][name] = value;
        setPlan(planlist);

    }

    const addPlan = () => {


        setPlan((prev) => [...prev, { plan: "", price: "", duration: "", details: "" }]);

    }

    const removePlan = (index) => {

        setPlan(plan.filter((_, i) => i !== index));

    }



    return (

        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <form className="row g-3" onSubmit={saveJournal}>

                        <div className="col-md-6">
                            <label htmlFor="fullnameInput" className="form-label">
                                Journal Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullnameInput"
                                placeholder="Journal Name"
                                name='Journalname'
                                defaultValue={journalDetail.journalsName}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fullnameInput" className="form-label">
                                ISBN
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullnameInput"
                                placeholder="ISBN"
                                name='ISBN'
                                defaultValue={journalDetail.journalsIsbn}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="fullnameInput" className="form-label">
                                Publisher Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullnameInput"
                                placeholder="Publisher Name"
                                name='Publishername'
                                defaultValue={journalDetail.publisherName}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="fullnameInput" className="form-label">
                                Journal Volume
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullnameInput"
                                placeholder="Journal volume"
                                name='volume'
                                defaultValue={journalDetail.volume}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="fullnameInput" className="form-label">
                                Video Id
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullnameInput"
                                placeholder="Youtube video id"
                                name='videoId'
                                defaultValue={journalDetail.video_id}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fullnameInput" className="form-label">
                                frequency
                            </label>

                            <select name="frequency" className="form-control"
                                defaultValue={journalDetail.frequency}>
                                {/* <option value="select" selected>Select</option> */}
                                <option value="Yearly">Yearly</option>
                                <option value="Yearly">Half Yearly</option>
                                <option value="Quarterly">Quarterly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fullnameInput" className="form-label">
                                Cover Image
                            </label>

                            <input className="form-control" id="project-thumbnail-img" type="file" name='image' accept="image/*" onChange={handleFileChange} />

                            {image1 && <FabricCropper imageSrc={image1} onCrop={handleCropImage} />}

                            {croppedUrl1 && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">Cropped Preview:</h3>
                                    <img src={croppedUrl1} width={274} height={185} alt="Cropped result" />
                                </div>
                            )}
                        </div>
                        <div className="col-12">
                            <label htmlFor="form-control" className="form-label">
                                Description
                            </label>
                            <JoditEditor config={config} className='editor-content' value={journalDetail.coverSummary} />
                        </div>

                        <div className="col-12">

                            <h4 className='d-flex align-items-center'>
                                Journals Faq
                                <button type="button" onClick={handleAdd} className="add-btn btn btn-info ms-auto" >
                                    <i className="ri-add-line" /> Add
                                </button>
                            </h4>

                            {faq.length > 0 && faq.map((item, i) => <div key={i} className="content-section">

                                <div class="text-end">
                                    {faq.length > 1 && <button type="button" onClick={() => handleRemove(i)} className="remove-btn btn btn-danger ms-auto">
                                        <i className="fas fa-trash" />
                                    </button>
                                    }
                                </div>

                                <div className='row'>


                                    <div className="col-lg-6 mb-3">
                                        <label className="form-label" htmlFor="latitude-input">Question {faq.length === 1 ? "" : i + 1}</label>
                                        <input type="text" className="form-control" placeholder="Enter question" onChange={(e) => handleChange(e, i)} required={item.answer !== "" ? true : false} name='question' value={item.question} />


                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label className="form-label" htmlFor="longitude-input">Answer {faq.length === 1 ? "" : i + 1}</label>

                                        <input type="text" className="form-control" placeholder="Enter answer" onChange={(e) => handleChange(e, i)} required={item.question !== "" ? true : false} name='answer' value={item.answer} />

                                    </div>
                                </div>
                            </div>)}

                        </div>

                        <div className='col-12'>
                            <h4 className='d-flex align-items-center'>
                                Journals Sliders
                                <button type="button" onClick={addSlider} className="add-btn btn btn-info ms-auto" >
                                    <i className="ri-add-line" /> Add
                                </button>
                            </h4>
                            {image.length > 0 && image.map((item, i) => <div key={i} className="content-section">

                                <div class="text-end">
                                    {image.length > 1 && <button type="button" onClick={() => removeSlider(i)} className="remove-btn btn btn-danger ms-auto">
                                        <i className="fas fa-trash" />
                                    </button>
                                    }
                                </div>

                                <h3>Slider {i + 1}</h3>
                                <label className="form-label" htmlFor={`project-section-img${i}`}>Slider Image</label>
                                <input className="form-control" id={`project-section-img${i}`} type="file" name='sliderImage' accept="image/*" onChange={(e) => handleSlider(e, i)} />
                                {item && <FabricCropper imageSrc={item} onCrop={(blob) => handleCrop(blob, i)} />}

                                {croppedUrl[i] && (
                                    <div className="mt-4">
                                        <h3 className="text-lg font-medium">Cropped Preview:</h3>
                                        <img src={croppedUrl[i]} width={150} height={150} alt="Cropped result" />
                                    </div>
                                )}
                            </div>)}

                        </div>

                        <div className="col-12">

                            <h4 className='d-flex align-items-center'>
                                Journals Subscription
                                <button type="button" onClick={addPlan} className="add-btn btn btn-info ms-auto" >
                                    <i className="ri-add-line" /> Add
                                </button>
                            </h4>

                            {plan.length > 0 && plan.map((item, i) => <div key={i} className="content-section subscription">

                                <div class="text-end">
                                    {plan.length > 1 && <button type="button" onClick={() => removePlan(i)} className="remove-btn btn btn-danger ms-auto">
                                        <i className="fas fa-trash" />
                                    </button>
                                    }
                                </div>

                                <div className='row'>


                                    <div className="col-lg-4 mb-3">
                                        <label className="form-label" htmlFor="latitude-input">Plan {plan.length === 1 ? "" : i + 1}</label>
                                        <input type="text" className="form-control" placeholder="Enter plan name" onChange={(e) => handlePlan(e, i)} name='plan' value={item.plan} />


                                    </div>

                                    <div className="col-lg-4 mb-3">
                                        <label className="form-label" htmlFor="longitude-input">Price </label>

                                        <input type="text" className="form-control" placeholder="Enter plan price" onChange={(e) => handlePlan(e, i)} name='price' value={item.price} />

                                    </div>

                                    <div className="col-lg-4 mb-3">
                                        <label className="form-label" htmlFor="longitude-input">Duration </label>
                                        <select className="form-control" name="duration" onChange={(e) => handlePlan(e, i)} value={item.duration} >
                                            <option value="Select" selected>Select</option>
                                            <option value="Monthly" >Monthly</option>
                                            <option value="Quaterly" >Quaterly</option>
                                            <option value="Half Yearly" >Half Yearly</option>
                                            <option value="Yearly" >Yearly</option>
                                        </select>
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <label className="form-label" htmlFor="longitude-input">Details</label>

                                        <JoditEditor config={config} value={item.details} />

                                    </div>
                                </div>
                            </div>)}

                        </div>


                        <div className="col-12">
                            <div className="text-end">
                                <button type="submit" className="btn btn-primary">
                                    {loading ? <div className="spinner-border text-white" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> : 'Update'}

                                </button>
                                {
                                    message !== "" && <div className='text-danger'>{message}</div>
                                }
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default JournalUpdate