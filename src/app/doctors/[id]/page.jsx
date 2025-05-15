import doctorCards from "@/data/doctorCards.json";
import { faCalendar, faComment, faEye, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function DoctorDetail({ params }) {
    const doctor = doctorCards.find((d) => d.id === params.id);

    const uniqueItemsByTitle = Array.from(
        doctorCards.reduce((map, item) => {
            if (!map.has(item.title)) {
                map.set(item.title, item); // Store the full object (not just title)
            }
            return map;
        }, new Map()).values()
    );    

    const getTitleCounts = (data) => {
        const counts = {};
        data.forEach(item => {
            counts[item.title] = (counts[item.title] || 0) + 1;
        });
        return counts;
    };
    const titleCounts = getTitleCounts(doctorCards);

    if (!doctor) return <div>Doctor not found</div>;

    return (
        <>
            {/*Breadcrumb*/}
            <section>
                <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
                    <div className="header-text mb-0">
                        <div className="container">
                            <div className="text-center text-white">
                                <h1 className="">{doctor.title}</h1>
                                <ol className="breadcrumb text-center">
                                    <li className="breadcrumb-item">
                                        <Link href="/doctors">Doctors</Link>
                                    </li>
                                    <li className="breadcrumb-item active text-white" aria-current="page">
                                        {doctor.title}
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*Breadcrumb*/}

            {/* Doctor Details*/}
            <section className="sptb">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12">
                            {/*articalDetails*/}
                            <div className="card articalDetails">
                                <div className="card-body">
                                    <div className="item7-card-img">
                                        <Image src={doctor.image} alt={doctor.title} width={786} height={485} />
                                        <div className="play-button">
                                            <span className="triangle"></span>
                                        </div>
                                        <div className="item7-card-text">
                                            <span className="badge bg-pink">{doctor.title}</span>
                                        </div>
                                    </div>
                                    <div className="item7-card-desc d-flex mb-2 mt-3">
                                        <span>
                                            <FontAwesomeIcon icon={faCalendar} /> {doctor.time}
                                        </span>
                                        <span>
                                            <FontAwesomeIcon icon={faUser} /> {doctor.author}
                                        </span>
                                        <div className="ms-auto">
                                            <span className="me-0">
                                                <FontAwesomeIcon icon={faEye} />{doctor.views}
                                            </span>
                                        </div>
                                    </div>
                                    <h2 className="font-weight-semibold">
                                        {doctor.title2}
                                    </h2>
                                    {
                                        doctor.description.map((item, idx) => (
                                            <p key={idx}>
                                                {item}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* doctor profile */}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">About the speaker</h3>
                                </div>
                                <div className="card-body drProfileDesc p-0">
                                    <div className="card mb-0">
                                        <div className="card-body">
                                            <div className="cat-item">
                                                <Link href="/" />
                                                <div className="cat-img bg-primary-transparent brround">
                                                    <Image src="/images/doctor-profile/profile-1.jpg" className="img-fluid" width={155} height={80} alt="img" />
                                                </div>
                                                <div className="cat-desc">
                                                    <h5>
                                                    Lorem Ipsum <span>MBBS</span>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="cat-item">
                                                <Link href="/" />
                                                <div className="cat-desc">
                                                    <p>
                                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.  
                                                    </p>
                                                    <small className="badge">
                                                        See Speaker Profile 
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Rightside Content*/}
                        <div className="col-xl-4 col-lg-4 col-md-12">
                            <div className="card interviewCard">
                                <div className="card-header">
                                    <h3 className="card-title">Watch Next Interview</h3>
                                </div>
                                {
                                    uniqueItemsByTitle.map((item, index) => (
                                        <div key={index} className="card-body">
                                            <Link href="/" />
                                            <div className="interviewCardBody">
                                                <figure>
                                                    <Image src={item.image} alt={item.title} width={96} height={80} />
                                                    <div className="play-button">
                                                        <span className="triangle"></span>
                                                    </div>
                                                </figure>
                                                <div className="interviewCardDetails">
                                                    <h5>
                                                        {item.title2}
                                                    </h5>
                                                    <p>
                                                        <span>{item.views}</span>
                                                        <span>{item.time}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Specialization</h3>
                                </div>
                                <div className="card-body p-0">
                                    <div className="list-catergory">
                                        <div className="item-list">
                                            <ul className="list-group mb-0 customSpecialization">
                                                {
                                                    uniqueItemsByTitle.map((item, id) => (
                                                        <li key={id} className="list-group-item">
                                                            <Link href="/" className="text-dark">
                                                                <span className="specializationIcon">
                                                                    <Image src="/images/doctor-profile/profile-1.jpg" className="img-fluid" width={155} height={80} alt="img" />
                                                                </span> {item.title}
                                                                <span className="badgetext badge rounded-pill bg-light mb-0 mt-1">
                                                                    {titleCounts[item.title]}
                                                                </span>
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
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