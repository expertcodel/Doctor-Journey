"use client"
import React, { useState, useMemo } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import FabricCropper from './FabricCropper.js'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import JournalDetailsSliderCropper from './JournalDetailsSliderCropper';

function CreateJournal({ journallist }) {

    const [message, setMessage] = useState("");
    const [faq, setFaq] = useState([{ question: "", answer: "" }]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [image, setImage] = useState([{ image: null }])
    const [imageUrl, setImageurl] = useState([{ image: null }])
    const [croppedUrl, setCroppedUrl] = useState([{ image: null }])
    const [plan, setPlan] = useState([{ plan: "", duration: "", price: "", details: "" }]);

    const handleCrop = (blob, index) => {

        const url = URL.createObjectURL(blob);
        const updatedImageurl = [...imageUrl];
        const updatedurl = [...croppedUrl];
        updatedImageurl[index]['image'] = blob;
        updatedurl[index]['image'] = url;
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
        const parent_journal = e.target.journal.value.trim();
        const video_id = e.target.videoId.value.trim();
        const description = document.querySelector('.jodit-wysiwyg').innerHTML
        const formData = new FormData();
        const subscription_plan=updatedPlans;
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
            parent_journal,
            subscription_plan

        }
        for (let i = 0; i < imageUrl.length; i++) {
            formData.append('file', imageUrl[i].image);
        }
        formData.append('data', JSON.stringify(data));
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createJournal`, { method: 'POST', body: formData })
        const res = await response.json();
        setLoading(false);
        if (res.status) {
            sessionStorage.setItem('successMsg', 'Journal Created Successfully');
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
                imagelist[index] = { image: reader.result };
                setImage(imagelist);
            };
            reader.readAsDataURL(file);
        }


    }

    const addSlider = () => {


        setImage((prev) => [...prev, { image: null }]);
        setCroppedUrl((prev) => [...prev, { image: null }]);
        setImageurl((prev) => [...prev, { image: null }]);
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
                    <div className='card p-3'>
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
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="fullnameInput" className="form-label">
                                    frequency
                                </label>

                                <select name="frequency" id="" className="form-control"
                                >
                                    <option value="select" selected>Select</option>
                                    <option value="Yearly">Yearly</option>
                                    <option value="Yearly">Half Yearly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Monthly">Monthly</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="fullnameInput" className="form-label">
                                    Issued Journals
                                </label>

                                <select name="journal" id="" className="form-control"
                                >
                                    <option value="select" selected >This is first version of journal</option>
                                    {journallist.map((journal, i) => <option value={journal.journalsId} key={i}>{journal.journalsName}</option>)}
                                </select>
                            </div>
                            <div className="col-12">
                                <label htmlFor="form-control" className="form-label">
                                    Description
                                </label>
                                <JoditEditor config={config} className='editor-content' />
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
                                    <h3 className='d-flex justify-content-between align-items-center'>
                                        Slider {i + 1}
                                        <span className="ms-3">
                                            {image.length > 1 && <button type="button" onClick={() => removeSlider(i)} className="remove-btn btn btn-danger ms-auto">
                                                <i className="fas fa-trash" />
                                            </button>
                                            }
                                        </span>
                                    </h3>
                                    <label className="form-label" htmlFor={`project-section-img${i}`}>Slider Image</label>
                                    <div className='row'>
                                        <div className='col-md-6 col-12'>
                                            <input className="form-control" id={`project-section-img${i}`} type="file" name='sliderImage' accept="image/*" onChange={(e) => handleSlider(e, i)} required />
                                            {item.image && <JournalDetailsSliderCropper imageSrc={item.image} onCrop={(blob) => handleCrop(blob, i)} />}
                                        </div>

                                        <div className='col-md-6 col-12'>
                                            {croppedUrl[i].image && (
                                                <div>
                                                    <h3 className="text-lg font-medium">Cropped Preview:</h3>
                                                    <figure className='mt-2 mb-0 border d-inline-flex rounded p-3'>
                                                        <img src={croppedUrl[i].image} width={150} height={150} alt="=Cropped result" />
                                                    </figure>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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

                                            <JoditEditor config={config} />

                                        </div>
                                    </div>
                                </div>)}

                            </div>


                            <div className="col-12">
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        {loading ? <div className="spinner-border text-white" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : 'Create'}

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
        </div>
    )
}

export default CreateJournal