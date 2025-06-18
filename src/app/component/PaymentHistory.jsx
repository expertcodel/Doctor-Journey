"use client"
import Breadcrumb from "./Breadcrumb";
import UserProfileSidebar from "./UserProfileSidebar";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PaymentHistory({ totalItems, paymentList, userId }) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [paymentLists, setPaymentlists] = useState(paymentList);
    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [name, setName] = useState("");


    const searching = async (e) => {

        e.preventDefault();
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/payments/?page=1&name=${name.trim()}&userId=${userId}`);

        const res = await response.json();
        if (res.status) {
            setPaymentlists(res.paymentlist);
            setButton(Math.ceil(res.totalItems / 5));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/payments/?page=${idx}&name=${name}&userId=${userId}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setPaymentlists(res.paymentlist);
                setButton(Math.ceil(res.totalItems / 5));
            }

        }


    }

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
                                            <form id="login" class="card-body" tabindex="500" onSubmit={searching}>
                                                <div className="row g-3">
                                                    <div className="col-md-4 col-12">
                                                        <input type="text" name="mail" onChange={(e) => setName(e.target.value)} />
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
                                                {paymentLists.map((payment) => <tr>
                                                    <td className="text-primary">{payment.paymentId}</td>
                                                    <td>{payment.paymentName}</td>
                                                    <td>{payment.paymentDate}</td>
                                                    <td className="font-weight-semibold fs-16">&#8377;{payment.paymentPrice}</td>
                                                    <td>{payment.paymentDuration}</td>
                                                    <td>
                                                        <span className={payment.status ? "badge bg-success" : "badge bg-danger"}>
                                                            {payment.status ? "Recieved" : "Pending"}
                                                        </span>
                                                    </td>
                                                    <td className="text-center">
                                                        <Link href="/" class="btn btn-primary btn-sm text-white">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Link>
                                                    </td>
                                                </tr>)}

                                            </tbody>
                                        </table>
                                    </div>
                                    {button > 1 && <ul class="pagination d-flex justify-content-center mt-3">
                                        <li class={idx === 1 ? "page-item page-prev disabled" : "page-item page-prev"}>
                                            <button class="page-link" onClick={() => pagination(idx - 1)} tabindex="-1">Prev</button>
                                        </li>
                                        {Array.from({ length: button }, (_, i) => <li class={i + 1 === idx ? "page-item active" : "page-item"}><button class="page-link" onClick={() => pagination(i + 1)}>{i + 1}</button></li>)}

                                        <li class="page-item page-next">
                                            <button class="page-link" onClick={() => pagination(idx + 1)}>Next</button>
                                        </li>
                                    </ul>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}