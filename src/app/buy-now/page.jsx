import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumb from "../component/Breadcrumb";
import Select2Component from "../component/Select2Component";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function BuyNowPage() {
    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="Buy Now" />

            <div className="sptb-1 bg-white">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-lg-4 col-md-12">
                            <div className="card card-aside">
                                <div className="card-body ">
                                    <div className="card-item d-flex">
                                        <h4 className="m-0">Journal 1</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="card card-aside">
                                <div className="card-body ">
                                    <div className="card-item d-flex">
                                        <h4 className="m-0">Price: <span className="font-weight-bold">₹ 500.00</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="card card-aside">
                                <div className="card-body ">
                                    <div className="card-item d-flex">
                                        <h4 className="m-0">
                                            Indexing: <span className="font-weight-bold">Volume 1</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="widget-title fs-16">Register For Journals</h3>
                    <hr className="widget-hr" />

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Full Name</label>
                                                    <input type="text" className="form-control" placeholder="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="email" className="form-control" placeholder="Email Address" required="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3 mb-0">
                                                    <label className="form-label">Phone Number</label>
                                                    <input type="number" className="form-control" placeholder="Number" required="" />
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12">
                                                <div className="mb-3 mb-0">
                                                    <label className="form-label text-dark">Address</label>
                                                    <textarea className="form-control" name="example-textarea-input" rows={3} placeholder="text here.." required="" defaultValue={ ""} />
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
                                            <div className="col-md-12 mt-3 d-flex justify-content-center">
                                                <button type="submit" className="btn btn-primary">
                                                    Proceed to Checkout <FontAwesomeIcon icon={faAngleRight} />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}