import UserProfileSidebar from "@/app/component/UserProfileSidebar";
import { faCheckCircle, faUpload, faUser, faUserAlt, faUserAltSlash, faUserCheck, faEye, faPlus, faClipboardList, faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/app/component/Breadcrumb";

export default function UserDashboard() {
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
                                            <Link href="/" />
                                            <div className="cardBody">
                                                <figure>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                    <figcaption>
                                                        Create <span>Profile</span>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*User Dashboard*/}
    </>
  );
}
