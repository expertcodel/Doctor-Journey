"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumb from "../component/Breadcrumb";
import Select2Component from "../component/Select2Component";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BuyNow({ countrylist }) {

    const [journalData, setjournaldata] = useState(typeof (window) !== 'undefined' && sessionStorage.getItem('journalDetail') && JSON.parse(sessionStorage.getItem('journalDetail')))
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [message, setMessage] = useState({ name: "", number: "", email: "", city: "", country: "", zip: "", address: "" })

    useEffect(() => {



        if (!sessionStorage.getItem('journalDetail')) {
            router.push('/journals');
        }


    }, [])


    const handleKeyDown = (e) => {
        const allowedKeys = [
            'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'
        ];
        // Prevent non-digit keys
        if (!/\d/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };
    const phoneValidator = (inputtxt) => {

        let phoneno = /^\d{10}$/;
        if (inputtxt.match(phoneno)) {
            return true;
        }
        else {

            return false;
        }


    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const submitFormData = async (e) => {

        e.preventDefault();
        const name = e.target.name.value.trim();
        const email = e.target.email.value.trim();
        const number = e.target.number.value.trim();
        const city = e.target.city.value.trim();
        const country = e.target.country.value.trim();
        const zip = e.target.zip.value.trim();
        const address = e.target.address.value.trim();
        const updateMessage = { ...message };
        let flag = true;
        if (name === "") {

            updateMessage['name'] = 'The name field is required.'
            flag = false;
        }
        else {

            updateMessage['name'] = ""
        }

        if (number === "") {

            updateMessage['number'] = "This field can't be blank";
            flag = false;
        }
        else {

            if (!phoneValidator(number)) {

                updateMessage['number'] = "Number must be of 10 digit";
                flag = false;
            }
            else {

                updateMessage['number'] = "";
            }

        }

        if (email === "") {

            updateMessage['email'] = "This field can't be blank";
            flag = false;
        }
        else {

            if (!validateEmail(email)) {

                updateMessage['email'] = "Please fill valid email";
                flag = false;
            }
            else {

                updateMessage['email'] = "";
            }

        }



        if (city === "") {

            updateMessage['city'] = 'The city name field is required.'
            flag = false;
        }
        else {

            updateMessage['city'] = ""
        }

        if (country === "") {

            updateMessage['country'] = 'The country name field is required.'
            flag = false;
        }
        else {

            updateMessage['country'] = ""
        }

        if (zip === "") {

            updateMessage['zip'] = 'The postal code field is required.'
            flag = false;
        }
        else {

            updateMessage['zip'] = ""
        }


        if (address === "") {

            updateMessage['address'] = 'The full postal address field is required.'
            flag = false;
        }
        else {

            updateMessage['address'] = ""
        }




        setMessage(updateMessage);
        if (flag) {

            const data = {
                name, number, email, address, city, zip, country, amount: journalData.price, plans: journalData.checkPlans, journal_id: journalData.journal_id, path: '/register-journal'
            }
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/create-order`, { method: 'POST', body: JSON.stringify(data) })
            const order = await response.json();
            setLoading(false);



            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "doctorsjourney.in",
                description: "journal Payment",
                order_id: order.order.id,
                handler: async function (response) {
                    // Successful payment
                    await fetch("/api/payment/verify", {
                        method: "POST",
                        body: JSON.stringify({
                            ...response,
                            id: order.id,      // registration ID
                            path: "/register-journal"  // or your context path
                        }),
                    });

                    sessionStorage.removeItem('journalDetail');
                    document.cookie = "statusKey=" + response.razorpay_signature + "; path=/";
                    router.push(`/success/?token=${response.razorpay_signature}`);
                },
                modal: {
                    // 👇 Handle payment cancel/close
                    ondismiss: function () {

                        sessionStorage.removeItem('journalDetail');
                        document.cookie = "statusKey=" + `AFsdfdx636378hHYDYU4747^^gdhdjvdbhbsc` + "; path=/";
                        router.push(`/failed/?token=AFsdfdx636378hHYDYU4747^^gdhdjvdbhbsc`)
                    },
                },
                prefill: {
                    name: name,
                    email: email,
                    contact: number,
                },
                theme: {
                    color: "#3399cc",
                },
            };

            if (!order.status) {

                router.push(`/failed/?token=AFsdfdx636378hHYDYU4747^^gdhdjvdbhbsc`)
            }
            else {
                const razorpay = new window.Razorpay(options);
                razorpay.open();
            }


        }



    }

    return (
        <>
            {/*Breadcrumb*/}
            <Breadcrumb title="Buy Now" />

            <div className="sptb-1 bg-white">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-lg-4 col-md-12">
                            <div className="card card-aside">
                                <div className="card-body ">
                                    <div className="card-item d-flex">
                                        <h4 className="m-0">{journalData.journal_name}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="card card-aside">
                                <div className="card-body ">
                                    <div className="card-item d-flex">
                                        <h4 className="m-0">Price: <span className="font-weight-bold">₹ {journalData.price}</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="card card-aside">
                                <div className="card-body ">
                                    <div className="card-item d-flex">
                                        <h4 className="m-0">
                                            Indexing: <span className="font-weight-bold">{journalData.volume}</span>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3 className="widget-title fs-16">Register For Journals</h3>
                    <hr className="widget-hr" />

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={submitFormData}>
                                        <div className="row">
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Full Name</label>
                                                    <input type="text" className={message.name !== "" ? "form-control border-danger" : "form-control"} placeholder="" name="name" />
                                                    <span className="text-danger">{message.name !== "" && message.name}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="email" className={message.email !== "" ? "form-control border-danger" : "form-control"} placeholder="Email Address" required="" name="email" />
                                                    <span className="text-danger">{message.email !== "" && message.email}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3 mb-0">
                                                    <label className="form-label">Phone Number</label>
                                                    <input type="number" className={message.number !== "" ? "form-control border-danger" : "form-control"} placeholder="Number" required="" name="number" />
                                                    <span className="text-danger">{message.number !== "" && message.number}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12">
                                                <div className="mb-3 mb-0">
                                                    <label className="form-label text-dark">Address</label>
                                                    <textarea className={message.address !== "" ? "form-control border-danger" : "form-control"} name="address" rows={3} placeholder="text here.." required="" defaultValue={""} />
                                                    <span className="text-danger">{message.address !== "" && message.address}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">City</label>
                                                    <input type="text" className={message.city !== "" ? "form-control border-danger" : "form-control"} placeholder="City" name="city" />
                                                    <span className="text-danger">{message.city !== "" && message.city}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Postal Code</label>
                                                    <input type="number" className={message.zip !== "" ? "form-control border-danger" : "form-control"} placeholder="ZIP Code" name="zip" />
                                                    <span className="text-danger">{message.zip !== "" && message.zip}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="mb-3">
                                                    <label className="form-label">Country</label>
                                                    <Select2Component id="select5"
                                                        options={

                                                            countrylist.map((country, i) => { return { value: i + 1, label: country.name } })

                                                        }
                                                        select2Options={{ placeholder: "Select category", allowClear: true }}
                                                        showSearch={true} country={message.country} />
                                                    <span className="text-danger">{message.country !== "" && message.country}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-3 d-flex justify-content-center">
                                                <button type="submit" className="btn btn-primary">
                                                    {loading ? <div className="spinner-border text-white" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div> : <>  Proceed to Checkout <FontAwesomeIcon icon={faAngleRight} /></>}

                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}