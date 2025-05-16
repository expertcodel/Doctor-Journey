"use client";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Subscribe() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard"); // Redirect logged-in users
    }
  }, [user]);
  return (
      <>
        {/*Subscribe-Section*/}
        <section className="sptb loginSec">
          
            <div className="container">
                <div className="section-title center-block text-center">
                    <h2>Pricing</h2>
                    <p>Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula</p>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-4 col-xl-4 col-sm-12">
                            <div className="pricingTable bg-white">
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
                        <div className="col-md-12 col-lg-4 col-xl-4 col-sm-12">
                            <div className="pricingTable bg-white advance-pricing">
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
                        <div className="col-md-12 col-lg-4 col-xl-4 col-sm-12">
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

        </section>
        {/*/Subscribe-Section*/}
      </>
  );
}
