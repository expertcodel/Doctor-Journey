"use client"
import React from 'react'
import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import Tooltip from './Tooltip';
import { extractErrorMessage } from '../utils/errorMessage';
import { useRouter } from 'next/navigation';

export default function DoctorForm() {

    const [errorMsg, setErrormsg] = useState("");
    const [imageUrl, setImageurl] = useState(null);
    const [tabs, setTabs] = useState({ first: true, second: false, third: false, fourth: false });
    const [formValidation, setFormvalidation] = useState({ name: -1, number: -1, email: -1, image: -1, specialization: -1, qualification: -1, city: -1, country: -1, zip: -1, accountNumber: -1, accountType: -1, ifsc: -1, accountName: -1, branchName: -1, branchAddress: -1, bankName: -1, document: -1 })
    const [tabsdata, setTabsData] = useState({ name: "", number: "", email: "", image: null, specialization: "", qualification: "", experience: "", description: "", city: "", country: "", zip: "", accountNumber: "", accountType: "", ifsc: "", accountName: "", branchName: "", branchAddress: "", bankName: "", gstNumber: "", address: "" })
    const domRef = useRef(null);
    const imgRef = useRef([]);
    const profileImg = useRef(null);
    const previewImg = useRef(null);
    const [location, setLocation] = useState([{ latitude: "", longitude: "" }]);
    const [document, setDocument] = useState([{ documentName: "", documentFile: null, documentUrl: "" }]);
    const router = useRouter()

    const addDocument = () => {

        setDocument((prev) => [...prev, { documentName: "", documentFile: "", documentUrl: "" }]);

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

            //imgRef.current[index].src = imageurl;
            documentlist[index]['documentFile'] = file
            documentlist[index]['documentUrl'] = imageurl
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
        let validation = { ...formValidation };
        let flag = true;


        const doctorName = tabsdata.name.trim();
        const number = tabsdata.number.trim();
        const email = tabsdata.email.trim();
        const specialization = tabsdata.specialization.trim();
        const qualification = tabsdata.qualification.trim();
        const experience = tabsdata.experience.trim();
        const shortDescription = tabsdata.description.trim();
        const city = tabsdata.city.trim();
        const country = tabsdata.country.trim();
        const zip = tabsdata.zip.trim();
        const address = tabsdata.address.trim();
        const accountName = tabsdata.accountName.trim();
        const accountType = tabsdata.accountType.trim();
        const gstNumber = tabsdata.gstNumber.trim();
        const accountNumber = tabsdata.accountNumber.trim();
        const ifsc = tabsdata.ifsc.trim();
        const bankName = tabsdata.bankName.trim();
        const branchName = tabsdata.branchName.trim();
        const branchAddress = tabsdata.branchAddress.trim();
        // const profileImage = e.target.image.files[0];

        if (accountName === "") {

            flag = false;
            validation['accountName'] = 0;
        }
        else {

            validation['accountName'] = 1;
        }

        if (accountType === "") {

            flag = false;
            validation['accountType'] = 0;
        }
        else {
            validation['accountType'] = 1;
        }


        if (gstNumber === "") {

            flag = false;
            validation['gstNumber'] = 0;

        }
        else {
            validation['gstNumber'] = 1;
        }

        if (accountNumber === "") {

            flag = false;
            validation['accountNumber'] = 0;
        }
        else {
            validation['accountNumber'] = 1;
        }


        if (ifsc === "") {
            flag = false;
            validation['ifsc'] = 0;
        }
        else {
            validation['ifsc'] = 1;
        }


        if (bankName === "") {

            flag = false;
            validation['bankName'] = 0;

        }
        else {
            validation['bankName'] = 1;
        }

        if (branchName === "") {

            flag = false;
            validation['branchName'] = 0;

        }
        else {
            validation['branchName'] = 1;
        }

        if (branchAddress === "") {
            flag = false;
            validation['branchAddress'] = 0;
        }
        else {
            validation['branchAddress'] = 1;
        }

        setFormvalidation(validation)


        if (flag) {

            try {

                const data = {

                    doctorName, specialization, qualification, email, number, shortDescription, address, location, experience, city, country, zip, branchAddress, branchName, bankName, ifsc, accountNumber, gstNumber, accountType, accountName, document
                }

                const formData = new FormData();
                formData.append('profileImage', imageUrl);
                for (let i = 0; i < document.length; i++) {
                    document[i]['documentUrl'] = "";
                    formData.append('documentImage', document[i].documentFile);
                }

                formData.append('data', JSON.stringify(data));

                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/doctors`, {
                    method: 'POST',
                    body: formData
                })

                const res = await response.json();

                if (res.status) {

                    sessionStorage.setItem('successMsg', 'Doctor Profile Created Successfully');
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
    }



    const handleFormData = (e) => {

        const { name, value } = e.target;
        let tabData = { ...tabsdata };
        if (name === 'image') {
            const imageurl = URL.createObjectURL(profileImg.current.files[0]);
            setImageurl(profileImg.current.files[0]);
            tabData[name] = imageurl;

        }
        else {
            tabData[name] = value;

        }
        setTabsData(tabData);


    }

    const manageTabforward = (tabName) => {

        if (tabName === 'first') {

            let validation = { ...formValidation };
            let flag = true;

            if (tabsdata.name === "") {

                validation['name'] = 0;
                flag = false;
            }
            else {
                validation['name'] = 1;
            }

            if (tabsdata.number === "") {
                validation['number'] = 0;
                flag = false;
            }
            else {
                validation['number'] = 1;
            }

            if (tabsdata.email === "") {
                validation['email'] = 0;
                flag = false;
            }
            else {
                validation['email'] = 1;
            }

            if (!tabsdata.image) {
                validation['image'] = 0;
                flag = false;
            }
            else {
                validation['image'] = 1;
            }

            if (tabsdata.specialization === "") {
                validation['specialization'] = 0;
                flag = false;
            }
            else {
                validation['specialization'] = 1;
            }

            if (tabsdata.qualification === "") {
                validation['qualification'] = 0;
                flag = false;
            }
            else {
                validation['qualification'] = 1;
            }

            setFormvalidation(validation)

            if (flag) {
                setErrormsg("")
                setTabs({ first: false, second: true, third: false, fourth: false });
            }
            else {
                setErrormsg("Please fill required fields!")
            }




        }
        else if (tabName === 'second') {

            let validation = { ...formValidation };
            let flag = true;
            if (tabsdata.city === "") {

                validation['city'] = 0;
                flag = false;
            }
            else {
                validation['city'] = 1;
            }

            if (tabsdata.country === "") {

                validation['country'] = 0;
                flag = false;
            }
            else {
                validation['country'] = 1;
            }
            if (tabsdata.zip === "") {
                validation['zip'] = 0;
                flag = false;
            }
            else {
                validation['zip'] = 1;
            }

            setFormvalidation(validation)


            if (flag) {
                setErrormsg("")
                setTabs({ first: false, second: false, third: true, fourth: false });
            }
            else {
                setErrormsg("Please fill required fields!")
            }

        }
        else if (tabName === 'third') {


            let validation = { ...formValidation };
            let flag = true;
            if (!document[0].documentFile) {
                validation['document'] = 0;
                flag = false;
            }
            else {
                validation['document'] = 1;
            }

            if (document[0].documentName === "" || document[0].documentName === "select") {
                flag = false;
                validation['document'] = 0;

            }
            else {
                validation['document'] = 1;
            }


            setFormvalidation(validation);
            if (flag) {

                setErrormsg("");
                setTabs({ first: false, second: false, third: false, fourth: true });
            }
            else {
                setErrormsg("Please upload atleast one document!");
            }

        }

    }

    const manageTabbackward = (tabName) => {

        if (tabName === 'second') {

            setTabs({ first: true, second: false, third: false, fourth: false });

        }
        else if (tabName === 'third') {
            setTabs({ first: false, second: true, third: false, fourth: false });
        }
        else if (tabName === 'fourth') {
            setTabs({ first: false, second: false, third: true, fourth: false });
        }

    }

    const validateSecond = () => {

        let validation = { ...formValidation };
        let flag = true;


        if (tabsdata.name === "") {

            validation['name'] = 0;
            flag = false;
        }
        else {
            validation['name'] = 1;
        }

        if (tabsdata.number === "") {
            validation['number'] = 0;
            flag = false;
        }
        else {
            validation['number'] = 1;
        }

        if (tabsdata.email === "") {
            validation['email'] = 0;
            flag = false;
        }
        else {
            validation['email'] = 1;
        }

        if (!tabsdata.image) {
            validation['image'] = 0;
            flag = false;
        }
        else {
            validation['image'] = 1;
        }

        if (tabsdata.specialization === "") {
            validation['specialization'] = 0;
            flag = false;
        }
        else {
            validation['specialization'] = 1;
        }

        if (tabsdata.qualification === "") {
            validation['qualification'] = 0;
            flag = false;
        }
        else {
            validation['qualification'] = 1;
        }

        if (tabsdata.city === "") {

            validation['city'] = 0;
            flag = false;
        }
        else {
            validation['city'] = 1;
        }

        if (tabsdata.country === "") {

            validation['country'] = 0;
            flag = false;
        }
        else {
            validation['country'] = 1;
        }
        if (tabsdata.zip === "") {
            validation['zip'] = 0;
            flag = false;
        }
        else {
            validation['zip'] = 1;
        }


        setFormvalidation(validation)

        if (flag) {
            setErrormsg("")
            setTabs({ first: false, second: false, third: true, fourth: false });
        }
        else {
            setErrormsg("Please fill required fields!")
        }


    }

    const validateThird = () => {

        let validation = { ...formValidation };
        let flag = true;


        if (tabsdata.name === "") {

            validation['name'] = 0;
            flag = false;
        }
        else {
            validation['name'] = 1;
        }

        if (tabsdata.number === "") {
            validation['number'] = 0;
            flag = false;
        }
        else {
            validation['number'] = 1;
        }

        if (tabsdata.email === "") {
            validation['email'] = 0;
            flag = false;
        }
        else {
            validation['email'] = 1;
        }

        if (!tabsdata.image) {
            validation['image'] = 0;
            flag = false;
        }
        else {
            validation['image'] = 1;
        }

        if (tabsdata.specialization === "") {
            validation['specialization'] = 0;
            flag = false;
        }
        else {
            validation['specialization'] = 1;
        }

        if (tabsdata.qualification === "") {
            validation['qualification'] = 0;
            flag = false;
        }
        else {
            validation['qualification'] = 1;
        }

        if (tabsdata.city === "") {

            validation['city'] = 0;
            flag = false;
        }
        else {
            validation['city'] = 1;
        }

        if (tabsdata.country === "") {

            validation['country'] = 0;
            flag = false;
        }
        else {
            validation['country'] = 1;
        }
        if (tabsdata.zip === "") {
            validation['zip'] = 0;
            flag = false;
        }
        else {
            validation['zip'] = 1;
        }

        if (!document[0].documentFile) {
            validation['document'] = 0;
            flag = false;
        }
        else {
            validation['document'] = 1;
        }

        if (document[0].documentName === "" || document[0].documentName === "select") {
            flag = false;
            validation['document'] = 0;

        }
        else {
            validation['document'] = 1;
        }


        setFormvalidation(validation)

        if (flag) {
            setErrormsg("")
            setTabs({ first: false, second: false, third: false, fourth: true });
        }
        else {
            setErrormsg("Please fill required fields!")
        }
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
                            <button
                                className={tabs.first ? "nav-link active" : "nav-link"}
                                onClick={() => setTabs({ first: true, second: false, third: false, fourth: false })}

                            >
                                <i className="fas fa-home" /> Basic Details
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={tabs.second ? "nav-link active" : "nav-link"}
                                onClick={() => manageTabforward("first")}


                            >
                                <i className="far fa-user" /> Contact Details
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={tabs.third ? "nav-link active" : "nav-link"}
                                onClick={validateSecond}


                            >
                                <i className="far fa-envelope" /> Document
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={tabs.fourth ? "nav-link active" : "nav-link"}
                                onClick={validateThird}


                            >
                                <i className="far fa-envelope" /> Bank Details
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={createDoctor}>
                        <div className="tab-content">
                            {tabs.first && <div
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
                                                value={tabsdata.name}
                                                onChange={(e) => handleFormData(e)}
                                                style={{ border: formValidation.name === 0 && '0.5px solid red' }}

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
                                                value={tabsdata.number}
                                                onChange={(e) => handleFormData(e)}
                                                style={{ border: formValidation.number === 0 && '0.5px solid red' }}
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
                                                value={tabsdata.email}
                                                onChange={(e) => handleFormData(e)}
                                                style={{ border: formValidation.email === 0 && '0.5px solid red' }}

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
                                                id="profile-img"
                                                name='image'
                                                accept='image/*'
                                                ref={profileImg}
                                                onChange={(e) => handleFormData(e)}
                                                style={{ border: formValidation.image === 0 && '0.5px solid red' }}

                                            />
                                        </div>
                                        <div className="mb-3">
                                            <Image id='imagePreview' width={tabsdata.image && 100} height={tabsdata.image && 100} ref={previewImg} alt='' src={tabsdata.image} />
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
                                                value={tabsdata.specialization}
                                                onChange={(e) => handleFormData(e)}
                                                style={{ border: formValidation.specialization === 0 && '0.5px solid red' }}

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
                                                value={tabsdata.qualification}
                                                onChange={(e) => handleFormData(e)}
                                                style={{ border: formValidation.qualification === 0 && '0.5px solid red' }}

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
                                                value={tabsdata.experience}
                                                onChange={(e) => handleFormData(e)}


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
                                                value={tabsdata.description}
                                                onChange={(e) => handleFormData(e)}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">

                                        <div className="hstack gap-2 justify-content-end">
                                            <div className='col-auto' style={{ color: 'red' }}>{errorMsg !== "" && errorMsg}</div>
                                            <button type="button" className="btn btn-primary" onClick={() => manageTabforward("first")}>
                                                Next
                                            </button>

                                        </div>
                                    </div>
                                    {/*end col*/}

                                    {/*end col*/}
                                </div>

                                {/*end row*/}
                                {/* </form> */}
                            </div>}
                            {/*end tab-pane*/}
                            {tabs.second && <div >
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
                                                style={{ border: formValidation.city === 0 && '0.5px solid red' }}
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.city}

                                            />
                                        </div>
                                    </div>

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
                                                style={{ border: formValidation.country === 0 && '0.5px solid red' }}
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.country}

                                            />
                                        </div>
                                    </div>

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
                                                style={{ border: formValidation.zip === 0 && '0.5px solid red' }}
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.zip}

                                            />
                                        </div>
                                    </div>

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
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.address}

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
                                    <div className="col-lg-12">

                                        <div className="hstack gap-2 justify-content-end">
                                            <div className='col-auto' style={{ color: 'red' }}>{errorMsg !== "" && errorMsg}</div>

                                            <button type="submit" className="btn btn-primary" onClick={() => manageTabbackward("second")}>
                                                Previous
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={() => manageTabforward("second")}>
                                                Next
                                            </button>
                                        </div>
                                    </div>

                                </div>

                                {/* </form> */}

                            </div>}
                            {/*end tab-pane*/}
                            {tabs.third && <div >
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
                                                <select name="documentName" id="" className="form-control" onChange={(e) => handleDocument(e, i)} required={item.documentFile !== "" ? true : false} value={item.documentName} style={{ border: formValidation.document === 0 && '0.5px solid red' }}>
                                                    <option value="select">Select</option>
                                                    <option value="Medical Degree">Medical Degree</option>
                                                    <option value="Identity Document">Identity Document</option>
                                                    <option value="License/Registration">License/Registration</option>
                                                </select>

                                            </div>

                                            <div className="col-lg-6 mb-3">
                                                <label className="form-label" htmlFor="longitude-input">Upload File {document.length === 1 ? "" : i + 1}</label>

                                                <input type="file" className="form-control" id={`project-document-img${i}`} placeholder="Choose File" onChange={(e) => handleDocument(e, i)} required={item.documentName !== "" ? true : false} name='documentFile' accept="image/*,application/pdf" ref={domRef} style={{ border: formValidation.document === 0 && '0.5px solid red' }} />

                                                <img priority width={item.documentUrl && 100} height={item.documentUrl && 100} id={`imagePreview${i}`} alt='' style={{ marginTop: '10px' }} ref={(el) => (imgRef.current[i] = el)} src={item.documentUrl} />
                                                <br />


                                            </div>
                                        </div>
                                    </div>)}
                                </div>

                                <div className="hstack gap-2 justify-content-end">

                                    <div className='col-auto' style={{ color: 'red' }}>{errorMsg !== "" && errorMsg}</div>
                                    <button type="submit" className="btn btn-primary" onClick={() => manageTabbackward("third")}>
                                        Previous
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={() => manageTabforward("third")}>
                                        Next
                                    </button>
                                </div>

                                {/* <div className='row'>


                                    <div className="col-lg-6" >
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

                                        <div className="mb-3">
                                            <img id='imagePreview2' width={100} height={100} />
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
                                </div>  */}


                                {/* </form> */}
                            </div>}
                            {/*end tab-pane*/}
                            {tabs.fourth && <div>
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
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.accountNumber}
                                                style={{ border: formValidation.accountNumber === 0 && '0.5px solid red' }}

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
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.ifsc}
                                                style={{ border: formValidation.ifsc === 0 && '0.5px solid red' }}

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
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.accountName}
                                                style={{ border: formValidation.accountName === 0 && '0.5px solid red' }}

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
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.accountType}
                                                style={{ border: formValidation.accountType === 0 && '0.5px solid red' }}

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
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.gstNumber}


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
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.bankName}
                                                style={{ border: formValidation.bankName === 0 && '0.5px solid red' }}

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
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.branchName}
                                                style={{ border: formValidation.branchName === 0 && '0.5px solid red' }}

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
                                                onChange={(e) => handleFormData(e)}
                                                value={tabsdata.branchAddress}
                                                style={{ border: formValidation.branchAddress === 0 && '0.5px solid red' }}

                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">

                                        <div className="hstack gap-2 justify-content-end">
                                            <div className='col-auto' style={{ color: 'red' }}>{errorMsg !== "" && errorMsg}</div>
                                            <button type="submit" className="btn btn-primary" onClick={() => manageTabbackward("fourth")}>
                                                Previous
                                            </button>
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
                            </div>}
                            {/*end tab-pane*/}
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}
