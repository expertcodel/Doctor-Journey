import UserProfileSidebar from "@/app/component/UserProfileSidebar";
import Link from "next/link";

export default function MySubscription() {
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
                                    <li className="breadcrumb-item">
                                        <Link href="/user-dashboard/profile">Profile</Link>
                                    </li>
                                    <li className="breadcrumb-item active text-white" aria-current="page">
                                        My Subscription
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
                                    <h3 className="card-title">My Subscription</h3>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive border-top">
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
                                    {/* <ul className="pagination">
                                        <li className="page-item page-prev disabled">
                                            <a className="page-link" href="javascript:void(0);" tabIndex={-1}>
                                                Prev
                                            </a>
                                        </li>
                                        <li className="page-item active">
                                            <a className="page-link" href="javascript:void(0);">
                                                1
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="javascript:void(0);">
                                                2
                                            </a>
                                        </li>
                                        <li className="page-item">
                                            <a className="page-link" href="javascript:void(0);">
                                                3
                                            </a>
                                        </li>
                                        <li className="page-item page-next">
                                            <a className="page-link" href="javascript:void(0);">
                                                Next
                                            </a>
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}