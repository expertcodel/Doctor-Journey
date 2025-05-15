"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { UniversalContext } from '@/component/context';
import axios from 'axios';
export default function Page() {

    // const { userData } = UniversalContext();
    // const userData={}
    // const [imageUrl, setImageurl] = useState("");
    // const [success, setSuccess] = useState(false);




    // const uploadImage = async (e) => {

    //     const file = e.target.files[0];
    //     const formdata = new FormData();
    //     formdata.append('file', file);


    //     const response = await fetch(`/api/profileImage`, { method: 'POST', body: formdata });
    //     const { message, url } = await response.json();



    //     if (message === "uploaded successfully") {
    //         setImageurl(url);
    //     }



    // }

    // const updateDetails = async (e) => {


    //     e.preventDefault();
    //     const name = e.target.name.value.trim();
    //     const email = e.target.email.value.trim();
    //     const mobile_number = e.target.number.value.trim();
    //     const usertype = e.target.usertype.value.trim();
    //     let profile_img="";
    //     if(imageUrl==="")
    //     {
    //         profile_img =userData?.profile_img
    //     }
    //     else{
    //         profile_img = imageUrl;
    //     }
       
    //     const userId = userData?.userId;
    //     const option = {

    //         method: 'POST',
    //         url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/updateUser`,
    //         data: {
    //             name, email, mobile_number, usertype, profile_img, userId
    //         }
    //     }


    //     const response = await axios.request(option);
    //     if (response.data.status) {
    //         setSuccess(true)

    //     }
    // }

    return (




        // <div className="main-content">
        //     <div className="page-content">
        //         <div className="container-fluid">
        //             <div className="position-relative mx-n4 mt-n4">
        //                 <div className="profile-wid-bg profile-setting-img">
        //                     <img src="/assets/images/profile-bg.jpg" className="profile-wid-img" alt="" />
        //                     <div className="overlay-content">
        //                         <div className="text-end p-3">
        //                             <div className="p-0 ms-auto rounded-circle profile-photo-edit">
        //                                 <input id="profile-foreground-img-file-input" type="file" className="profile-foreground-img-file-input" />
        //                                 <label htmlFor="profile-foreground-img-file-input" className="profile-photo-edit btn btn-light">
        //                                     <i className="ri-image-edit-line align-bottom me-1" /> Change Cover
        //                                 </label>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             <div className="row">
        //                 <div className="col-xxl-3">
        //                     <div className="card mt-n5">
        //                         <div className="card-body p-4">
        //                             <div className="text-center">
        //                                 <div className="profile-user position-relative d-inline-block mx-auto  mb-4">

        //                                     <img src={imageUrl !== "" ? imageUrl : userData?.profile_img} alt="user-profile-image" style={{ width: '10%', height: '10%' }} />

        //                                     <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
        //                                         <input id="profile-img-file-input" type="file" className="profile-img-file-input" onChange={uploadImage}
        //                                         />
        //                                         <label htmlFor="profile-img-file-input" className="profile-photo-edit avatar-xs">
        //                                             <span className="avatar-title rounded-circle bg-light text-body material-shadow">
        //                                                 <i className="ri-camera-fill" />
        //                                             </span>
        //                                         </label>
        //                                     </div>
        //                                 </div>
        //                                 <h5 className="fs-16 mb-1">{userData?.name?.toUpperCase()}</h5>
        //                                 <p className="text-muted mb-0">{userData?.usertype?.toUpperCase()}</p>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     {/*end card*/}
        //                     <div className="card">
        //                         <div className="card-body">
        //                             <div className="d-flex align-items-center mb-5">
        //                                 <div className="flex-grow-1">
        //                                     <h5 className="card-title mb-0">Complete Your Profile</h5>
        //                                 </div>
        //                                 <div className="flex-shrink-0">
        //                                     <a href="javascript:void(0);" className="badge bg-light text-primary fs-12"><i className="ri-edit-box-line align-bottom me-1" /> Edit</a>
        //                                 </div>
        //                             </div>
        //                             <div className="progress animated-progress custom-progress progress-label">
        //                                 <div className="progress-bar bg-danger" role="progressbar" style={{ width: '30%' }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}>
        //                                     <div className="label">30%</div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
        //                     <div className="card">
        //                         <div className="card-body">
        //                             <div className="d-flex align-items-center mb-4">
        //                                 <div className="flex-grow-1">
        //                                     <h5 className="card-title mb-0">Portfolio</h5>
        //                                 </div>
        //                                 <div className="flex-shrink-0">
        //                                     <a href="javascript:void(0);" className="badge bg-light text-primary fs-12"><i className="ri-add-fill align-bottom me-1" /> Add</a>
        //                                 </div>
        //                             </div>
        //                             <div className="mb-3 d-flex">
        //                                 <div className="avatar-xs d-block flex-shrink-0 me-3">
        //                                     <span className="avatar-title rounded-circle fs-16 bg-body text-body material-shadow">
        //                                         <i className="ri-github-fill" />
        //                                     </span>
        //                                 </div>
        //                                 <input type="email" className="form-control" id="gitUsername" placeholder="Username" defaultValue="@daveadame" />
        //                             </div>
        //                             <div className="mb-3 d-flex">
        //                                 <div className="avatar-xs d-block flex-shrink-0 me-3">
        //                                     <span className="avatar-title rounded-circle fs-16 bg-primary material-shadow">
        //                                         <i className="ri-global-fill" />
        //                                     </span>
        //                                 </div>
        //                                 <input type="text" className="form-control" id="websiteInput" placeholder="www.example.com" defaultValue="www.velzon.com" />
        //                             </div>
        //                             <div className="mb-3 d-flex">
        //                                 <div className="avatar-xs d-block flex-shrink-0 me-3">
        //                                     <span className="avatar-title rounded-circle fs-16 bg-success material-shadow">
        //                                         <i className="ri-dribbble-fill" />
        //                                     </span>
        //                                 </div>
        //                                 <input type="text" className="form-control" id="dribbleName" placeholder="Username" defaultValue="@dave_adame" />
        //                             </div>
        //                             <div className="d-flex">
        //                                 <div className="avatar-xs d-block flex-shrink-0 me-3">
        //                                     <span className="avatar-title rounded-circle fs-16 bg-danger material-shadow">
        //                                         <i className="ri-pinterest-fill" />
        //                                     </span>
        //                                 </div>
        //                                 <input type="text" className="form-control" id="pinterestName" placeholder="Username" defaultValue="Advance Dave" />
        //                             </div>
        //                         </div>
        //                     </div>
        //                     {/*end card*/}
        //                 </div>
        //                 {/*end col*/}
        //                 <div className="col-xxl-9">
        //                     <div className="card mt-xxl-n5">
        //                         <div className="card-header">
        //                             <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
        //                                 <li className="nav-item" role="presentation">
        //                                     <a className="nav-link active" data-bs-toggle="tab" href="#personalDetails" role="tab" aria-selected="true">
        //                                         <i className="fas fa-home" /> Personal Details
        //                                     </a>
        //                                 </li>
        //                                 <li className="nav-item" role="presentation">
        //                                     <a className="nav-link" data-bs-toggle="tab" href="#changePassword" role="tab" aria-selected="false" tabIndex={-1}>
        //                                         <i className="far fa-user" /> Change Password
        //                                     </a>
        //                                 </li>
        //                                 <li className="nav-item" role="presentation">
        //                                     <a className="nav-link" data-bs-toggle="tab" href="#experience" role="tab" aria-selected="false" tabIndex={-1}>
        //                                         <i className="far fa-envelope" /> Experience
        //                                     </a>
        //                                 </li>
        //                                 <li className="nav-item" role="presentation">
        //                                     <a className="nav-link" data-bs-toggle="tab" href="#privacy" role="tab" aria-selected="false" tabIndex={-1}>
        //                                         <i className="far fa-envelope" /> Privacy Policy
        //                                     </a>
        //                                 </li>
        //                             </ul>
        //                         </div>
        //                         <div className="card-body p-4">
        //                             <div className="tab-content">
        //                                 <div className="tab-pane active" id="personalDetails" role="tabpanel">
        //                                     <form onSubmit={updateDetails}>
        //                                         <div className="row">
        //                                             <div className="col-lg-6">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="firstnameInput" className="form-label">Name</label>
        //                                                     <input type="text" className="form-control" id="firstnameInput" placeholder="Enter your firstname" defaultValue={userData?.name} name='name' />
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                             {/* <div className="col-lg-6">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="lastnameInput" className="form-label">Last Name</label>
        //                                                     <input type="text" className="form-control" id="lastnameInput" placeholder="Enter your lastname" defaultValue="Adame" />
        //                                                 </div>
        //                                             </div> */}
        //                                             {/*end col*/}
        //                                             <div className="col-lg-6">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="phonenumberInput" className="form-label">Phone Number</label>
        //                                                     <input type="text" className="form-control" id="phonenumberInput" placeholder="Enter your phone number" name='number' defaultValue={userData?.mobile_number} />
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                             <div className="col-lg-6">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="emailInput" className="form-label">Email Address</label>
        //                                                     <input type="email" className="form-control" id="emailInput" placeholder="Enter your email" defaultValue={userData?.email} name='email' />
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                             <div className="col-lg-6">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="usertypeInput" className="form-label">Usertype</label>
        //                                                     <input type="text" className="form-control" id="usertypeInput" placeholder="Enter usertype" defaultValue={userData?.usertype} name='usertype' />
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                             {/* <div className="col-lg-12">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="skillsInput" className="form-label">Skills</label>
        //                                                     <div className="choices" data-type="select-multiple" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"><div className="choices__inner"><select className="form-control choices__input" name="skillsInput" data-choices data-choices-text-unique-true multiple id="skillsInput" hidden tabIndex={-1} data-choice="active">
        //                                                         <option value="illustrator">Illustrator</option>
        //                                                         <option value="photoshop">Photoshop</option>
        //                                                         <option value="css">CSS</option>
        //                                                         <option value="html">HTML</option>
        //                                                         <option value="javascript" selected>Javascript</option>
        //                                                         <option value="python">Python</option>
        //                                                         <option value="php">PHP</option>
        //                                                     </select><div className="choices__list choices__list--multiple" role="listbox"><div className="choices__item choices__item--selectable" data-item data-id={5} data-value="javascript" aria-selected="true" role="option">Javascript</div></div><input type="search" className="choices__input choices__input--cloned" autoComplete="off" autoCapitalize="off" spellCheck="false" role="textbox" aria-autocomplete="list" aria-label="Skills" style={{ minWidth: '1ch', width: '1ch' }} /></div><div className="choices__list choices__list--dropdown" aria-expanded="false"><div className="choices__list" aria-multiselectable="true" role="listbox"><div id="choices--skillsInput-item-choice-3" className="choices__item choices__item--choice choices__item--selectable is-highlighted" role="option" data-choice data-id={3} data-value="css" data-select-text="Press to select" data-choice-selectable aria-selected="true">CSS</div><div id="choices--skillsInput-item-choice-4" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={4} data-value="html" data-select-text="Press to select" data-choice-selectable>HTML</div><div id="choices--skillsInput-item-choice-1" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={1} data-value="illustrator" data-select-text="Press to select" data-choice-selectable>Illustrator</div><div id="choices--skillsInput-item-choice-2" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={2} data-value="photoshop" data-select-text="Press to select" data-choice-selectable>Photoshop</div><div id="choices--skillsInput-item-choice-7" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={7} data-value="php" data-select-text="Press to select" data-choice-selectable>PHP</div><div id="choices--skillsInput-item-choice-6" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={6} data-value="python" data-select-text="Press to select" data-choice-selectable>Python</div></div></div></div>
        //                                                 </div>
        //                                             </div> */}
        //                                             {/*end col*/}
        //                                             {/* <div className="col-lg-6">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="designationInput" className="form-label">Designation</label>
        //                                                     <input type="text" className="form-control" id="designationInput" placeholder="Designation" defaultValue="Lead Designer / Developer" />
        //                                                 </div>
        //                                             </div> */}
        //                                             {/*end col*/}
        //                                             {/* <div className="col-lg-6">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="websiteInput1" className="form-label">Website</label>
        //                                                     <input type="text" className="form-control" id="websiteInput1" placeholder="www.example.com" defaultValue="www.velzon.com" />
        //                                                 </div>
        //                                             </div> */}
        //                                             {/*end col*/}
        //                                             {/* <div className="col-lg-4">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="cityInput" className="form-label">City</label>
        //                                                     <input type="text" className="form-control" id="cityInput" placeholder="City" defaultValue="California" />
        //                                                 </div>
        //                                             </div> */}
        //                                             {/*end col*/}
        //                                             {/* <div className="col-lg-4">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="countryInput" className="form-label">Country</label>
        //                                                     <input type="text" className="form-control" id="countryInput" placeholder="Country" defaultValue="United States" />
        //                                                 </div>
        //                                             </div> */}
        //                                             {/*end col*/}
        //                                             {/* <div className="col-lg-4">
        //                                                 <div className="mb-3">
        //                                                     <label htmlFor="zipcodeInput" className="form-label">Zip Code</label>
        //                                                     <input type="text" className="form-control" minLength={5} maxLength={6} id="zipcodeInput" placeholder="Enter zipcode" defaultValue={90011} />
        //                                                 </div>
        //                                             </div> */}
        //                                             {/*end col*/}
        //                                             <div className="col-lg-12">
        //                                                 <div className="mb-3 pb-2">
        //                                                     <label htmlFor="exampleFormControlTextarea" className="form-label">Description</label>
        //                                                     <textarea className="form-control" id="exampleFormControlTextarea" placeholder="Enter your description" rows={3} defaultValue={"Hi I'm Anna Adame,It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is European languages are members of the same family."} />
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                             <div className="col-lg-12">
        //                                                 <div className="hstack gap-2 justify-content-end">
        //                                                     <button type="submit" className="btn btn-primary"
        //                                                     >Updates</button>
        //                                                     <button type="button" className="btn btn-soft-success">Cancel</button>
        //                                                 </div>
                                                       
        //                                             </div>
        //                                             {/*end col*/}
        //                                         </div>
        //                                         {/*end row*/}
        //                                     </form>
        //                                 </div>
        //                                 {/*end tab-pane*/}
        //                                 <div className="tab-pane" id="changePassword" role="tabpanel">
        //                                     <form action="javascript:void(0);">
        //                                         <div className="row g-2">
        //                                             <div className="col-lg-4">
        //                                                 <div>
        //                                                     <label htmlFor="oldpasswordInput" className="form-label">Old Password*</label>
        //                                                     <input type="password" className="form-control" id="oldpasswordInput" placeholder="Enter current password" />
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                             <div className="col-lg-4">
        //                                                 <div>
        //                                                     <label htmlFor="newpasswordInput" className="form-label">New Password*</label>
        //                                                     <input type="password" className="form-control" id="newpasswordInput" placeholder="Enter new password" />
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                             <div className="col-lg-4">
        //                                                 <div>
        //                                                     <label htmlFor="confirmpasswordInput" className="form-label">Confirm Password*</label>
        //                                                     <input type="password" className="form-control" id="confirmpasswordInput" placeholder="Confirm password" />
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                             <div className="col-lg-12">
        //                                                 <div className="mb-3">
        //                                                     <a href="javascript:void(0);" className="link-primary text-decoration-underline">Forgot Password ?</a>
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                             <div className="col-lg-12">
        //                                                 <div className="text-end">
        //                                                     <button type="submit" className="btn btn-success">Change Password</button>
        //                                                 </div>
        //                                             </div>
        //                                             {/*end col*/}
        //                                         </div>
        //                                         {/*end row*/}
        //                                     </form>
        //                                     <div className="mt-4 mb-3 border-bottom pb-2">
        //                                         <div className="float-end">
        //                                             <a href="javascript:void(0);" className="link-primary">All Logout</a>
        //                                         </div>
        //                                         <h5 className="card-title">Login History</h5>
        //                                     </div>
        //                                     <div className="d-flex align-items-center mb-3">
        //                                         <div className="flex-shrink-0 avatar-sm">
        //                                             <div className="avatar-title bg-light text-primary rounded-3 fs-18 material-shadow">
        //                                                 <i className="ri-smartphone-line" />
        //                                             </div>
        //                                         </div>
        //                                         <div className="flex-grow-1 ms-3">
        //                                             <h6>iPhone 12 Pro</h6>
        //                                             <p className="text-muted mb-0">Los Angeles, United States - March 16 at 2:47PM</p>
        //                                         </div>
        //                                         <div>
        //                                             <a href="javascript:void(0);">Logout</a>
        //                                         </div>
        //                                     </div>
        //                                     <div className="d-flex align-items-center mb-3">
        //                                         <div className="flex-shrink-0 avatar-sm">
        //                                             <div className="avatar-title bg-light text-primary rounded-3 fs-18 material-shadow">
        //                                                 <i className="ri-tablet-line" />
        //                                             </div>
        //                                         </div>
        //                                         <div className="flex-grow-1 ms-3">
        //                                             <h6>Apple iPad Pro</h6>
        //                                             <p className="text-muted mb-0">Washington, United States - November 06 at 10:43AM</p>
        //                                         </div>
        //                                         <div>
        //                                             <a href="javascript:void(0);">Logout</a>
        //                                         </div>
        //                                     </div>
        //                                     <div className="d-flex align-items-center mb-3">
        //                                         <div className="flex-shrink-0 avatar-sm">
        //                                             <div className="avatar-title bg-light text-primary rounded-3 fs-18 material-shadow">
        //                                                 <i className="ri-smartphone-line" />
        //                                             </div>
        //                                         </div>
        //                                         <div className="flex-grow-1 ms-3">
        //                                             <h6>Galaxy S21 Ultra 5G</h6>
        //                                             <p className="text-muted mb-0">Conneticut, United States - June 12 at 3:24PM</p>
        //                                         </div>
        //                                         <div>
        //                                             <a href="javascript:void(0);">Logout</a>
        //                                         </div>
        //                                     </div>
        //                                     <div className="d-flex align-items-center">
        //                                         <div className="flex-shrink-0 avatar-sm">
        //                                             <div className="avatar-title bg-light text-primary rounded-3 fs-18 material-shadow">
        //                                                 <i className="ri-macbook-line" />
        //                                             </div>
        //                                         </div>
        //                                         <div className="flex-grow-1 ms-3">
        //                                             <h6>Dell Inspiron 14</h6>
        //                                             <p className="text-muted mb-0">Phoenix, United States - July 26 at 8:10AM</p>
        //                                         </div>
        //                                         <div>
        //                                             <a href="javascript:void(0);">Logout</a>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 {/*end tab-pane*/}
        //                                 <div className="tab-pane" id="experience" role="tabpanel">
        //                                     <form>
        //                                         <div id="newlink">
        //                                             <div id={1}>
        //                                                 <div className="row">
        //                                                     <div className="col-lg-12">
        //                                                         <div className="mb-3">
        //                                                             <label htmlFor="jobTitle" className="form-label">Job Title</label>
        //                                                             <input type="text" className="form-control" id="jobTitle" placeholder="Job title" defaultValue="Lead Designer / Developer" />
        //                                                         </div>
        //                                                     </div>
        //                                                     {/*end col*/}
        //                                                     <div className="col-lg-6">
        //                                                         <div className="mb-3">
        //                                                             <label htmlFor="companyName" className="form-label">Company Name</label>
        //                                                             <input type="text" className="form-control" id="companyName" placeholder="Company name" defaultValue="Themesbrand" />
        //                                                         </div>
        //                                                     </div>
        //                                                     {/*end col*/}
        //                                                     <div className="col-lg-6">
        //                                                         <div className="mb-3">
        //                                                             <label htmlFor="experienceYear" className="form-label">Experience Years</label>
        //                                                             <div className="row">
        //                                                                 <div className="col-lg-5">
        //                                                                     <div className="choices" data-type="select-one" tabIndex={0} role="listbox" aria-label="Experience Years" aria-haspopup="true" aria-expanded="false"><div className="choices__inner"><select className="form-control choices__input" data-choices data-choices-search-false name="experienceYear" id="experienceYear" hidden tabIndex={-1} data-choice="active">
        //                                                                         <option value>Select years</option>
        //                                                                         <option value="Choice 1">2001</option>
        //                                                                         <option value="Choice 2">2002</option>
        //                                                                         <option value="Choice 3">2003</option>
        //                                                                         <option value="Choice 4">2004</option>
        //                                                                         <option value="Choice 5">2005</option>
        //                                                                         <option value="Choice 6">2006</option>
        //                                                                         <option value="Choice 7">2007</option>
        //                                                                         <option value="Choice 8">2008</option>
        //                                                                         <option value="Choice 9">2009</option>
        //                                                                         <option value="Choice 10">2010</option>
        //                                                                         <option value="Choice 11">2011</option>
        //                                                                         <option value="Choice 12">2012</option>
        //                                                                         <option value="Choice 13">2013</option>
        //                                                                         <option value="Choice 14">2014</option>
        //                                                                         <option value="Choice 15">2015</option>
        //                                                                         <option value="Choice 16">2016</option>
        //                                                                         <option value="Choice 17" selected>2017</option>
        //                                                                         <option value="Choice 18">2018</option>
        //                                                                         <option value="Choice 19">2019</option>
        //                                                                         <option value="Choice 20">2020</option>
        //                                                                         <option value="Choice 21">2021</option>
        //                                                                         <option value="Choice 22">2022</option>
        //                                                                     </select><div className="choices__list choices__list--single"><div className="choices__item choices__item--selectable" data-item data-id={18} data-value="Choice 17" aria-selected="true" role="option">2017</div></div></div><div className="choices__list choices__list--dropdown" aria-expanded="false"><div className="choices__list" role="listbox"><div id="choices--experienceYear-item-choice-1" className="choices__item choices__item--choice choices__placeholder choices__item--selectable is-highlighted" role="option" data-choice data-id={1} data-value data-select-text="Press to select" data-choice-selectable aria-selected="true">Select years</div><div id="choices--experienceYear-item-choice-2" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={2} data-value="Choice 1" data-select-text="Press to select" data-choice-selectable>2001</div><div id="choices--experienceYear-item-choice-3" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={3} data-value="Choice 2" data-select-text="Press to select" data-choice-selectable>2002</div><div id="choices--experienceYear-item-choice-4" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={4} data-value="Choice 3" data-select-text="Press to select" data-choice-selectable>2003</div><div id="choices--experienceYear-item-choice-5" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={5} data-value="Choice 4" data-select-text="Press to select" data-choice-selectable>2004</div><div id="choices--experienceYear-item-choice-6" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={6} data-value="Choice 5" data-select-text="Press to select" data-choice-selectable>2005</div><div id="choices--experienceYear-item-choice-7" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={7} data-value="Choice 6" data-select-text="Press to select" data-choice-selectable>2006</div><div id="choices--experienceYear-item-choice-8" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={8} data-value="Choice 7" data-select-text="Press to select" data-choice-selectable>2007</div><div id="choices--experienceYear-item-choice-9" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={9} data-value="Choice 8" data-select-text="Press to select" data-choice-selectable>2008</div><div id="choices--experienceYear-item-choice-10" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={10} data-value="Choice 9" data-select-text="Press to select" data-choice-selectable>2009</div><div id="choices--experienceYear-item-choice-11" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={11} data-value="Choice 10" data-select-text="Press to select" data-choice-selectable>2010</div><div id="choices--experienceYear-item-choice-12" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={12} data-value="Choice 11" data-select-text="Press to select" data-choice-selectable>2011</div><div id="choices--experienceYear-item-choice-13" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={13} data-value="Choice 12" data-select-text="Press to select" data-choice-selectable>2012</div><div id="choices--experienceYear-item-choice-14" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={14} data-value="Choice 13" data-select-text="Press to select" data-choice-selectable>2013</div><div id="choices--experienceYear-item-choice-15" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={15} data-value="Choice 14" data-select-text="Press to select" data-choice-selectable>2014</div><div id="choices--experienceYear-item-choice-16" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={16} data-value="Choice 15" data-select-text="Press to select" data-choice-selectable>2015</div><div id="choices--experienceYear-item-choice-17" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={17} data-value="Choice 16" data-select-text="Press to select" data-choice-selectable>2016</div><div id="choices--experienceYear-item-choice-18" className="choices__item choices__item--choice is-selected choices__item--selectable" role="option" data-choice data-id={18} data-value="Choice 17" data-select-text="Press to select" data-choice-selectable>2017</div><div id="choices--experienceYear-item-choice-19" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={19} data-value="Choice 18" data-select-text="Press to select" data-choice-selectable>2018</div><div id="choices--experienceYear-item-choice-20" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={20} data-value="Choice 19" data-select-text="Press to select" data-choice-selectable>2019</div><div id="choices--experienceYear-item-choice-21" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={21} data-value="Choice 20" data-select-text="Press to select" data-choice-selectable>2020</div><div id="choices--experienceYear-item-choice-22" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={22} data-value="Choice 21" data-select-text="Press to select" data-choice-selectable>2021</div><div id="choices--experienceYear-item-choice-23" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={23} data-value="Choice 22" data-select-text="Press to select" data-choice-selectable>2022</div></div></div></div>
        //                                                                 </div>
        //                                                                 {/*end col*/}
        //                                                                 <div className="col-auto align-self-center">
        //                                                                     to
        //                                                                 </div>
        //                                                                 {/*end col*/}
        //                                                                 <div className="col-lg-5">
        //                                                                     <div className="choices" data-type="select-one" tabIndex={0} role="listbox" aria-haspopup="true" aria-expanded="false"><div className="choices__inner"><select className="form-control choices__input" data-choices data-choices-search-false name="choices-single-default2" hidden tabIndex={-1} data-choice="active">
        //                                                                         <option value>Select years</option>
        //                                                                         <option value="Choice 1">2001</option>
        //                                                                         <option value="Choice 2">2002</option>
        //                                                                         <option value="Choice 3">2003</option>
        //                                                                         <option value="Choice 4">2004</option>
        //                                                                         <option value="Choice 5">2005</option>
        //                                                                         <option value="Choice 6">2006</option>
        //                                                                         <option value="Choice 7">2007</option>
        //                                                                         <option value="Choice 8">2008</option>
        //                                                                         <option value="Choice 9">2009</option>
        //                                                                         <option value="Choice 10">2010</option>
        //                                                                         <option value="Choice 11">2011</option>
        //                                                                         <option value="Choice 12">2012</option>
        //                                                                         <option value="Choice 13">2013</option>
        //                                                                         <option value="Choice 14">2014</option>
        //                                                                         <option value="Choice 15">2015</option>
        //                                                                         <option value="Choice 16">2016</option>
        //                                                                         <option value="Choice 17">2017</option>
        //                                                                         <option value="Choice 18">2018</option>
        //                                                                         <option value="Choice 19">2019</option>
        //                                                                         <option value="Choice 20" selected>2020</option>
        //                                                                         <option value="Choice 21">2021</option>
        //                                                                         <option value="Choice 22">2022</option>
        //                                                                     </select><div className="choices__list choices__list--single"><div className="choices__item choices__item--selectable" data-item data-id={21} data-value="Choice 20" aria-selected="true" role="option">2020</div></div></div><div className="choices__list choices__list--dropdown" aria-expanded="false"><div className="choices__list" role="listbox"><div id="choices--choices-single-default2-8o-item-choice-1" className="choices__item choices__item--choice choices__placeholder choices__item--selectable is-highlighted" role="option" data-choice data-id={1} data-value data-select-text="Press to select" data-choice-selectable aria-selected="true">Select years</div><div id="choices--choices-single-default2-8o-item-choice-2" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={2} data-value="Choice 1" data-select-text="Press to select" data-choice-selectable>2001</div><div id="choices--choices-single-default2-8o-item-choice-3" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={3} data-value="Choice 2" data-select-text="Press to select" data-choice-selectable>2002</div><div id="choices--choices-single-default2-8o-item-choice-4" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={4} data-value="Choice 3" data-select-text="Press to select" data-choice-selectable>2003</div><div id="choices--choices-single-default2-8o-item-choice-5" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={5} data-value="Choice 4" data-select-text="Press to select" data-choice-selectable>2004</div><div id="choices--choices-single-default2-8o-item-choice-6" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={6} data-value="Choice 5" data-select-text="Press to select" data-choice-selectable>2005</div><div id="choices--choices-single-default2-8o-item-choice-7" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={7} data-value="Choice 6" data-select-text="Press to select" data-choice-selectable>2006</div><div id="choices--choices-single-default2-8o-item-choice-8" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={8} data-value="Choice 7" data-select-text="Press to select" data-choice-selectable>2007</div><div id="choices--choices-single-default2-8o-item-choice-9" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={9} data-value="Choice 8" data-select-text="Press to select" data-choice-selectable>2008</div><div id="choices--choices-single-default2-8o-item-choice-10" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={10} data-value="Choice 9" data-select-text="Press to select" data-choice-selectable>2009</div><div id="choices--choices-single-default2-8o-item-choice-11" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={11} data-value="Choice 10" data-select-text="Press to select" data-choice-selectable>2010</div><div id="choices--choices-single-default2-8o-item-choice-12" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={12} data-value="Choice 11" data-select-text="Press to select" data-choice-selectable>2011</div><div id="choices--choices-single-default2-8o-item-choice-13" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={13} data-value="Choice 12" data-select-text="Press to select" data-choice-selectable>2012</div><div id="choices--choices-single-default2-8o-item-choice-14" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={14} data-value="Choice 13" data-select-text="Press to select" data-choice-selectable>2013</div><div id="choices--choices-single-default2-8o-item-choice-15" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={15} data-value="Choice 14" data-select-text="Press to select" data-choice-selectable>2014</div><div id="choices--choices-single-default2-8o-item-choice-16" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={16} data-value="Choice 15" data-select-text="Press to select" data-choice-selectable>2015</div><div id="choices--choices-single-default2-8o-item-choice-17" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={17} data-value="Choice 16" data-select-text="Press to select" data-choice-selectable>2016</div><div id="choices--choices-single-default2-8o-item-choice-18" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={18} data-value="Choice 17" data-select-text="Press to select" data-choice-selectable>2017</div><div id="choices--choices-single-default2-8o-item-choice-19" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={19} data-value="Choice 18" data-select-text="Press to select" data-choice-selectable>2018</div><div id="choices--choices-single-default2-8o-item-choice-20" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={20} data-value="Choice 19" data-select-text="Press to select" data-choice-selectable>2019</div><div id="choices--choices-single-default2-8o-item-choice-21" className="choices__item choices__item--choice is-selected choices__item--selectable" role="option" data-choice data-id={21} data-value="Choice 20" data-select-text="Press to select" data-choice-selectable>2020</div><div id="choices--choices-single-default2-8o-item-choice-22" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={22} data-value="Choice 21" data-select-text="Press to select" data-choice-selectable>2021</div><div id="choices--choices-single-default2-8o-item-choice-23" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={23} data-value="Choice 22" data-select-text="Press to select" data-choice-selectable>2022</div></div></div></div>
        //                                                                 </div>
        //                                                                 {/*end col*/}
        //                                                             </div>
        //                                                             {/*end row*/}
        //                                                         </div>
        //                                                     </div>
        //                                                     {/*end col*/}
        //                                                     <div className="col-lg-12">
        //                                                         <div className="mb-3">
        //                                                             <label htmlFor="jobDescription" className="form-label">Job Description</label>
        //                                                             <textarea className="form-control" id="jobDescription" rows={3} placeholder="Enter description" defaultValue={"You always want to make sure that your fonts work well together and try to limit the number of fonts you use to three or less. Experiment and play around with the fonts that you already have in the software you're working with reputable font websites. "} />
        //                                                         </div>
        //                                                     </div>
        //                                                     {/*end col*/}
        //                                                     <div className="hstack gap-2 justify-content-end">
        //                                                         <a className="btn btn-success" href="javascript:deleteEl(1)">Delete</a>
        //                                                     </div>
        //                                                 </div>
        //                                                 {/*end row*/}
        //                                             </div>
        //                                         </div>
        //                                         <div id="newForm" style={{ display: 'none' }}>
        //                                         </div>
        //                                         <div className="col-lg-12">
        //                                             <div className="hstack gap-2">
        //                                                 <button type="submit" className="btn btn-success">Update</button>
        //                                                 <a href="javascript:new_link()" className="btn btn-primary">Add New</a>
        //                                             </div>
        //                                         </div>
        //                                         {/*end col*/}
        //                                     </form>
        //                                 </div>
        //                                 {/*end tab-pane*/}
        //                                 <div className="tab-pane" id="privacy" role="tabpanel">
        //                                     <div className="mb-4 pb-2">
        //                                         <h5 className="card-title text-decoration-underline mb-3">Security:</h5>
        //                                         <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0">
        //                                             <div className="flex-grow-1">
        //                                                 <h6 className="fs-14 mb-1">Two-factor Authentication</h6>
        //                                                 <p className="text-muted">Two-factor authentication is an enhanced security meansur. Once enabled, you'll be required to give two types of identification when you log into Google Authentication and SMS are Supported.</p>
        //                                             </div>
        //                                             <div className="flex-shrink-0 ms-sm-3">
        //                                                 <a href="javascript:void(0);" className="btn btn-sm btn-primary">Enable Two-facor Authentication</a>
        //                                             </div>
        //                                         </div>
        //                                         <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
        //                                             <div className="flex-grow-1">
        //                                                 <h6 className="fs-14 mb-1">Secondary Verification</h6>
        //                                                 <p className="text-muted">The first factor is a password and the second commonly includes a text with a code sent to your smartphone, or biometrics using your fingerprint, face, or retina.</p>
        //                                             </div>
        //                                             <div className="flex-shrink-0 ms-sm-3">
        //                                                 <a href="javascript:void(0);" className="btn btn-sm btn-primary">Set up secondary method</a>
        //                                             </div>
        //                                         </div>
        //                                         <div className="d-flex flex-column flex-sm-row mb-4 mb-sm-0 mt-2">
        //                                             <div className="flex-grow-1">
        //                                                 <h6 className="fs-14 mb-1">Backup Codes</h6>
        //                                                 <p className="text-muted mb-sm-0">A backup code is automatically generated for you when you turn on two-factor authentication through your iOS or Android Twitter app. You can also generate a backup code on twitter.com.</p>
        //                                             </div>
        //                                             <div className="flex-shrink-0 ms-sm-3">
        //                                                 <a href="javascript:void(0);" className="btn btn-sm btn-primary">Generate backup codes</a>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div className="mb-3">
        //                                         <h5 className="card-title text-decoration-underline mb-3">Application Notifications:</h5>
        //                                         <ul className="list-unstyled mb-0">
        //                                             <li className="d-flex">
        //                                                 <div className="flex-grow-1">
        //                                                     <label htmlFor="directMessage" className="form-check-label fs-14">Direct messages</label>
        //                                                     <p className="text-muted">Messages from people you follow</p>
        //                                                 </div>
        //                                                 <div className="flex-shrink-0">
        //                                                     <div className="form-check form-switch">
        //                                                         <input className="form-check-input" type="checkbox" role="switch" id="directMessage" defaultChecked />
        //                                                     </div>
        //                                                 </div>
        //                                             </li>
        //                                             <li className="d-flex mt-2">
        //                                                 <div className="flex-grow-1">
        //                                                     <label className="form-check-label fs-14" htmlFor="desktopNotification">
        //                                                         Show desktop notifications
        //                                                     </label>
        //                                                     <p className="text-muted">Choose the option you want as your default setting. Block a site: Next to "Not allowed to send notifications," click Add.</p>
        //                                                 </div>
        //                                                 <div className="flex-shrink-0">
        //                                                     <div className="form-check form-switch">
        //                                                         <input className="form-check-input" type="checkbox" role="switch" id="desktopNotification" defaultChecked />
        //                                                     </div>
        //                                                 </div>
        //                                             </li>
        //                                             <li className="d-flex mt-2">
        //                                                 <div className="flex-grow-1">
        //                                                     <label className="form-check-label fs-14" htmlFor="emailNotification">
        //                                                         Show email notifications
        //                                                     </label>
        //                                                     <p className="text-muted"> Under Settings, choose Notifications. Under Select an account, choose the account to enable notifications for. </p>
        //                                                 </div>
        //                                                 <div className="flex-shrink-0">
        //                                                     <div className="form-check form-switch">
        //                                                         <input className="form-check-input" type="checkbox" role="switch" id="emailNotification" />
        //                                                     </div>
        //                                                 </div>
        //                                             </li>
        //                                             <li className="d-flex mt-2">
        //                                                 <div className="flex-grow-1">
        //                                                     <label className="form-check-label fs-14" htmlFor="chatNotification">
        //                                                         Show chat notifications
        //                                                     </label>
        //                                                     <p className="text-muted">To prevent duplicate mobile notifications from the Gmail and Chat apps, in settings, turn off Chat notifications.</p>
        //                                                 </div>
        //                                                 <div className="flex-shrink-0">
        //                                                     <div className="form-check form-switch">
        //                                                         <input className="form-check-input" type="checkbox" role="switch" id="chatNotification" />
        //                                                     </div>
        //                                                 </div>
        //                                             </li>
        //                                             <li className="d-flex mt-2">
        //                                                 <div className="flex-grow-1">
        //                                                     <label className="form-check-label fs-14" htmlFor="purchaesNotification">
        //                                                         Show purchase notifications
        //                                                     </label>
        //                                                     <p className="text-muted">Get real-time purchase alerts to protect yourself from fraudulent charges.</p>
        //                                                 </div>
        //                                                 <div className="flex-shrink-0">
        //                                                     <div className="form-check form-switch">
        //                                                         <input className="form-check-input" type="checkbox" role="switch" id="purchaesNotification" />
        //                                                     </div>
        //                                                 </div>
        //                                             </li>
        //                                         </ul>
        //                                     </div>
        //                                     <div>
        //                                         <h5 className="card-title text-decoration-underline mb-3">Delete This Account:</h5>
        //                                         <p className="text-muted">Go to the Data &amp; Privacy section of your profile Account. Scroll to "Your data &amp; privacy options." Delete your Profile Account. Follow the instructions to delete your account :</p>
        //                                         <div>
        //                                             <input type="password" className="form-control" id="passwordInput" placeholder="Enter your password" defaultValue="make@321654987" style={{ maxWidth: '265px' }} />
        //                                         </div>
        //                                         <div className="hstack gap-2 mt-3">
        //                                             <a href="javascript:void(0);" className="btn btn-soft-danger">Close &amp; Delete This Account</a>
        //                                             <a href="javascript:void(0);" className="btn btn-light">Cancel</a>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                                 {/*end tab-pane*/}
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //                 {/*end col*/}
        //             </div>
        //             {/*end row*/}
        //         </div>
        //         {/* container-fluid */}
        //     </div>{/* End Page-content */}
        //     <footer className="footer">
        //         <div className="container-fluid">
        //             <div className="row">
        //                 <div className="col-sm-6">
        //                     2025 © Velzon.
        //                 </div>
        //                 <div className="col-sm-6">
        //                     <div className="text-sm-end d-none d-sm-block">
        //                         Design &amp; Develop by Themesbrand
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </footer>


        //     <div
        //         className={success ? "modal fade zoomIn show" : "modal fade zoomIn"}
        //         id="deletetable"
        //         aria-hidden={!success && 'true'}
        //         role={success && 'dialog'}
        //         aria-modal={success && 'true'}
        //         style={{ display: success ? 'block' : 'none', backgroundColor: 'rgb(0,0,0,0.5)' }}



        //     >
        //         <div className="modal-dialog modal-dialog-centered">
        //             <div className="modal-content">
        //                 <div className="modal-header">
        //                     <button
        //                         type="button"
        //                         className="btn-close"
        //                         // data-bs-dismiss="modal"
        //                         onClick={() => setSuccess(false)}


        //                     />
        //                 </div>
        //                 <div className="card-body p-4 text-center">
        //                     <div className="avatar-lg mx-auto mt-2">
        //                         <div className="avatar-title bg-light text-success display-3 rounded-circle">
        //                             <i className="ri-checkbox-circle-fill" />
        //                         </div>
        //                     </div>
        //                     <div className="mt-4 pt-2">
        //                         <h4>Well done !</h4>
        //                         <p className="text-muted mx-4">Aww yeah, you successfully updated your profile.</p>
        //                         <div className="mt-4">
        //                             <a href="/admin/profile/id" className="btn btn-success w-100">Back to Dashboard</a>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>




        // </div>

<div></div>


    )
}
