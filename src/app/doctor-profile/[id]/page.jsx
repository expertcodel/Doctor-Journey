import DoctorProfileGallery from "../../../app/component/DoctorProfileGallery";
import doctorProfile from "@/data/doctorProfile.json";
import { faCalendar, faComment, faEye, faLocation, faUser, faMap, faStar, faChevronRight, faClock, faCheckCircle, faMapMarker, } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import ThumbnailVArticleCarousel from "../../../app/component/ThumbnailVArticleCarousel";
import ThumbnailVDrProfileCarousel from "../../../app/component/ThumbnailVDrProfileCarousel";
import ThumbnailActivityCarousel from "../../../app/component/ThumbnailActivityCarousel";


export default async function DoctorProfileDetail({ params }) {


    const { id } = await params;
    let doctor = {};
    let doctorList=[];
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/doctors`, {

            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ doctorId: id })
        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {
            doctor = res.doctordetail;
            doctorList=res.doctorlist;
        }


    } catch (error) {

        console.log("fetching failed", error);


    }

    return (
        <>
            {/*Breadcrumb*/}
            <section>
                <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">

                </div>
            </section>
            {/*Breadcrumb*/}

            {/* Doctor Details*/}
            <section className="sptb">
                <div className="container">
                    <div className="row">
                        <div className="col-12 customProfileMain mt-nagative">
                            {/* profile section */}
                            <div className="card">
                                <div className="card-body">
                                    <div className="profile-pic mb-0">
                                        <div className="d-md-flex">
                                            <figure>
                                                <Image
                                                    src={doctor.profileImage} width={368} height={190}
                                                    alt="img"
                                                    className="cover-image"
                                                    unoptimized
                                                />
                                            </figure>
                                            <div className="ms-4">
                                                <h4 className="mt-3 mb-1 text-dark font-weight-bold">{doctor.doctorName}</h4>
                                                <span>
                                                    <small className="text-muted">{doctor.qualification}, {doctor.specialization}</small>
                                                </span>
                                                <div className="mt-1 mb-2 profile-details">
                                                    <span className="">
                                                        <FontAwesomeIcon icon={faLocation} /> {doctor.hospital}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 customProfileMain">
                            <div className="wideget-user-tab">
                                <div className="tab-menu-heading">
                                    <div className="tabs-menu1">
                                        <ul className="nav">
                                            <li>
                                                <Link href="#tab-1" data-bs-toggle="tab" className="active">
                                                    Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#tab-2" data-bs-toggle="tab" className="">
                                                    Gallery
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#tab-3" data-bs-toggle="tab" className="">
                                                    Activity
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#tab-4" data-bs-toggle="tab" className="">
                                                    Feedback
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card mb-lg-0 border-0">
                                <div className="card-body">
                                    <div className="border-0">
                                        <div className="tab-content">
                                            <div className="tab-pane userprof-tab active" id="tab-1">
                                                <div className="">
                                                    <div class="media-heading">
                                                        <h3 class="card-title mb-3 font-weight-bold"> Description</h3>
                                                    </div>
                                                    <div className="mb-4">
                                                        <p>
                                                          {doctor.shortDescription}
                                                        </p>
                                                        
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-xl-12 col-md-12">
                                                            <div className="table-responsive">
                                                                <table className="table row table-borderless w-100 m-0">
                                                                    <tbody className="col-lg-12 col-xl-6 p-0">
                                                                        {/* <tr>
                                                                            <td className="px-0 w-150">
                                                                                <span className="font-weight-semibold">Languages</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>:</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>
                                                                                    English, Hindi
                                                                                </span>
                                                                            </td>
                                                                        </tr> */}
                                                                        <tr>
                                                                            <td className="px-0 w-150">
                                                                                <span className="font-weight-semibold">Speciality</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>:</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>
                                                                                    {doctor.specialization}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-0 w-150">
                                                                                <span className="font-weight-semibold">Phone</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>:</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>{doctor.number}</span>
                                                                            </td>
                                                                        </tr>
                                                                          <tr>
                                                                            <td className="px-0 w-150">
                                                                                <span className="font-weight-semibold">City</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>:</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>{doctor.city}</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                    <tbody className="col-lg-12 col-xl-6 p-0">
                                                                        {/* <tr>
                                                                            <td className="px-0 w-150">
                                                                                <span className="font-weight-semibold">
                                                                                    Types Of
                                                                                </span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>:</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>Full time Physician</span>
                                                                            </td>
                                                                        </tr> */}
                                                                        <tr>
                                                                            <td className="px-0 w-150">
                                                                                <span className="font-weight-semibold">
                                                                                    Experience
                                                                                </span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>:</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>{doctor.experience} Years</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-0 w-150">
                                                                                <span className="font-weight-semibold">Email</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>:</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>{doctor.email}</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-0 w-150">
                                                                                <span className="font-weight-semibold">Address</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>:</span>
                                                                            </td>{" "}
                                                                            <td>
                                                                                <span>{doctor.address}</span>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mt-6">
                                                    <div class="media-heading mb-5">
                                                        <h3 class="card-title font-weight-bold">{doctor.doctorName} Articles</h3>
                                                    </div>
                                                    <ThumbnailVArticleCarousel />
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="tab-2">
                                                <div className="card-body p-0">
                                                   {doctor.gallery && <DoctorProfileGallery gallery={doctor.gallery}/>}
                                                </div>
                                            </div>
                                            <div className="tab-pane userprof-tab" id="tab-3">
                                                <div className="row g-md-4 g-3">
                                                    {doctor.videolist[0].views!=='null' && <ThumbnailActivityCarousel doctorCards={doctor.videolist}/>}
                                                </div>
                                            </div>
                                            <div className="tab-pane userprof-tab" id="tab-4">
                                                <div className="card border-0">
                                                    <div className="card-body p-0">
                                                        <div className="media mt-0 p-5">
                                                            <div className="d-flex me-3">
                                                                <a href="javascript:void(0);">
                                                                    <img className="media-object brround" alt="64x64" src="/images/users/male/1.jpg" />{" "}
                                                                </a>
                                                            </div>
                                                            <div className="media-body">
                                                                <h5 className="mt-0 mb-1 font-weight-semibold">
                                                                    Joanne Scott
                                                                    <span
                                                                        className="fs-14 ms-0"
                                                                        data-bs-toggle="tooltip"
                                                                        data-bs-placement="top"
                                                                        title=""
                                                                        data-bs-original-title="verified"
                                                                    >
                                                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success ms-2" />
                                                                    </span>
                                                                    <span className="fs-14 ms-2">
                                                                        {" "}
                                                                        4.5 <FontAwesomeIcon icon={faStar} className="text-yellow" />
                                                                    </span>
                                                                </h5>
                                                                <small className="text-muted">
                                                                    <FontAwesomeIcon icon={faCalendar} /> Dec 21st{" "}
                                                                    <FontAwesomeIcon icon={faClock} /> 13.00{" "}
                                                                    <FontAwesomeIcon icon={faMapMarker} /> Brezil
                                                                </small>
                                                                <p className="font-13  mb-2 mt-2">
                                                                    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="media p-5 border-top mt-0">
                                                            <div className="d-flex me-3">
                                                                <a href="javascript:void(0);">
                                                                    {" "}
                                                                    <img
                                                                        className="media-object brround"
                                                                        alt="64x64"
                                                                        src="/images/users/male/3.jpg"
                                                                    />{" "}
                                                                </a>
                                                            </div>
                                                            <div className="media-body">
                                                                <h5 className="mt-0 mb-1 font-weight-semibold">
                                                                    Joanne Scott
                                                                    <span
                                                                        className="fs-14 ms-0"
                                                                        data-bs-toggle="tooltip"
                                                                        data-bs-placement="top"
                                                                        title=""
                                                                        data-bs-original-title="verified"
                                                                    >
                                                                        <FontAwesomeIcon icon={faCheckCircle} className="text-success ms-2" />
                                                                    </span>
                                                                    <span className="fs-14 ms-2">
                                                                        {" "}
                                                                        4.5 <FontAwesomeIcon icon={faStar} className="text-yellow" />
                                                                    </span>
                                                                </h5>
                                                                <small className="text-muted">
                                                                    <FontAwesomeIcon icon={faCalendar} /> Dec 21st{" "}
                                                                    <FontAwesomeIcon icon={faClock} /> 13.00{" "}
                                                                    <FontAwesomeIcon icon={faMapMarker} /> Brezil
                                                                </small>
                                                                <p className="font-13  mb-2 mt-2">
                                                                    On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* profile section */}
                        </div>

                        {/*Rightside Content*/}
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Popular Profiles</h3>
                                </div>
                                <div className="card-body">
                                    <div className="row g-md-4 g-3">
                                        {/* drShortDesc */}
                                        <ThumbnailVDrProfileCarousel doctorProfile={doctorList}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*/Rightside Content*/}
                    </div>
                </div>
            </section>
        </>
    );
}