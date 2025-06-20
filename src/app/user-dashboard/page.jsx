import UserProfileSidebar from "../../app/component/UserProfileSidebar";
import { faCheckCircle, faUpload, faUser, faUserAlt, faUserAltSlash, faUserCheck, faEye, faPlus, faClipboardList, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../../app/component/Breadcrumb";
import {extractUsertype} from '../../utils/userType'
export default async function UserDashboard() {


    const { userId } = await extractUsertype();
    let paymentList = [];

    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/user-dashboard/?userId=${userId}`, {
            method: 'GET',
            cache: 'no-store',
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            paymentList = res.paymentlist;

        }


    } catch (error) {
        console.log("fetching failed", error);
    }



    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="User Dashboard" />

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
                                    <h3 className="card-title">User Dashboard</h3>
                                </div>
                                <div className="card-body customProfile">
                                    <div className="card-pay">
                                        {/* upgradeCard */}
                                        <div className="nav upgradeCard userDashboardCard">
                                            {/* card */}
                                            <div className="card">
                                                <Link href="/user-dashboard/profile" />
                                                <div className="cardBody">
                                                    <figure>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                        <figcaption>
                                                            My <span>Profile</span>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                            {/* card */}
                                            <div className="card">
                                                <Link href="/user-dashboard/my-subscription" />
                                                <div className="cardBody">
                                                    <figure>
                                                        <FontAwesomeIcon icon={faClipboardList} />
                                                        <figcaption>
                                                            My <span>Subscription</span>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                            {/* card */}
                                            <div className="card">
                                                <Link href="/user-dashboard/payment-history" />
                                                <div className="cardBody">
                                                    <figure>
                                                        <FontAwesomeIcon icon={faWallet} />
                                                        <figcaption>
                                                            Payment <span>History</span>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {
                                (paymentList.length > 0) && (
                                    <>
                                        <div className="card mb-0">
                                            <div className="card-header">
                                                <h3 className="card-title">Recent Payment history</h3>
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
                                                            {paymentList.map((payment) => <tr>
                                                                <td className="text-primary">{payment.paymentId}</td>
                                                                <td>{payment.paymentName}</td>
                                                                <td>{payment.paymentDate}</td>
                                                                <td className="font-weight-semibold fs-16">&#8377;{payment.paymentPrice}</td>
                                                                <td>{payment.paymentDuration}</td>
                                                                <td>
                                                                    <span className={payment.status ? "badge bg-success" : "badge bg-danger"}>
                                                                        {payment.status ? "Activated" : "Pending"}
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
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
            </section>
            {/*User Dashboard*/}
        </>
    );
}
