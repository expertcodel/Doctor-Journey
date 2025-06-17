"use client"
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import AdminFooter from '../../../../component/AdminFooter.jsx'
import { useRouter } from 'next/navigation';
export default function Page() {


    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [formValidation, setFormvalidation] = useState({
        subscriptionName: -1,
        subscriptionType: -1,
        price: -1
    })

    const createMenu = async (e) => {

        e.preventDefault();
        let arr = [1, 1, 1, 1];
        let flag = true;
        const subscriptionName = e.target.subscriptionName.value.trim();
        const subscriptionType = JSON.parse(e.target.subscriptionType.value).type.trim();
        const duration = JSON.parse(e.target.subscriptionType.value).duration.trim();
        const price = e.target.price.value.trim();

        if (subscriptionName === "") {
            arr[0] = 0;
            flag = false;
        }

        if (subscriptionType === "" || subscriptionType === "select") {
            arr[1] = 0;
            flag = false;

        }

        if (duration === "" || duration === "select") {
            arr[1] = 0;
            flag = false;

        }

        if (price === "" || price <= 0) {
            arr[2] = 0;
            flag = false;

        }


        if (flag) {

            setFormvalidation({
                subscriptionName: arr[0],
                subscriptionType: arr[1],
                price: arr[2]
            });
            const option = {
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/createSubscription`,
                data: {
                    subscriptionName,
                    duration,
                    subscriptionType,
                    price
                },

            }



            const response = await axios.request(option);
            if (response.data.status) {

                sessionStorage.setItem('successMsg', 'Subscription Created Successfully');
                router.push("/dashboard/subscription/list");
            }
            else {
                setErrormsg(response.data.message);
            }

        }
        else {

            setFormvalidation({
                subscriptionName: arr[0],
                subscriptionType: arr[1],
                price: arr[2]
            });

        }






    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    {/* start page title */}
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0">Create Subscription</h4>

                            </div>
                        </div>
                    </div>
                    {/* end page title */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-body">
                                    <form onSubmit={createMenu}>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-title-input">Subscription Title</label>
                                            <input type="text" className="form-control" id="menu-title-input" placeholder="Enter subscription title" name='subscriptionName' style={{ border: formValidation.subscriptionName === 0 && '1px solid red' }} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-serial-input">Price</label>
                                            <input type="number" className="form-control" id="menu-serial-input" placeholder="Enter price" name='price' style={{ border: formValidation.price === 0 && '1px solid red' }} />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-serial-input">Subscription Type</label>
                                            <select name="subscriptionType" className="form-control" style={{ border: formValidation.subscriptionType === 0 && '1px solid red' }} >

                                                <option value={JSON.stringify({ duration: "select", type: "select" })} >Select</option>
                                                <option value={JSON.stringify({ duration: "30 days", type: "Monthly" })} >Standard</option>
                                                <option value={JSON.stringify({ duration: "90 days", type: "Quaterly" })} >Business</option>
                                                <option value={JSON.stringify({ duration: "365 days", type: "Yearly" })} >Premium</option>



                                            </select>
                                        </div>

                                        {/* <div className="mb-3">
                                            <label className="form-label" htmlFor="menu-serial-input">End Date</label>
                                            <input type="date" className="form-control" id="menu-serial-input" placeholder="Enter price" name='endDate' style={{ border: formValidation.endDate === 0 && '1px solid red' }} />
                                        </div> */}



                                        <div className="text-end mb-4">

                                            <button type="submit" className="btn btn-success w-sm">Create</button>
                                        </div>
                                        {
                                            errorMsg !== "" && <div style={{ color: 'red' }}>{errorMsg}</div>
                                        }
                                    </form>
                                </div>
                                {/* end card body */}
                            </div>
                            {/* end card */}

                            {/* end card */}

                        </div>
                        {/* end col */}

                        {/* end col */}
                    </div>
                    {/* end row */}
                </div>
                {/* container-fluid */}
            </div>
            {/* End Page-content */}

            <AdminFooter />
        </div>
    )
}
