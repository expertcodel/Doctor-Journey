"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumb from "../component/Breadcrumb";
import Select2Component from "../component/Select2Component";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
export default function BuyNow({ countrylist, journaldata }) {

    const { user } = useAuth()
    const [loading, setLoading] = useState(false);
    const [errMsg,setErrmsg]=useState("");
    const router = useRouter()
    const [message, setMessage] = useState({ name: "", number: "", email: "", city: "", country: "", zip: "", address: "" })
    const [validation, setValidation] = useState({ name: user ? true : false, number: user ? true : false, email: user ? true : false, city: user ? true : false, country: user ? true : false, zip: user ? true : false, address: user ? true : false });
    const [data, setData] = useState({ name: user?.name, number: user?.mobile_number, email: user?.email, city: user?.city, country: user?.country, zip: user?.zip, address: user?.address });

    useEffect(() => {

        setValidation({ name: user ? true : false, number: user ? true : false, email: user ? true : false, city: user ? true : false, country: user ? true : false, zip: user ? true : false, address: user ? true : false })
        setData({ name: user?.name, number: user?.mobile_number, email: user?.email, city: user?.city, country: user?.country, zip: user?.zip, address: user?.address })

    }, [user])

    const handleChange = (e) => {

        const { name, value } = e.target;
        const updatedData = { ...data };
        updatedData[name] = value;
        const updateValidation = { ...validation };
        const updateMessage = { ...message };
        if (name === 'email') {

            if (value === "") {

                updateValidation['email'] = false;
                updateMessage['email'] = "This field can't be blank";
            }
            else {

                if (!validateEmail(value)) {

                    updateValidation['email'] = false;
                    updateMessage['email'] = "Please Enter valid email";

                }
                else {

                    updateValidation['email'] = true;
                    updateMessage['email'] = "";
                }

            }

        }
        else if (name === 'number') {

            if (value === "") {

                updateValidation['number'] = false;
                updateMessage['number'] = "This field can't be blank";

            }
            else {

                if (!phoneValidator(value)) {

                    updateValidation['number'] = false;
                    updateMessage['number'] = "Number must be of 10 digit"

                }
                else {

                    updateMessage['number'] = "";
                    updateValidation['number'] = true;
                }

            }

        }
        else if (name === 'name') {

            if (value === "") {

                updateMessage['name'] = 'The name field is required.'
                updateValidation['name'] = false;

            }
            else {

                updateMessage['name'] = ""
                updateValidation['name'] = true;
            }

        }
        else if (name === 'address') {

            if (value === "") {

                updateMessage['address'] = 'The address field is required.'
                updateValidation['address'] = false;
            }
            else {

                updateMessage['address'] = ""
                updateValidation['address'] = true;
            }

        }
        else if (name === 'city') {

            if (value === "") {

                updateMessage['city'] = 'The city field is required.'
                updateValidation['city'] = false;
            }
            else {

                updateMessage['city'] = ""
                updateValidation['city'] = true;
            }


        }
        else if (name === 'zip') {

            if (value === "") {

                updateMessage['zip'] = 'The post code field is required.'
                updateValidation['zip'] = false;
            }
            else {

                updateMessage['zip'] = ""
                updateValidation['zip'] = true;
            }


        }
        else {

            if (value === "" || value === "select") {

                updateMessage['country'] = 'The country field is required.'
                updateValidation['country'] = false;
            }
            else {

                updateMessage['country'] = ""
                updateValidation['country'] = true;
            }
        }

        setValidation(updateValidation);
        setMessage(updateMessage);
        setData(updatedData);
    }




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
        const name = validation.name;
        const email = validation.email;
        const number = validation.number;
        const city = validation.city;
        const country = validation.country;
        const zip = validation.zip;
        const address = validation.address;
        const updateMessage = { ...message };
        let flag = true;
        if (!name) {

            updateMessage['name'] = 'The name field is required.'
            flag = false;
        }
        else {

            updateMessage['name'] = ""
        }

        if (!number) {

            updateMessage['number'] = "This number field is required.";
            flag = false;
        }
        else {
            updateMessage['number'] = "";
        }

        if (!email) {

            updateMessage['email'] = "This email field is required.";
            flag = false;
        }
        else {
            updateMessage['email'] = "";
        }



        if (!city) {

            updateMessage['city'] = 'The city name field is required.'
            flag = false;
        }
        else {

            updateMessage['city'] = ""
        }

        if (!country) {

            updateMessage['country'] = 'The country name field is required.'
            flag = false;
        }
        else {

            updateMessage['country'] = ""
        }

        if (!zip) {

            updateMessage['zip'] = 'The postal code field is required.'
            flag = false;
        }
        else {

            updateMessage['zip'] = ""
        }


        if (!address) {

            updateMessage['address'] = 'The address field is required.'
            flag = false;
        }
        else {

            updateMessage['address'] = ""
        }

        setMessage(updateMessage);
        if (flag) {

            const data1 = {
                name: data.name, number: data.number, email: data.email, address: data.address, city: data.city, zip: data.zip, country: data.country, path: '/register-journal', amount: journaldata.amount, id: journaldata.id, userId: user?.userId
            }
            setLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/create-order`, { method: 'POST', body: JSON.stringify(data1) })
            const order = await response.json();
            setLoading(false);



            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order?.amount,
                currency: "INR",
                name: "doctorsjourney.in",
                description: "journal Payment",
                order_id: order?.order?.id,
                handler: async function (response) {
                    // Successful payment
                    const res = await fetch("/api/payment/verify", {
                        method: "POST",
                        body: JSON.stringify({
                            ...response,
                            id: order?.id,      // registration ID
                            path: "/register-journal",  // or your context path
                            userId: user?.userId
                        }),
                    });

                    const status = await res.json();
                    if (status.status) {
                        
                        document.cookie = "statusKey=" + response.razorpay_signature + "; path=/";
                        router.push(`/success/?token=${response.razorpay_signature}`);
                    }
                    else {
                        
                        document.cookie = "statusKey=" + `AFsdfdx636378hHYDYU4747^^gdhdjvdbhbsc` + "; path=/";
                        router.push(`/failed/?token=AFsdfdx636378hHYDYU4747^^gdhdjvdbhbsc`)
                    }
                },
                modal: {
                    // 👇 Handle payment cancel/close
                    ondismiss: function () {
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

                setErrmsg(order.message);
                console.log(order.message,'jkk');
                
                setTimeout(() => {
                    setErrmsg("");
                }, 3000);
                
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
                                        <h4 className="m-0">{journaldata?.journal_name}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="card card-aside">
                                <div className="card-body ">
                                    <div className="card-item d-flex">
                                        <h4 className="m-0">Price: <span className="font-weight-bold">₹ {journaldata?.amount}</span></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="card card-aside">
                                <div className="card-body ">
                                    <div className="card-item d-flex">
                                        <h4 className="m-0">
                                            Indexing: <span className="font-weight-bold">{journaldata?.volume}</span>
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
                                                    <input type="text" className={message.name !== "" ? "form-control border-danger" : "form-control"} placeholder="Name" name="name" onChange={(e) => handleChange(e)} value={data.name} />
                                                    <span className="text-danger">{message.name !== "" && message.name}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type="text" className={message.email !== "" ? "form-control border-danger" : "form-control"} placeholder="Email Address" name="email" onChange={(e) => handleChange(e)} value={data.email} />
                                                    <span className="text-danger">{message.email !== "" && message.email}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3 mb-0">
                                                    <label className="form-label">Phone Number</label>
                                                    <input type="text" className={message.number !== "" ? "form-control border-danger" : "form-control"} placeholder="Number" name="number" onChange={(e) => handleChange(e)} value={data.number} onKeyDown={handleKeyDown} maxLength={10} />
                                                    <span className="text-danger">{message.number !== "" && message.number}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-12 col-md-12">
                                                <div className="mb-3 mb-0">
                                                    <label className="form-label text-dark">Address</label>
                                                    <textarea className={message.address !== "" ? "form-control border-danger" : "form-control"} name="address" rows={3} placeholder="text here.." onChange={(e) => handleChange(e)} value={data.address} />
                                                    <span className="text-danger">{message.address !== "" && message.address}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-4">
                                                <div className="mb-3">
                                                    <label className="form-label">City</label>
                                                    <input type="text" className={message.city !== "" ? "form-control border-danger" : "form-control"} placeholder="City" name="city" onChange={(e) => handleChange(e)} value={data.city} />
                                                    <span className="text-danger">{message.city !== "" && message.city}</span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-md-3">
                                                <div className="mb-3">
                                                    <label className="form-label">Postal Code</label>
                                                    <input type="text" className={message.zip !== "" ? "form-control border-danger" : "form-control"} placeholder="ZIP Code" name="zip" onChange={(e) => handleChange(e)} value={data.zip} onKeyDown={handleKeyDown} />
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
                                                        select2Options={{ placeholder: user ? user?.country : "Select category", allowClear: true }}
                                                        showSearch={true} setValidation={setValidation} setMessage={setMessage} validation={validation} message={message} data={data} setData={setData} />
                                                    <span className="text-danger">{message.country !== "" && message.country}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-12 mt-3 d-flex justify-content-center">
                                                <button type="submit" className="btn btn-primary btn-lg">
                                                    {loading ? <div className="spinner-border text-white" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div> : <>  Proceed to Checkout <FontAwesomeIcon icon={faAngleRight} /></>}
                                                </button>
                                            </div>
                                            <div className="col-12 text-center mt-3">
                                                <div className="text-danger">{errMsg!=="" && errMsg}</div>
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