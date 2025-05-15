import UserProfileSidebar from "@/app/component/UserProfileSidebar";
import Link from "next/link";

export default function UpgradeSubscription() {
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
                                        Upgrade Subscription
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
                                    <h3 className="card-title">Upgrade Subscription</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-lg-4 col-md-6 col-12">
                                            <div className="pricingTable bg-white advance-pricing">
                                                <div className="price-value">
                                                    $0.0
                                                    <span className="month">Monthly</span>
                                                </div>
                                                <h3 className="title">Business</h3>
                                                <ul className="pricing-content">
                                                    <li>
                                                    <strong>4</strong> Ads
                                                    </li>
                                                    <li>
                                                    <i className="fe fe-check text-success me-2" /> 30 days
                                                    </li>
                                                    <li>
                                                    <i className="fe fe-x text-danger me-2" /> Private Messages
                                                    </li>
                                                    <li>
                                                    <i className="fe fe-x text-danger me-2" /> Urgent Ads
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
                                                    $65
                                                    <span className="month">Quaterly</span>
                                                </div>
                                                <h3 className="title">Standard</h3>
                                                <ul className="pricing-content">
                                                    <li>
                                                    <strong>50</strong> Ads
                                                    </li>
                                                    <li>
                                                    <i className="fe fe-check text-success me-2" /> 90 Days
                                                    </li>
                                                    <li>
                                                    <i className="fe fe-x text-danger me-2" /> Private Messages
                                                    </li>
                                                    <li>
                                                    <i className="fe fe-x text-danger me-2" /> Urgent ads
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
                                                    <i className="fe fe-check text-success me-2" /> 365 days
                                                    </li>
                                                    <li>
                                                    <i className="fe fe-check text-success me-2" /> Private Messages
                                                    </li>
                                                    <li>
                                                    <i className="fe fe-x text-danger me-2" /> Urgent ads
                                                    </li>
                                                </ul>
                                                <a href="javascript:void(0);" className="pricingTable-signup">
                                                    Choose plan
                                                </a>
                                            </div>
                                        </div>
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