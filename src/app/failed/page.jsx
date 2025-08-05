// import { faFaceSadCry } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function FailedPage() {
  return (
    <>
        {/* Thank you */}
        <section className="sectionSpace thankyouPage bg-fef8ef">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content">
                            <div className="wrapper-1">
                                <div className="wrapper-2 failedContent">
                                    {/* <h1>F<span><FontAwesomeIcon icon={faFaceSadCry} className="bounceIcon" /></span>iled</h1> */}
                                    <h4>Sad! Your registration is incomplete.</h4>
                                    <p>
                                        You can try again or contact us for more information.
                                    </p>
                                    <Link href="/" className="btn default-btn">
                                        Continue <span />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}