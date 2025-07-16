import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import EventDetailsSticky from "../../component/EventDetailsSticky";

const ScheduleTabs = [
  { id: 'tab-1', label: 'First Day', date: '16 July, 2025' },
  { id: 'tab-2', label: 'Second Day', date: '17 July, 2025' },
  { id: 'tab-3', label: 'Third Day', date: '18 July, 2025' },
  { id: 'tab-4', label: 'Fourth Day', date: '19 July, 2025' },
];

// Predefined bootstrap background classes
const bgClasses = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning', 'bg-info', 'bg-secondary'];

function getRandomBgClass() {
  const randomIndex = Math.floor(Math.random() * bgClasses.length);
  return bgClasses[randomIndex];
}
export default function EventsDetails() {
    // Randomize once per render using useMemo (optional but recommended)
    const randomizedTabs = useMemo(() => {
        return ScheduleTabs.map(tab => ({
        ...tab,
        bgClass: getRandomBgClass()
        }));
    }, []);

    return (
        <>
            <EventDetailsSticky />

            {/*Schedule*/}
            <section className="banner-1 cover-image sptb bg-background2">
                <div className="container position-relative">
                    <div className="section-title center-block text-center text-white">
                        <h2>Program Schedule</h2>
                        <p>
                            Program Schedule
                        </p>
                    </div>
                    <div className="item-all-cat customScheduleTabs">
                        <div className="wideget-user-tab">
                            <div className="tab-menu-heading">
                                <div className="tabs-menu1">
                                    <ul className="nav">
                                        {randomizedTabs.map((tab, index) => (
                                            <li key={tab.id}>
                                                <Link
                                                href={`#${tab.id}`}
                                                data-bs-toggle="tab"
                                                className={`nav-link text-white ${tab.bgClass} ${index === 0 ? 'active' : ''}`}
                                                >
                                                    {tab.label} <span className="d-block small">{tab.date}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card customScheduleTabsOpen mb-lg-0 border-0">
                            <div className="card-body">
                                <div className="border-0">
                                    <div className="tab-content">
                                        <div className="tab-pane userprof-tab active" id="tab-1">
                                            <div className="row">
                                                {Array.from({ length: 7 }).map((_, index) => (
                                                    <div className="col-lg-6 col-12">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="profile-pic mb-0">
                                                                    <div className="d-flex">
                                                                        <figure>
                                                                            <Image src="/images/users/male/13.jpg" width={100} height={100} className="w100 h-100 brround" alt="user" />
                                                                        </figure>
                                                                        <div className="ms-4">
                                                                            <h4 className="mt-3 mb-2 font-weight-bold">Early Meal</h4>
                                                                            <span>
                                                                                <mark>08:00 <em>AM</em> - 10:00 <em>AM</em></mark>
                                                                            </span>
                                                                            <div className="mt-2 profile-details">
                                                                                <span className="">
                                                                                    Importance of Forensic in the Appreciation of Evidence | Auditorium
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="tab-2">
                                            <div className="row">
                                                {Array.from({ length: 8 }).map((_, index) => (
                                                    <div className="col-lg-6 col-12">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="profile-pic mb-0">
                                                                    <div className="d-md-flex">
                                                                        <figure>
                                                                            <Image src="/images/users/male/13.jpg" width={100} height={100} className="w100 h-100 brround" alt="user" />
                                                                        </figure>
                                                                        <div className="ms-4">
                                                                            <h4 className="mt-3 mb-2 font-weight-bold">Early Meal</h4>
                                                                            <span>
                                                                                <mark>08:00 <em>AM</em> - 10:00 <em>AM</em></mark>
                                                                            </span>
                                                                            <div className="mt-2 profile-details">
                                                                                <span className="">
                                                                                    Importance of Forensic in the Appreciation of Evidence | Auditorium
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="tab-pane userprof-tab" id="tab-3">
                                            <div className="row">
                                                {Array.from({ length: 6 }).map((_, index) => (
                                                    <div className="col-lg-6 col-12">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="profile-pic mb-0">
                                                                    <div className="d-md-flex">
                                                                        <figure>
                                                                            <Image src="/images/users/male/13.jpg" width={100} height={100} className="w100 h-100 brround" alt="user" />
                                                                        </figure>
                                                                        <div className="ms-4">
                                                                            <h4 className="mt-3 mb-2 font-weight-bold">Early Meal</h4>
                                                                            <span>
                                                                                <mark>08:00 <em>AM</em> - 10:00 <em>AM</em></mark>
                                                                            </span>
                                                                            <div className="mt-2 profile-details">
                                                                                <span className="">
                                                                                    Importance of Forensic in the Appreciation of Evidence | Auditorium
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="tab-pane userprof-tab" id="tab-4">
                                            <div className="row">
                                                {Array.from({ length: 4 }).map((_, index) => (
                                                    <div className="col-lg-6 col-12">
                                                        <div className="card">
                                                            <div className="card-body">
                                                                <div className="profile-pic mb-0">
                                                                    <div className="d-md-flex">
                                                                        <figure>
                                                                            <Image src="/images/users/male/13.jpg" width={100} height={100} className="w100 h-100 brround" alt="user" />
                                                                        </figure>
                                                                        <div className="ms-4">
                                                                            <h4 className="mt-3 mb-2 font-weight-bold">Early Meal</h4>
                                                                            <span>
                                                                                <mark>08:00 <em>AM</em> - 10:00 <em>AM</em></mark>
                                                                            </span>
                                                                            <div className="mt-2 profile-details">
                                                                                <span className="">
                                                                                    Importance of Forensic in the Appreciation of Evidence | Auditorium
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-center flex-wrap">
                                <a class="btn btn-primary me-md-2 mb-2 mb-md-0" href="/">Download Schedule (PDF)</a>
                                <a class="btn btn-info" href="/">Contact VIA Facebook</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*/Schedule*/}

            <section className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                        <div className="venueContentBox">
                            <h4>
                                Venue <span>Here’s the venue where you have to reach for Learning</span>
                            </h4>
                            <h5>
                                Vallabhbhai Patel Chest Institute, New Delhi 
                                <span>To attend Offline International Conference on Forensic Science 2026</span>
                            </h5>
                            <ul className="list-unstyled">
                                <li>
                                    <span>Email <em>:</em></span> abcd@gmail.com
                                </li>
                                <li>
                                    <span>Phone <em>:</em></span> +91 9898989898
                                </li>
                                <li>
                                    <span>Offline <em>:</em></span> University of Delhi, University Enclave, Delhi - 110007
                                </li>
                                <li>
                                    <span>Watch <em>:</em></span> www.youtube.com/Forensic365
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-md-6 col-12 p-0">
                        <figure className="m-0">
                            <Image src="/images/heroBanner.jpg" width={4096} height={2731} alt="img" className="img-fluid" />
                        </figure>
                    </div>
                </div>
            </section>

            {/*Verify Certificate*/}
            <section>
                <div className="cover-image sptb bg-background-color" data-image-src="../assets/images/banners/banner4.jpg">
                    <div className="content-text mb-0">
                        <div className="content-text mb-0">
                            <div className="container">
                                <div className="text-center text-white section-title">
                                    <h1 className="mb-2">Verify Certificate</h1>
                                    <p className="fs-16">
                                        Do you have a valid certificate?
                                    </p>
                                    <div className="row">
                                        <div className="col-lg-8 mx-auto d-block">
                                            <div className="mt-5">
                                                <div className="input-group sub-input mt-1">
                                                    <input type="text" className="form-control input-lg " placeholder="Enter your certificate number" />
                                                    <div className="">
                                                        <button type="button" className="btn btn-secondary  btn-lg br-tr-3  br-br-3">
                                                            Validate
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*/Verify Certificate*/}
        </>
    )
}