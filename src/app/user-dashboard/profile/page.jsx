import UserProfileSidebar from "@/app/component/UserProfileSidebar";
import { faCheckCircle, faUpload, faUser, faUserAlt, faUserAltSlash, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Select2Component from "../../component/Select2Component";
import Breadcrumb from "@/app/component/Breadcrumb";

export default function Profile() {
    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="My Profile" />

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
                                                <div className="row">
                                                    <div className="col-md-4 col-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Full Name</label>
                                                            <input type="text" className="form-control" placeholder="Full Name" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Email address</label>
                                                            <input type="email" className="form-control" placeholder="Email" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 col-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Phone Number</label>
                                                            <input type="number" className="form-control" placeholder="Number" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">Address</label>
                                                            <textarea rows={3} className="form-control" placeholder="Address" defaultValue={ ""} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-4">
                                                        <div className="mb-3">
                                                            <label className="form-label">City</label>
                                                            <input type="text" className="form-control" placeholder="City" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-3">
                                                        <div className="mb-3">
                                                            <label className="form-label">Postal Code</label>
                                                            <input type="number" className="form-control" placeholder="ZIP Code" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="mb-3">
                                                            <label className="form-label">Country</label>
                                                            <Select2Component id="select2" 
                                                            options={[ 
                                                                { value: "1", label: "India" }, 
                                                                { value: "2", label: "Mexico" }, 
                                                                { value: "3", label: "Canada" }, 
                                                                { value: "4", label: "Usa" }, 
                                                                { value: "5", label: "Afghanistan" }, 
                                                                { value: "6", label: "Albania" },  
                                                                { value: "6", label: "Germany" }, 
                                                            ]} 
                                                            select2Options={{ placeholder: "Select category", allowClear: true }}
                                                            showSearch={true} />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Facebook</label>
                                                            <input type="text" className="form-control" placeholder="https://www.facebook.com/" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Google</label>
                                                            <input type="text" className="form-control" placeholder="https://www.google.com/" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Twitter</label>
                                                            <input type="text" className="form-control" placeholder="https://twitter.com/" />
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Pinterest</label>
                                                            <input type="text" className="form-control" placeholder="https://in.pinterest.com/" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="mb-3">
                                                            <label className="form-label">About Me</label>
                                                            <textarea rows={5} className="form-control" placeholder="Enter About your description" defaultValue={ ""} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="mb-3 mb-0">
                                                            <label className="form-label">Upload Image</label>
                                                            <div className="">
                                                                <input type="file" className="form-control" name="example-file-input-custom" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 mt-3 d-flex justify-content-center">
                                                        <button type="submit" className="btn btn-primary">
                                                            Updated Profile
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-pane" id="upgradeProfile">
                                                {/* upgradeCard */}
                                                <div className="nav upgradeCard">
                                                    {/* card */}
                                                    <div className="card disabled">
                                                        <Link href="#applyAuthor" data-bs-toggle="tab" />
                                                        <div className="cardBody">
                                                            <figure>
                                                                <Image src="/images/upgrade-icons/author.png" width={60} height={60} alt="user" />
                                                                <figcaption>
                                                                    Apply for <span>Author</span>
                                                                </figcaption>
                                                            </figure>
                                                        </div>
                                                        <FontAwesomeIcon icon={faCheckCircle} className="greenTick" />
                                                    </div>
                                                    {/* card */}
                                                    <div className="card">
                                                        <Link href="#applyDoctor" data-bs-toggle="tab" />
                                                        <div className="cardBody">
                                                            <figure>
                                                                <Image src="/images/upgrade-icons/doctor.png" width={60} height={60} alt="user" />
                                                                <figcaption>
                                                                    Apply for <span>Doctor</span>
                                                                </figcaption>
                                                            </figure>
                                                        </div>
                                                    </div>
                                                    {/* card */}
                                                    <div className="card">
                                                        <Link href="#applyPublisher" data-bs-toggle="tab" />
                                                        <div className="cardBody">
                                                            <figure>
                                                                <Image src="/images/upgrade-icons/publisher.png" width={60} height={60} alt="user" />
                                                                <figcaption>
                                                                    Apply for <span>Publisher</span>
                                                                </figcaption>
                                                            </figure>
                                                        </div>
                                                    </div>
                                                    {/* card */}
                                                    <div className="card">
                                                        <Link href="#applyOrganization" data-bs-toggle="tab" />
                                                        <div className="cardBody">
                                                            <figure>
                                                                <Image src="/images/upgrade-icons/organization.png" width={60} height={60} alt="user" />
                                                                <figcaption>
                                                                    Apply for <span>Organization</span>
                                                                </figcaption>
                                                            </figure>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* apply cards */}
                            <div className="card mt-3 mb-0">
                                <div className="tab-content">
                                    <div className="tab-pane" id="applyDoctor">
                                        Doctor
                                    </div>
                                    <div className="tab-pane" id="applyAuthor">
                                        Author
                                    </div>
                                    <div className="tab-pane" id="applyPublisher">
                                        Publisher
                                    </div>
                                    <div className="tab-pane" id="applyOrganization">
                                        Organisation
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