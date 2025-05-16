"use client"
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Tooltip from './Tooltip';
import { extractErrorMessage } from '../utils/errorMessage';
import { useRouter } from 'next/navigation';
export default function DoctorForm({ doctorDetail }) {

    const [errorMsg, setErrormsg] = useState("");
    const [document, setDocument] = useState(doctorDetail.document ? doctorDetail.document : [{ documentName: "", documentFile: "" }]);
    const [imageUrl, setImageurl] = useState(doctorDetail.profileImage);
    const domRef = useRef(null);
    const imgRef = useRef([]);
    const profileImg = useRef(null);
    const previewImg = useRef(null);
    const router = useRouter()
    const [location, setLocation] = useState(doctorDetail.location ? doctorDetail.location : [{ latitude: "", longitude: "" }]);

    useEffect(() => {

        doctorDetail.document.forEach((url, i) => imgRef.current[i].src = url.documentFile);
    }, [])



    const addDocument = () => {

        setDocument((prev) => [...prev, { documentName: "", documentFile: "" }]);

    }

    const removeDocument = (i) => {

        setDocument(document.filter((_, idx) => idx !== i));

    }

    const handleDocument = (event, index) => {

        const { name, value } = event.target;
        console.log(domRef.current.files[0], 'kk');

        if (name === 'documentFile') {
            const documentlist = [...document];
            const file = domRef.current.files[0]
            const imageurl = URL.createObjectURL(file);
            // domRef.`imagePreview${index}`.src = imageurl;
            imgRef.current[index].src = imageurl;
            documentlist[index][name] = file
            setDocument(documentlist);

        }
        else {

            const documentlist = [...document];
            documentlist[index][name] = value;
            setDocument(documentlist);
        }

    }

    const addLocation = () => {

        setLocation((prev) => [...prev, { latitude: "", longitude: "" }]);

    }

    const removeLocation = (i) => {

        setLocation(location.filter((_, idx) => idx !== i));

    }

    const handleLocation = (e, i) => {

        e.preventDefault();
        const { name, value } = e.target;
        const updatedlocation = [...location];
        updatedlocation[i][name] = value;
        setLocation(updatedlocation);

    }

    const createDoctor = async (e) => {

        e.preventDefault();
        const doctorName = e.target.name.value.trim();
        const number = e.target.number.value.trim();
        const email = e.target.email.value.trim();
        const specialization = e.target.specialization.value.trim();
        const qualification = e.target.qualification.value.trim();
        const experience = e.target.experience.value.trim();
        const shortDescription = e.target.description.value.trim();
        const city = e.target.city.value.trim();
        const country = e.target.country.value.trim();
        const zip = e.target.zip.value.trim();
        const address = e.target.address.value.trim();
        const accountName = e.target.accountName.value.trim();
        const accountType = e.target.accountType.value.trim();
        const gstNumber = e.target.gstNumber.value.trim();
        const accountNumber = e.target.accountNumber.value.trim();
        const ifsc = e.target.ifsc.value.trim();
        const bankName = e.target.bankName.value.trim();
        const branchName = e.target.branchName.value.trim();
        const branchAddress = e.target.branchAddress.value.trim();
        const profileImage = profileImg.current.files[0];
       
        try {

            const data = {

                doctorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, doctorId: doctorDetail.doctorId, document, gstNumber, accountType, accountName
            }

            const formData = new FormData();
            formData.append('profileImage', profileImage);
            for (let i = 0; i < document.length; i++) {
                formData.append('documentImage', document[i].documentFile);
            }
            formData.append('data', JSON.stringify(data));


            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors`, {
                method: 'PUT',
                body: formData
            })

            const res = await response.json();

            if (res.status) {

                sessionStorage.setItem('successMsg', 'Doctor Profile Updated Successfully');
                router.push("/admin/doctors/list");

            }
            else {

                setErrormsg(res.message);
            }

        } catch (error) {

            const message = extractErrorMessage(error);
            setErrormsg(message)

        }
    }

    const fileUpload = () => {


        const imageurl = URL.createObjectURL(profileImg.current.files[0]);
        // previewImg.current.src = imageurl
        setImageurl(imageurl);


    }



    return (
        <div className="col-xxl-9">
            <div className="card mt-xxl-n5">
                <div className="card-header">
                    <ul
                        className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                        role="tablist"
                    >
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link active"
                                data-bs-toggle="tab"
                                href="#personalDetails"
                                role="tab"
                                aria-selected="true"
                            >
                                <i className="fas fa-home" /> Basic Details
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#changePassword"
                                role="tab"
                                aria-selected="false"
                                tabIndex={-1}
                            >
                                <i className="far fa-user" /> Contact Details
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#experience"
                                role="tab"
                                aria-selected="false"
                                tabIndex={-1}
                            >
                                <i className="far fa-envelope" /> Document
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                data-bs-toggle="tab"
                                href="#privacy"
                                role="tab"
                                aria-selected="false"
                                tabIndex={-1}
                            >
                                <i className="far fa-envelope" /> Bank Details
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={createDoctor}>
                        <div className="tab-content">
                            <div
                                className="tab-pane active show"
                                id="personalDetails"
                                role="tabpanel"
                            >
                                {/* <form onSubmit={createDoctor}> */}
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="firstnameInput" className="form-label">
                                                Doctor Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="firstnameInput"
                                                placeholder="Enter your name"
                                                name='name'
                                                defaultValue={doctorDetail.doctorName}

                                            />
                                        </div>
                                    </div>
                                    {/*end col*/}

                                    {/*end col*/}
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="phonenumberInput" className="form-label">
                                                Phone Number
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phonenumberInput"
                                                placeholder="Enter your phone number"
                                                name='number'
                                                defaultValue={doctorDetail.number}
                                            />
                                        </div>
                                    </div>
                                    {/*end col*/}
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="emailInput" className="form-label">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="emailInput"
                                                placeholder="Enter your email"
                                                name='email'
                                                defaultValue={doctorDetail.email}

                                            />
                                        </div>
                                    </div>
                                    {/*end col*/}
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="profile-img" className="form-label">
                                                Profile Image
                                            </label>
                                            <input
                                                type="file"
                                                className="form-control flatpickr-input"
                                                id="profile-img1"
                                                name='image'
                                                accept='image/*'
                                                ref={profileImg}
                                                onChange={fileUpload}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <img id='imagePreview' width={imageUrl && 100} height={imageUrl && 100} ref={previewImg} alt='' src={imageUrl} />
                                        </div>

                                    </div>


                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="Specialization" className="form-label">
                                                Specialization
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Specialization"
                                                placeholder="Enter specialization"
                                                name='specialization'
                                                defaultValue={doctorDetail.specialization}

                                            />
                                        </div>
                                    </div>


                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="Qualification" className="form-label">
                                                Qualification
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Qualification"
                                                placeholder="Enter qualification"
                                                name='qualification'
                                                defaultValue={doctorDetail.qualification}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="Experience" className="form-label">
                                                Experience
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Experience"
                                                placeholder="Enter experience"
                                                name='experience'
                                                defaultValue={doctorDetail.experience}

                                            />
                                        </div>
                                    </div>

                                    {/*end col*/}
                                    <div className="col-lg-12">
                                        <div className="mb-3 pb-2">
                                            <label
                                                htmlFor="exampleFormControlTextarea"
                                                className="form-label"
                                            >
                                                Short Description
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="exampleFormControlTextarea"
                                                placeholder="Enter your description"
                                                name='description'
                                                rows={3}
                                                defaultValue={doctorDetail.shortDescription}

                                            />
                                        </div>
                                    </div>
                                    {/*end col*/}

                                    {/*end col*/}
                                </div>
                                {/*end row*/}
                                {/* </form> */}
                            </div>
                            {/*end tab-pane*/}
                            <div className="tab-pane" id="changePassword" role="tabpanel">
                                {/* <form > */}
                                <div className="row g-2">
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="cityInput" className="form-label">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cityInput"
                                                placeholder="City"
                                                name='city'
                                                defaultValue={doctorDetail.city}

                                            />
                                        </div>
                                    </div>
                                    {/*end col*/}
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="countryInput" className="form-label">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="countryInput"
                                                placeholder="Country"
                                                name='country'
                                                defaultValue={doctorDetail.country}

                                            />
                                        </div>
                                    </div>
                                    {/*end col*/}
                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="zipcodeInput" className="form-label">
                                                Zip Code
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                minLength={5}
                                                maxLength={6}
                                                id="zipcodeInput"
                                                placeholder="Enter Zipcode"
                                                name='zip'
                                                defaultValue={doctorDetail.zip}

                                            />
                                        </div>
                                    </div>
                                    {/*end col*/}
                                    <div className="col-lg-12">
                                        <div className="mb-3 pb-2">
                                            <label
                                                htmlFor="Address"
                                                className="form-label"
                                            >
                                                Address
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="Address"
                                                placeholder="Enter your Address"
                                                rows={3}
                                                name='address'
                                                defaultValue={doctorDetail.address}

                                            />
                                        </div>
                                    </div>
                                    <div className="cardBodySec">
                                        <h4>
                                            Location
                                            <button type="button" onClick={addLocation} className="add-btn" >
                                                <i className="ri-add-line" /> Add
                                            </button>
                                        </h4>
                                        {location.length > 0 && location.map((item, i) => <div key={i} className="content-section">

                                            <div class="text-end">
                                                {location.length > 1 && <button type="button" onClick={() => removeLocation(i)} className="remove-btn">
                                                    <i className="ri-delete-bin-line" />
                                                </button>
                                                }
                                            </div>

                                            <div className='row'>


                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label" htmlFor="latitude-input">Latitude {location.length === 1 ? "" : i + 1}</label>
                                                    <input type="text" className="form-control" id="latitude-input" placeholder="Enter latitude" name='latitude' value={item.latitude} onChange={(e) => handleLocation(e, i)} required={item.longitude !== "" ? true : false} />


                                                </div>

                                                <div className="col-lg-6 mb-3">
                                                    <label className="form-label" htmlFor="longitude-input">Longitude {location.length === 1 ? "" : i + 1}</label>

                                                    <input type="text" className="form-control" id="longitude-input" placeholder="Enter longitude" name='longitude' value={item.longitude} onChange={(e) => handleLocation(e, i)} required={item.latitude !== "" ? true : false} />


                                                </div>
                                            </div>
                                        </div>)}
                                    </div>


                                </div>

                                {/* </form> */}

                            </div>
                            {/*end tab-pane*/}
                            <div className="tab-pane" id="experience" role="tabpanel">
                                {/* <form> */}

                                <div className="cardBodySec">
                                    <h4>
                                        Document
                                        <button type="button" onClick={addDocument} className="add-btn" >
                                            <i className="ri-add-line" /> Add
                                        </button>
                                    </h4>
                                    {document.length > 0 && document.map((item, i) => <div key={i} className="content-section">

                                        <div class="text-end">
                                            {document.length > 1 && <button type="button" onClick={() => removeDocument(i)} className="remove-btn">
                                                <i className="ri-delete-bin-line" />
                                            </button>
                                            }
                                        </div>

                                        <div className='row'>


                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label" htmlFor="latitude-input">Document Name {document.length === 1 ? "" : i + 1}</label>
                                                <select name="documentName" id="" className="form-control" onChange={(e) => handleDocument(e, i)} required={item.documentFile !== "" ? true : false} >
                                                    <option value="select" selected={item.documentName === 'select' ? true : false}>Select</option>
                                                    <option value="Medical Degree" selected={item.documentName === 'Medical Degree' ? true : false}>Medical Degree</option>
                                                    <option value="Identity Document" selected={item.documentName === 'Identity Document' ? true : false}>Identity Document</option>
                                                    <option value="License/Registration" selected={item.documentName === 'License/Registration' ? true : false}>License/Registration</option>
                                                </select>

                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label" htmlFor="longitude-input">Upload File {document.length === 1 ? "" : i + 1}</label>

                                                <input type="file" className="form-control" id={`project-document-img${i}`} placeholder="Choose File" onChange={(e) => handleDocument(e, i)} name='documentFile' accept="image/*,application/pdf" ref={domRef} />

                                                <img priority width={item.documentFile && 100} height={item.documentFile && 100} id={`imagePreview${i}`} alt='' style={{ marginTop: '10px' }} ref={(el) => (imgRef.current[i] = el)} />
                                                <br />


                                            </div>
                                        </div>
                                    </div>)}
                                </div>

                                {/* <div className='row'>


                                    <div className="col-lg-6" id='im2'>
                                        <div className="mb-3">
                                            <label htmlFor="degreeInput" className="form-label">
                                                Medical degree certificate
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="degreeInput"
                                                placeholder="Enter degree Name"
                                                name='degreeName'
                                                defaultValue={doctorDetail.degreeName}


                                            />
                                        </div>

                                        <div className="mb-3" id='img2'>

                                            <input
                                                type="file"
                                                className="form-control"
                                                name='degreeDocument'
                                                placeholder="Choose File"
                                                accept='image/*'
                                                onChange={() => fileUpload("profile-img2", 'imagePreview2')}
                                                id='profile-image2'

                                            />
                                        </div>

                                       


                                    </div>

                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="identityInput" className="form-label">
                                                Proof of identity
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="identityInput"
                                                placeholder="Aadhar,Passport,Pan,etc"
                                                name='identityName'
                                                defaultValue={doctorDetail.identityName}

                                            />
                                        </div>

                                        <div className="mb-3">

                                            <input
                                                type="file"
                                                className="form-control"
                                                name='identityDocument'
                                                placeholder="Choose File"
                                                accept='image/*'
                                                onChange={() => fileUpload("profile-img3", 'imagePreview3')}
                                                id='profile-image3'

                                            />
                                        </div>

                                   
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="registrationInput" className="form-label">
                                                Medical Council registration/license
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="registrationInput"
                                                placeholder="NMC (India), GMC (UK), ECFMG (USA)"
                                                name='license'
                                                defaultValue={doctorDetail.license}

                                            />
                                        </div>

                                        <div className="mb-3">

                                            <input
                                                type="file"
                                                className="form-control"
                                                name='licenseDocument'
                                                placeholder="Choose File"
                                                accept='image/*'
                                                onChange={() => fileUpload("profile-img4", 'imagePreview4')}
                                                id='profile-image4'

                                            />
                                        </div>

                                      
                                    </div>
                                </div> */}


                                {/* </form> */}
                            </div>
                            {/*end tab-pane*/}
                            <div className="tab-pane" id="privacy" role="tabpanel">
                                {/* <form onSubmit={createDoctor}> */}
                                <div className='row'>

                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="accountInput" className="form-label">
                                                Account No
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="accountInput"
                                                placeholder="Enter your a/c no"
                                                name='accountNumber'
                                                defaultValue={doctorDetail.accountNumber}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="ifscInput" className="form-label">
                                                Ifsc Code
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="ifscInput"
                                                placeholder="Enter your ifsc code"
                                                name='ifsc'
                                                defaultValue={doctorDetail.ifsc}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="accountname" className="form-label">
                                                Account Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="accountname"
                                                placeholder="Enter account name"
                                                name='accountName'
                                                defaultValue={doctorDetail.accountName}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="accounttype" className="form-label">
                                                A/c Type
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="accounttype"
                                                placeholder="Enter Account Type"
                                                name='accountType'
                                                defaultValue={doctorDetail.accountType}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="mb-3">
                                            <label htmlFor="gstnumber" className="form-label">
                                                Gst Number
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"

                                                id="gstnumber"
                                                placeholder="Enter Gst Number"
                                                name='gstNumber'
                                                defaultValue={doctorDetail.gstNumber}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="bankInput" className="form-label">
                                                Bank Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="bankInput"
                                                placeholder="Enter your bank name"
                                                name='bankName'
                                                defaultValue={doctorDetail.bankName}

                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="branchInput" className="form-label">
                                                Branch Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="branchInput"
                                                placeholder="Enter your branch name"
                                                name='branchName'
                                                defaultValue={doctorDetail.branchName}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="mb-3 pb-2">
                                            <label
                                                htmlFor="branchAddress"
                                                className="form-label"
                                            >
                                                Branch Address
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="branchAddress"
                                                placeholder="Enter your branch Address"
                                                name='branchAddress'
                                                rows={3}
                                                defaultValue={doctorDetail.branchAddress}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="hstack gap-2 justify-content-end">
                                            <div className='col-auto' style={{ color: 'red' }}>{errorMsg !== "" && errorMsg}</div>
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                            <button type="button" className="btn btn-soft-success">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>

                                </div>
                                {/* </form> */}
                            </div>
                            {/*end tab-pane*/}
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
