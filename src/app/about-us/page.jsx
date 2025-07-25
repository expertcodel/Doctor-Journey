import Link from "next/link";
import Breadcrumb from "../component/Breadcrumb";
import ThumbnailSponsorCarousel from "../component/ThumbnailSponsorCarousel";
import TestimonialsCarousel from "../component/Testimonials";
import AboutSection from "../component/AboutSection";

export default async function About() {

    let testimonialList = [];

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/home`, {
            method: 'GET',
            cache: 'no-store'
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();
        if (res.status) {
            testimonialList = res.testimoniallist;
        }
    } catch (error) {
        console.log("fetching failed", error);
    }

    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="About us" />

            {/*AboutSection*/}
            <AboutSection />

            {/*How to work*/}
            <section className="sptb bg-white shapeParentDiv">
                <div className="container">
                    <div className="section-title center-block text-center">
                        <h2>How It Works?</h2>
                        <p>
                            Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ol className="step-list">
                                <li className="step-list__item">
                                    <div className="step-list__item__inner">
                                        <div className="content">
                                            <div className="body">
                                                <h2>Lorem ipsum dolor sit amet</h2>
                                                <p>Consectetur adipisicing elit. Reprehenderit perspiciatis.</p>
                                            </div>
                                            <div className="icon">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/13060/check-circle.svg" alt="Check" />
                                                <span>Register</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="step-list__item">
                                    <div className="step-list__item__inner">
                                        <div className="content">
                                            <div className="body">
                                                <h2>Impedit ducimus saepe assumenda</h2>
                                                <p>
                                                    Sapiente beatae? Quo maiores consequatur, eveniet autem eos quia molestias perferendis.
                                                </p>
                                            </div>
                                            <div className="icon">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/13060/mail_outline_copy.svg" alt="Check" />
                                                <span>Login</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="step-list__item">
                                    <div className="step-list__item__inner">
                                        <div className="content">
                                            <div className="body">
                                                <h2>Repellendus</h2>
                                                <p>
                                                    {" "} Asperiores eum, accusantium harum, aperiam labore assumenda quisquam tempore magnam enim iusto voluptatum aspernatur dicta saepe possimus nobis molestiae quas sapiente.
                                                </p>
                                            </div>
                                            <div className="icon">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/13060/graph.svg" alt="Check" />
                                                <span>Multiple Accounts</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="step-list__item">
                                    <div className="step-list__item__inner">
                                        <div className="content">
                                            <div className="body">
                                                <h2>Quaerat</h2>
                                                <p>
                                                    {" "} Iusto quod incidunt vel quidem fuga quos laudantium dignissimos eos, tempore sequi quis praesentium.
                                                </p>
                                            </div>
                                            <div className="icon">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/13060/calendar.svg" alt="Check" />
                                                <span>Upload Videos</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="step-list__item">
                                    <div className="step-list__item__inner">
                                        <div className="content">
                                            <div className="body">
                                                <h2>Voluptatum alias hic</h2>
                                                <p>
                                                    Officiis excepturi atque velit asperiores cum perferendis, repellendus facilis voluptatibus quas! Consequuntur.
                                                </p>
                                            </div>
                                            <div className="icon">
                                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/13060/heart.svg" alt="Check" />
                                                <span>Manage Profile</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="shape1" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape5.png" alt="image" />
                </div>
                <div className="shape2" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape2.png" alt="image" />
                </div>
                <div className="shape3" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape3.png" alt="image" />
                </div>
                <div className="shape4" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape4.png" alt="image" />
                </div>
                <div className="shape20" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape22.png" alt="image" />
                </div>
                <div className="shape19" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape6.png" alt="image" />
                </div>
                <div className="shape18" data-speed="0.06" data-revert="true">
                    <img src="/images/shape/shape14.png" alt="image" />
                </div>
            </section>
            {/*/How to work*/}

            {/* Our Sponsor */}
            <section className="sectionSpace sptb bg-f5d4cd">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title center-block text-center">
                                <h3>Our Sponsor</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <ThumbnailSponsorCarousel />
                        </div>
                    </div>
                </div>
            </section>

            {/*section*/}
            <section className="sptb bg-white">
                <div className="container">
                    <div className="section-title center-block text-center">
                        <h2>Why Choose Us?</h2>
                        <p>
                            Mauris ut cursus nunc. Morbi eleifend, ligula at consectetur vehicula
                        </p>
                    </div>
                    <div className="row ">
                        <div className="col-md-6 col-lg-4 features">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <div className="feature">
                                        <h3 className="font-weight-bold">Job Security</h3>
                                        <p>
                                            our being able to do what we like best, every pleasure is to be welcomed and every pain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 features">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <div className="feature">
                                        <h3 className="font-weight-bold">
                        {" "}
                        All Jobs Notifications Available
                        </h3>
                                        <p>
                                            our being able to do what we like best, every pleasure is to be welcomed and every pain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 features">
                            <div className="card bg-light">
                                <div className="card-body text-center">
                                    <div className="feature">
                                        <h3 className="font-weight-bold">Recruitment Services</h3>
                                        <p>
                                            our being able to do what we like best, every pleasure is to be welcomed and every pain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 features">
                            <div className="card mb-lg-0 bg-light">
                                <div className="card-body text-center">
                                    <div className="feature">
                                        <h3 className="font-weight-bold">100% Job Assistance</h3>
                                        <p>
                                            our being able to do what we like best, every pleasure is to be welcomed and every pain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 features">
                            <div className="card mb-lg-0 mb-md-0 bg-light">
                                <div className="card-body text-center">
                                    <div className="feature">
                                        <h3 className="font-weight-bold">User Friendly</h3>
                                        <p>
                                            our being able to do what we like best, every pleasure is to be welcomed and every pain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 features">
                            <div className="card mb-0 bg-light">
                                <div className="card-body text-center">
                                    <div className="feature">
                                        <h3 className="font-weight-semibold">24/7 Support</h3>
                                        <p>
                                            our being able to do what we like best, every pleasure is to be welcomed and every pain.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*/section*/}
    
            {/* Our Sponsor */}
            <section className="sectionSpace sptb position-relative pattern">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="section-title center-block text-center">
                                <h3 className="text-white position-relative">Testimonials</h3>
                            </div>
                        </div>
                    </div>
        
                    <div className="row g-md-4 g-3">
                        <div className="col-md-8 offset-md-2 col-12">
                            <TestimonialsCarousel testimonialList={testimonialList} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}