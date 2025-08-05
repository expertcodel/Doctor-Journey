import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <>
        {/* Thank you */}
        <section className="sectionSpace thankyouPage bg-fef8ef">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="content">
                            <div className="wrapper-1">
                                <div className="wrapper-2">
                                    <h1>Thank y<span><FontAwesomeIcon icon={faThumbsUp} className="bounceIcon" /></span>u !</h1>
                                    <h4>Awesome! Your registration is complete.</h4>
                                    <p>
                                        While our Customer Success team will reach out to you over email/phone.
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