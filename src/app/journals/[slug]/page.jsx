import Link from "next/link";
import Breadcrumb from "../../../app/component/Breadcrumb";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faDirections, faDollar, faEye, faLocationDot, faPhone, faStar, faStarHalf, faUser } from "@fortawesome/free-solid-svg-icons";
import JournalsThumbCarousel from "../../component/JournalsThumbCarousel";
import JournalsDetailsTop from "../../component/JournalsDetailsTop";
import JournalsIndexesThumbCarousel from "../../component/JournalsIndexesThumbCarousel";

export default async function JournalsDetails({ params }) {

    const { slug } = await params;
    let journalList = [];
    let journalDetail = {};
    let journalversion = [];
    let subscriptionsList = [];
    let articlelist=[];

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/journal`, {
            method: 'POST',
            cache: 'no-store',
            body: JSON.stringify({ journalsUrl: `/${slug}` })
        })
        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();
        if (res.status) {
            journalDetail = res.journaldetail;
            journalList = res.journallist
            journalversion=res.journalversion;
            articlelist=res.articlelist;
        }
    } catch (error) {
        console.log("fetching failed", error);
    }

    
    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="Journals Details" />

            {/* Doctor Details*/}
            <section className="sptb journalsDetails">
                <div className="container">
                    <JournalsDetailsTop doctorProfile={journalDetail.journalsAuthor} subscriptionsList={subscriptionsList} journalDetail={journalDetail} articlelist={articlelist}/>
                </div>
            </section>

            {/* Our Sponsor */}
            <section className="sectionSpace sptb bg-f5d4cd">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mainHeading">
                                Related Journals Version
                                <Link href="/doctor-profile">See all</Link>
                            </h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <JournalsIndexesThumbCarousel journalList={journalversion} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Sponsor */}
            <section className="sectionSpace sptb bg-white">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4 className="mainHeading">
                                Our Related Journals
                                <Link href="/doctor-profile">See all</Link>
                            </h4>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <JournalsThumbCarousel journalList={journalList} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}