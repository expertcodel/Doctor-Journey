"use client"
import Breadcrumb from "@/app/component/Breadcrumb";
import UserProfileSidebar from "@/app/component/UserProfileSidebar";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PaymentHistory() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="Payment History" />

            {/*User Dashboard*/}
            <section className="sptb">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-12 col-md-12">
                            <UserProfileSidebar />
                        </div>

                        <div className="col-xl-9 col-lg-12 col-md-12">
                            <div className="card mb-0 dashboardFilter">
                                <div className="card-header">
                                    <h3 className="card-title">Payment History</h3>
                                </div>
                                <div className="card-body p-0">
                                    <div className="single-page">
                                        <div className="wrapper">
                                            <form id="login" class="card-body" tabindex="500">
                                                <div className="row g-3">
                                                    <div className="col-md-4 col-12">
                                                        <input type="email" name="mail" />
                                                        <label>Payment ID</label>
                                                    </div>
                                                    <div className="col-md-4 col-12">
                                                        <DatePicker
                                                            selected={startDate}
                                                            onChange={(date) => {
                                                                setStartDate(date);
                                                                if (date > endDate) setEndDate(null); // reset if start > end
                                                            }}
                                                            selectsStart
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            dateFormat="yyyy-MM-dd"
                                                        />
                                                        <label>From Date</label>
                                                    </div>
                                                    <div className="col-md-4 col-12">
                                                        <DatePicker
                                                            selected={endDate}
                                                            onChange={(date) => setEndDate(date)}
                                                            selectsEnd
                                                            startDate={startDate}
                                                            endDate={endDate}
                                                            minDate={startDate}
                                                            dateFormat="yyyy-MM-dd"
                                                        />
                                                        <label>To Date</label>
                                                    </div>
                                                    <div className="col-md-4 offset-md-4 col-6 offset-3">
                                                        <button className="btn btn-primary btn-block" type="submit">
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-0">
                                <div className="card-header">
                                    <h3 className="card-title">Payment List</h3>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive border-top">
                                        <table className="table table-bordered table-hover text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Payment ID</th>
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Price</th>
                                                    <th>Duration</th>
                                                    <th>Status</th>
                                                    <th>&nbsp;</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-primary">#89345</td>
                                                    <td>Business</td>
                                                    <td>27-3-2025</td>
                                                    <td className="font-weight-semibold fs-16">$200</td>
                                                    <td>1 Months</td>
                                                    <td>
                                                        <span className="badge bg-success">
                                                            Activated
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <Link href="/" class="btn btn-primary btn-sm text-white">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-primary">#89345</td>
                                                    <td>Business</td>
                                                    <td>27-2-2025</td>
                                                    <td className="font-weight-semibold fs-16">$200</td>
                                                    <td>1 Months</td>
                                                    <td>
                                                        <span className="badge bg-danger">
                                                            Pending
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <Link href="/" class="btn btn-primary btn-sm text-white">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-primary">#89345</td>
                                                    <td>Standard</td>
                                                    <td>17-12-2024</td>
                                                    <td className="font-weight-semibold fs-16">$300</td>
                                                    <td>3 Months</td>
                                                    <td>
                                                        <span className="badge bg-primary">
                                                            Completed
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <Link href="/" class="btn btn-primary btn-sm text-white">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <ul class="pagination d-flex justify-content-center mt-3">
                                        <li class="page-item page-prev disabled">
                                            <a class="page-link" href="javascript:void(0);" tabindex="-1">Prev</a>
                                        </li>
                                        <li class="page-item active"><a class="page-link" href="javascript:void(0);">1</a></li>
                                        <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
                                        <li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
                                        <li class="page-item page-next">
                                            <a class="page-link" href="javascript:void(0);">Next</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}