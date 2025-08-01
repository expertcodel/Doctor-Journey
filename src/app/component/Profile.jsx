"use client"
import UserProfileSidebar from "../../app/component/UserProfileSidebar";
import { faCheckCircle, faUpload, faUser, faUserAlt, faUserAltSlash, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Select2Component from "./Select2Component";
import Breadcrumb from "./Breadcrumb";
import DoctorForm from "../../component/DoctorForm";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
// import { UniversalContext } from "../../../component/context";
import AuthorForm from '../../component/AuthorForm.jsx';
import OrganizationForm from '../../component/OrganizationForm'
import PublisherForm from '../../component/PublisherForm'
import Tooltip from "../../component/Tooltip";
import ProfileCropper from '../../component/ProfileCropper'
export default function Profile({ departmentlist, countrylist }) {

    const { user } = useAuth();
    const [image, setImage] = useState(null)
    const [country, setCountry] = useState("");
    const [departmentId, setDepartmentid] = useState("");
    const [imageUrl, setImageurl] = useState(null);
    const [croppedUrl, setCroppedUrl] = useState(null)
    const [errMsg, setErrmsg] = useState("");
    const [loading, setLoading] = useState(false);

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

    const [userType, setUsertype] = useState({ 'readers': false, 'author': false, 'doctor': false, 'publisher': false, 'organization': false });

    const [message, setMessage] = useState(typeof window !== 'undefined' && sessionStorage.getItem('successMsg') ? sessionStorage.getItem('successMsg') : "")

    const [validation, setValidation] = useState({ city: "-1", zip: "-1", country: "-1", address: "-1" });
    const [data, setData] = useState({ city: "", zip: "", country: "", address: "", description: "", facebook: "", instagram: "", linkedin: "", twitter: "" });

let name;
    useEffect(() => {

        if (user) {

            
            for (let i = 0; i < departmentlist.length; i++) {
                if (user.department_id === departmentlist[i].id) {
                    
                    name=departmentlist[i].departmentName;
                    console.log(user.department_id,name);
                    
                    break;
                }
            }
            
            setDepartmentid(name);
            setCountry(user.country)
            setData({ city: user.city, zip: user.zip, address: user.address, country: user.country, description: user.description, facebook: user.facebook, instagram: user.instagram, linkedin: user.linkedin, twitter: user.twitter })
            setValidation({ city: user.city !== 'null' ? "" : "-1", country: user.country !== 'null' ? "" : "-1", zip: user.zip !== 'null' ? "" : "-1", address: user.address !== 'null' ? "" : "-1" })
            let usertype = { ...userType };
            setImage(user.profile_img);
            user.usertype.map((user) => {
                usertype[user] = true;
            })
            setUsertype(usertype);

            if (message !== "") {
                const timer = setTimeout(() => {
                    setMessage("");
                    sessionStorage.removeItem('successMsg');
                }, 3000);

                return () => clearTimeout(timer);
            }

        }

    }, [user,departmentId])

    const openLink = () => {

        window.open('/dashboard', '_blank');
    }



    const handleChange = (e) => {

        const { name, value } = e.target;
        const updatedData = { ...data };
        updatedData[name] = value;
        const updateValidation = { ...validation };

        if (name === 'city') {

            if (value === "") {

                updateValidation['city'] = 'The city field is required.'

            }
            else {

                updateValidation['city'] = ""
            }

        }
        else if (name === 'address') {

            if (value === "") {

                updateValidation['address'] = 'The address field is required.'

            }
            else {

                updateValidation['address'] = ""
            }

        }
        else if (name === 'zip') {

            if (value === "") {

                updateValidation['zip'] = 'The zip field is required.'

            }
            else {

                updateValidation['zip'] = ""
            }

        }
        else {

            if (value === "") {

                updateValidation['country'] = 'The query field is required.'

            }
            else {

                updateValidation['country'] = ""
            }


        }

        setValidation(updateValidation);
        setData(updatedData);
    }


    const submitForm = async (e) => {

        e.preventDefault();
        let flag = true;
        let updateValidation = { ...validation }

        if (validation['city'] === "-1") {
            flag = false;
            updateValidation['city'] = 'The city field is required.'
        }
        else if (validation['city'] !== "") {

            flag = false;
        }


        if (validation['zip'] === "-1") {
            flag = false;
            updateValidation['zip'] = 'The zip field is required.'
        }
        else if (validation['zip'] !== "") {

            flag = false;
        }


        if (validation['address'] === "-1") {
            flag = false;
            updateValidation['address'] = 'The address field is required.'
        }
        else if (validation['address'] !== "") {

            flag = false;
        }

        if (validation['country'] === "-1") {
            flag = false;
            updateValidation['country'] = 'The country field is required.'
        }
        else if (validation['country'] !== "") {

            flag = false;
        }

        setValidation(updateValidation)
        if (flag) {

            const formData = new FormData();
            formData.append('file', imageUrl);
            const data1 = {
                city: data.city, zip: data.zip, country: country, description: data.description, address: data.address, facebook: data.facebook, instagram: data.instagram, linkedin: data.linkedin, twitter: data.twitter, userId: user.userId, department_id: departmentId
            }
            formData.append('data', JSON.stringify(data1));
            setLoading(true);
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/updateUser`, { method: 'PATCH', body: formData })
            const res = await response.json();
            setLoading(false);
            if (res.status) {
                sessionStorage.setItem('successMsg', "Profile updated successfully")
                window.location.href = '/user-dashboard/profile'
            }
            else {

                setErrmsg(res.message);
                setTimeout(() => {
                    setErrmsg("");
                }, 3000);
            }



        }
    }

    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="My Profile" />

            {

                message !== "" && <Tooltip message={message} />
            }


            {/*User Dashboard*/}
            <section className="sptb">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-12 col-md-12">
                            <UserProfileSidebar />
                        </div>

                        <div className="col-xl-9 col-lg-12 col-md-12">
                            <div className="card mb-0">
                                <div className="card-header">
                                    <h3 className="card-title">Profile</h3>
                                </div>
                                <div className="card-body customProfile">
                                    <div className="card-pay">
                                        <ul className="tabs-menu nav">
                                            <li className=""><Link href="#basicDetails" className="active" data-bs-toggle="tab"><FontAwesomeIcon icon={faUser} /> Basic Details</Link></li>
                                            <li><Link href="#upgradeProfile" data-bs-toggle="tab" className=""><FontAwesomeIcon icon={faUserCheck} />  Upgrade Profile</Link></li>
                                        </ul>

                                        <div className="tab-content">
                                            <div className="tab-pane active show" id="basicDetails">
                                                <form onSubmit={submitForm}>
                                                    <div className="row">
                                                        <div className="col-md-4 col-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">Full Name</label>
                                                                <input type="text" className="form-control" placeholder="Full Name" defaultValue={user?.name} readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">Email address</label>
                                                                <input type="email" className="form-control" placeholder="Email" defaultValue={user?.email} readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-4 col-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">Phone Number</label>
                                                                <input type="text" className="form-control" placeholder="Number" defaultValue={user?.mobile_number} readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">Address</label>
                                                                <textarea rows={3} className={validation.address !== "" && validation.address !== "-1" && validation.address ? "form-control border-danger" : "form-control"} placeholder="Address" name="address" onChange={(e) => handleChange(e)} value={data.address} />
                                                                <span className="text-danger">{validation.address !== "" && validation.address !== "-1" && validation.address}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">City</label>
                                                                <input type="text" className={validation.city !== "" && validation.city !== "-1" && validation.city ? "form-control border-danger" : "form-control"} placeholder="City" onChange={(e) => handleChange(e)} value={data.city} name="city" />
                                                                <span className="text-danger">{validation.city !== "" && validation.city !== "-1" && validation.city}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Postal Code</label>
                                                                <input type="number" className={validation.zip !== "" && validation.zip !== "-1" && validation.zip ? "form-control border-danger" : "form-control"} placeholder="ZIP Code" onChange={(e) => handleChange(e)} value={data.zip} name="zip" />
                                                                <span className="text-danger">{validation.zip !== "" && validation.zip !== "-1" && validation.zip}</span>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Country</label>
                                                                {user && <Select2Component id="select10"
                                                                    options={


                                                                        countrylist.map((item, i) => { return { value: i + 1, label: item.name } })

                                                                    }
                                                                    select2Options={{ placeholder: user.country, allowClear: true }}
                                                                    showSearch={true} type="country" setSort="select" setCountry={setCountry} />}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">

                                                                <label className="form-label">Department</label>
                                                                {user && <Select2Component id="select9"


                                                                    options={


                                                                        departmentlist.map((item, i) => {

                                                                            return {

                                                                                value: i + 1, label: item.departmentName
                                                                            }
                                                                        })

                                                                    }
                                                                    

                                                                    select2Options={{ placeholder: departmentId, allowClear: true }}
                                                                    showSearch={true} type="department" setSort="select" setDepartmentid={setDepartmentid} />}
                                                            </div>
                                                            {
                                                                console.log(departmentId,"id")
                                                                
                                                            }
                                                        </div>
                                                        <div className="col-sm-6 col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Facebook</label>
                                                                <input type="text" className="form-control" placeholder="https://www.facebook.com/" onChange={(e) => handleChange(e)} value={data.facebook} name="facebook" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Instagram</label>
                                                                <input type="text" className="form-control" placeholder="https://www.instagram.com/" onChange={(e) => handleChange(e)} value={data.instagram} name="instagram" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Twitter</label>
                                                                <input type="text" className="form-control" placeholder="https://twitter.com/" onChange={(e) => handleChange(e)} value={data.twitter} name="twitter" />
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-6">
                                                            <div className="mb-3">
                                                                <label className="form-label">Linkedin</label>
                                                                <input type="text" className="form-control" placeholder="https://in.pinterest.com/" onChange={(e) => handleChange(e)} value={data.linkedin} name="linkedin" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">About Me</label>
                                                                <textarea rows={5} className="form-control" placeholder="Enter About your description" defaultValue={""} onChange={(e) => handleChange(e)} value={data.description} name="description" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="mb-3 mb-0">
                                                                <label className="form-label">Upload Image</label>
                                                                <div className="">
                                                                    <input type="file" className="form-control" name="example-file-input-custom" id="update-image" onChange={handleFileChange} />
                                                                </div>
                                                            </div>

                                                            {image && <ProfileCropper imageSrc={image} onCrop={handleCrop} />}

                                                            {croppedUrl && (
                                                                <div className="mt-4">
                                                                    <h3 className="text-lg font-medium">Cropped Preview:</h3>
                                                                    <img src={croppedUrl} width={274} height={185} alt="Cropped result" />
                                                                </div>
                                                            )}

                                                        </div>
                                                        <div className="col-md-12 mt-3 d-flex justify-content-center">
                                                            <button type="submit" className="btn btn-primary">
                                                                {loading ? <div className="spinner-border text-white" role="status">
                                                                    <span className="visually-hidden">Loading...</span>
                                                                </div> : 'Update Profile'}

                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div className="tab-pane" id="upgradeProfile">
                                                {/* upgradeCard */}
                                                <div className="nav upgradeCard">
                                                    {/* card */}
                                                    <div className="profileCardMain">
                                                        <div className={userType.author ? "card disabled" : "card"} style={{ pointerEvents: 'auto' }}>
                                                            {
                                                                !userType.author && <Link href="#applyAuthor" data-bs-toggle="tab" />
                                                            }
                                                            <div className="cardBody">
                                                                <figure>
                                                                    <Image src="/images/upgrade-icons/author.png" width={60} height={60} alt="user" />
                                                                    <figcaption>
                                                                        Upgrade for <span>Author</span>
                                                                    </figcaption>
                                                                </figure>
                                                            </div>

                                                            {
                                                                userType.author && <>
                                                                    <FontAwesomeIcon icon={faCheckCircle} className="greenTick" />
                                                                </>
                                                            }
                                                        </div>
                                                        {
                                                            userType.author && <>
                                                                <button className="btn btn-info mt-3 btn-block" onClick={openLink}>Go to Dashboard</button>
                                                            </>
                                                        }
                                                    </div>
                                                    {/* card */}
                                                    <div className="profileCardMain">
                                                        <div className={userType.doctor ? "card disabled" : "card"} style={{ pointerEvents: 'auto' }}>
                                                            {
                                                                !userType.doctor && <Link href="#applyDoctor" data-bs-toggle="tab" />
                                                            }

                                                            <div className="cardBody">
                                                                <figure>
                                                                    <Image src="/images/upgrade-icons/doctor.png" width={60} height={60} alt="user" />
                                                                    <figcaption>
                                                                        Upgrade for <span>Doctor</span>
                                                                    </figcaption>
                                                                </figure>
                                                            </div>
                                                            {
                                                                userType.doctor && <>
                                                                    <FontAwesomeIcon icon={faCheckCircle} className="greenTick" />
                                                                </>
                                                            }
                                                        </div>
                                                        {
                                                            userType.doctor && <>
                                                                <button className="btn btn-info mt-3 btn-block" onClick={openLink}>Go to Dashboard</button>
                                                            </>
                                                        }
                                                    </div>
                                                    {/* card */}
                                                    <div className="profileCardMain">
                                                        <div className={userType.publisher ? "card disabled" : "card"} style={{ pointerEvents: 'auto' }}>
                                                            {
                                                                !userType.publisher && <Link href="#applyPublisher" data-bs-toggle="tab" />

                                                            }

                                                            <div className="cardBody">
                                                                <figure>
                                                                    <Image src="/images/upgrade-icons/publisher.png" width={60} height={60} alt="user" />
                                                                    <figcaption>
                                                                        Upgrade for <span>Publisher</span>
                                                                    </figcaption>
                                                                </figure>
                                                            </div>
                                                            {userType.publisher && <>
                                                                <FontAwesomeIcon icon={faCheckCircle} className="greenTick" />
                                                            </>}
                                                        </div>
                                                        {
                                                            userType.publisher && <>
                                                                <button className="btn btn-info mt-3 btn-block" onClick={openLink}>Go to Dashboard</button>
                                                            </>
                                                        }
                                                    </div>
                                                    {/* card */}
                                                    <div className="profileCardMain">
                                                        <div className={userType.organization ? "card disabled" : "card"} style={{ pointerEvents: 'auto' }}>

                                                            {
                                                                !userType.organization && <Link href="#applyOrganization" data-bs-toggle="tab" />
                                                            }

                                                            <div className="cardBody">
                                                                <figure>
                                                                    <Image src="/images/upgrade-icons/organization.png" width={60} height={60} alt="user" />
                                                                    <figcaption>
                                                                        Upgrade for <span>Organization</span>
                                                                    </figcaption>
                                                                </figure>
                                                            </div>

                                                            {userType.organization && <>
                                                                <FontAwesomeIcon icon={faCheckCircle} className="greenTick" />
                                                            </>}
                                                        </div>
                                                        {
                                                            userType.organization && <>
                                                                <button className="btn btn-info mt-3 btn-block" onClick={openLink}>Go to Dashboard</button>
                                                            </>
                                                        }
                                                    </div>
                                                </div>

                                                {/*Upgrade cards */}

                                                <div className="tab-content">
                                                    <div className="tab-pane" id="applyDoctor">
                                                        <div className="card mt-3 mb-0">
                                                            <DoctorForm />
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane" id="applyAuthor">
                                                        <div className="card mt-3 mb-0">
                                                            <AuthorForm />
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane" id="applyPublisher">
                                                        <div className="card mt-3 mb-0">
                                                            <PublisherForm />
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane" id="applyOrganization">
                                                        <div className="card mt-3 mb-0">
                                                            <OrganizationForm />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*User Dashboard*/}
        </>
    )
}