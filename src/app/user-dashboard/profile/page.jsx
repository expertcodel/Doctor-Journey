import UserProfileSidebar from "@/app/component/UserProfileSidebar";
import Link from "next/link";


export default function Profile() {
    return (
        <>
            {/*Breadcrumb*/}
            <section>
                <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
                    <div className="header-text mb-0">
                        <div className="container">
                            <div className="text-center text-white">
                                <h1 className="">My Dashboard</h1>
                                <ol className="breadcrumb text-center">
                                    <li className="breadcrumb-item">
                                        <Link href="/user-dashboard">Restaurants</Link>
                                    </li>
                                    <li className="breadcrumb-item active text-white" aria-current="page">
                                        My Dashboard
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Breadcrumb*/}

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
                                    <h3 className="card-title">Edit Profile</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-6 col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">First Name</label>
                                                <input type="text" className="form-control" placeholder="First Name" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Last Name</label>
                                                <input type="text" className="form-control" placeholder="Last Name" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Email address</label>
                                                <input type="email" className="form-control" placeholder="Email" />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Phone Number</label>
                                                <input type="number" className="form-control" placeholder="Number" />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Address</label>
                                                <input type="text" className="form-control" placeholder="Home Address" />
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
                                                <select className="form-control select2-show-search border-bottom-0 w-100 select2-show-search" data-placeholder="Select">
                                                    <optgroup label="Categories">
                                                        <option>--Select--</option>
                                                        <option value={1}>Germany</option>
                                                        <option value={2}>Real Estate</option>
                                                        <option value={3}>Canada</option>
                                                        <option value={4}>Usa</option>
                                                        <option value={5}>Afghanistan</option>
                                                        <option value={6}>Albania</option>
                                                        <option value={7}>China</option>
                                                        <option value={8}>Denmark</option>
                                                        <option value={9}>Finland</option>
                                                        <option value={10}>India</option>
                                                        <option value={11}>Kiribati</option>
                                                        <option value={12}>Kuwait</option>
                                                        <option value={13}>Mexico</option>
                                                        <option value={14}>Pakistan</option>
                                                    </optgroup>
                                                </select>
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
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-primary">
                                        Updated Profile
                                    </button>
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