import Breadcrumb from "../../../app/component/Breadcrumb";
import UserProfileSidebar from "../../../app/component/UserProfileSidebar";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default async function MySubscription() {

    let subscriptionList=[];

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/getSubscription`, {

            method: 'GET',
            cache: 'no-store',
            // body: JSON.stringify({ videoId })
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
          
            subscriptionList=res.subscriptionlist
        }


    } catch (error) {

        console.log("fetching failed", error);


    }

    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="My Subscription" />

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
                                      {  subscriptionList.map((item)=><div className="col-lg-4 col-md-6 col-12" key={item.subscriptionId}>
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
                                                <a href="javascript:void(0);" className="pricingTable-signup">
                                                    Choose plan
                                                </a>
                                            </div>
                                        </div>)}

                                        {/* <div className="col-lg-4 col-md-6 col-12">
                                            <div className="pricingTable bg-white">
                                                <div className="price-value">
                                                    $65
                                                    <span className="month">Quaterly</span>
                                                </div>
                                                <h3 className="title">Standard</h3>
                                                <ul className="pricing-content">
                                                    <li>
                                                    <strong>50</strong> Ads
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faCheck} className="text-success me-2" /> 90 Days
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faX} className="text-danger me-2" /> Private Messages
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faX} className="text-danger me-2" /> Urgent ads
                                                    </li>
                                                </ul>
                                                <a href="javascript:void(0);" className="pricingTable-signup">
                                                    Choose plan
                                                </a>
                                            </div>
                                        </div>

                                        <div className="col-lg-4 col-md-6 col-12">
                                            <div className="pricingTable bg-white">
                                                <div className="price-value">
                                                    $100
                                                    <span className="month">Yearly</span>
                                                </div>
                                                <h3 className="title">Premium</h3>
                                                <ul className="pricing-content">
                                                    <li>
                                                    <strong>100</strong> Ads
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faCheck} className="text-success me-2" /> 365 days
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faCheck} className="text-success me-2" /> Private Messages
                                                    </li>
                                                    <li>
                                                        <FontAwesomeIcon icon={faX} className="text-danger me-2" /> Urgent ads
                                                    </li>
                                                </ul>
                                                <a href="javascript:void(0);" className="pricingTable-signup">
                                                    Choose plan
                                                </a>
                                            </div>
                                        </div> */}
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
                                                </tr>
                                                <tr>
                                                    <td className="text-primary">#89345</td>
                                                    <td>Business</td>
                                                    <td>27-2-2025</td>
                                                    <td className="font-weight-semibold fs-16">$200</td>
                                                    <td>1 Months</td>
                                                    <td>
                                                        <span className="badge bg-danger">
                                                            Expired
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-primary">#89345</td>
                                                    <td>Standard</td>
                                                    <td>17-12-2024</td>
                                                    <td className="font-weight-semibold fs-16">$300</td>
                                                    <td>3 Months</td>
                                                    <td>
                                                        <span className="badge bg-danger">
                                                            Expired
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
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