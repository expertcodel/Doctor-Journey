"use client"
import Breadcrumb from "./Breadcrumb";
import UserProfileSidebar from "./UserProfileSidebar";
import { faCheck, faSearch, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import Tooltip from "../../component/Tooltip";
export default function Subscription({ subscriptionList, subscriptionsList }) {

    const [loading, setLoading] = useState("");
    const { user } = useAuth();
    const [message, setMessage] = useState(typeof window !== 'undefined' && sessionStorage.getItem('successMsg') ? sessionStorage.getItem('successMsg') : "")
    const [map,setMap]=useState(new Map());
    // const map = new Map();

    useEffect(() => {


        subscriptionList.forEach((plan) => map.set(plan.subscriptionsId, 1))

        if (message !== "") {
            const timer = setTimeout(() => {
                setMessage("");
                sessionStorage.removeItem('successMsg');
            }, 3000);

            return () => clearTimeout(timer);
        }

    }, [])

    const handlePayment = async (amount, subscriptionsId, subscriptionName, subscriptionType, duration) => {

        setLoading(subscriptionsId);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/create-order`, {
            method: "POST",
            body: JSON.stringify({ amount,path: '/subscription' }),
        });
        const order = await res.json();
        setLoading("");
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "Doctor's Journey",
            description: "Subscription Payment",
            order_id: order.id,
            handler: async (response) => {
                await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/verify`, {
                    method: "POST",
                    body: JSON.stringify({
                        ...response,
                        userData: user,
                        amount, subscriptionsId, subscriptionName, subscriptionType, duration
                    }),
                });
                // alert("Payment successful!");
                sessionStorage.setItem('successMsg', 'Subscription Added Successfully');
                window.location.href = '/user-dashboard/my-subscription'

            },
            prefill: {
                name: user.name,
                email: user.email,
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="My Subscription" />

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
                                    <h3 className="card-title">My Subscription</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        {subscriptionsList.map((item, i) => <div className="col-lg-4 col-md-6 col-12" key={item.subscriptionsId}>
                                            <div className="pricingTable bg-white advance-pricing">
                                                <div className="price-value">
                                                    &#8377;{item.price}
                                                    <span className="month">{item.subscriptionType}</span>
                                                </div>
                                                <h3 className="title">{item.subscriptionName}</h3>
                                                <ul className="pricing-content">
                                                    <li>
                                                        <strong>4</strong> Ads
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faCheck} className="text-success me-2" /> {item.duration} days
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faX} className="text-danger me-2" /> Private Messages
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faX} className="text-danger me-2" /> Urgent Ads
                                                    </li>
                                                </ul>
                                                {
                                                    console.log(map.get(item.subscriptionsId),"hj")
                                                    
                                                }
                                                <button onClick={() => handlePayment(item.price, item.subscriptionsId, item.subscriptionName, item.subscriptionType, item.duration)} className="pricingTable-signup" style={{ border: 'none' }} disabled={map.get(item.subscriptionsId)}>
                                                    {loading === item.subscriptionsId ? <div className="spinner-border text-white" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div> : <>{map.get(item.subscriptionsId)?'Activated':'Choose plan'}</>}

                                                </button>
                                            </div>
                                        </div>)}


                                    </div>


                                    
                                    <div className="table-responsive border-top mt-5">
                                        <table className="table table-bordered table-hover text-nowrap">
                                            <thead>
                                                <tr>
                                                    <th>Subscription ID</th>
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Price</th>
                                                    <th>Duration</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            {
                                                subscriptionList.length > 0 ? (
                                                    <>
                                                        <tbody>
                                                            {subscriptionList.map((subscription) => <tr>
                                                                <td className="text-primary">{subscription.subscriptionId}</td>
                                                                <td>{subscription.subscriptionName}</td>
                                                                <td>{subscription.startDate}</td>
                                                                <td className="font-weight-semibold fs-16">&#8377;{subscription.subscriptionPrice}</td>
                                                                <td>{subscription.subscriptionDuration}</td>
                                                                <td>
                                                                    <span className={subscription.status ? "badge bg-success" : "badge bg-danger"}>
                                                                        {subscription.status ? "Activated" : "Expired"}
                                                                    </span>
                                                                </td>
                                                            </tr>)}

                                                        </tbody>
                                                    </>
                                                ) : (
                                                    <tbody>
                                                        <tr>
                                                        <td className="card-body text-center" colSpan={6}>
                                                            <FontAwesomeIcon icon={faSearch} size="lg" beat />
                                                            <h3>No Data Found</h3>
                                                        </td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            }
                                        </table>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}