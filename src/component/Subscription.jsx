"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Tooltip from './Tooltip.jsx'
import Link from 'next/link'
import AdminFooter from './AdminFooter.jsx'
export default function Subscription({ subscriptionList, totalItems }) {

    const [popup, setPopup] = useState(false);
    const [deleteView, setDeleteview] = useState(-1);
    const [id, setId] = useState(null);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [status1, setStatus1] = useState("");
    const [subscriptionLists, setsubscriptionLists] = useState(subscriptionList);
    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [name, setName] = useState("");
    const [userdata, setUserdata] = useState({ name: "", price: "", subscriptionId: "" })

    const [formValidation, setFormvalidation] = useState({
        subscriptionName: -1,

        price: -1
    })
    const [message, setMessage] = useState(typeof window !== 'undefined' && sessionStorage.getItem('successMsg') ? sessionStorage.getItem('successMsg') : "")


    useEffect(() => {


        if (message !== "") {
            const timer = setTimeout(() => {
                setMessage("");
                sessionStorage.removeItem('successMsg');
            }, 3000);

            return () => clearTimeout(timer);
        }

    }, [])

    const setIndividualdata = (item) => {

        setUserdata({ name: item.subscriptionName, price: item.price, subscriptionId: item.subscriptionId })

        if (item.status === true) {
            setStatus('active')
            setStatus1('active')
        }
        else {
            setStatus('inactive')
            setStatus1('inactive')
        }

    }
    const deleteRecords = async (subscriptionId) => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/createSubscription`, {
            method: "DELETE",
            body: JSON.stringify({ subscriptionId }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const res = await response.json();
        setDeleteview(0);
        if (!res.status) {

            setErrormsg(res.message);

        }
        else {
            sessionStorage.setItem('successMsg', 'Subscription deleted Successfully');
            window.location.href = "/dashboard/subscription/list"
        }

    }

    const openPopup = (menuId) => {

        setDeleteview(1);
        setId(menuId);
        setPopup(true)
    }

    const updateDetails = async (e) => {


        e.preventDefault();
        const subscriptionName = e.target.name.value.trim();
        const price = e.target.price.value.trim();

        const subscriptionId = userdata.subscriptionId;
        let status;
        if (status1 === 'active') {
            status = true;
        }
        else {

            status = false;
        }
        const option = {

            method: 'PUT',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/createSubscription`,
            data: {
                subscriptionName, price, subscriptionId, status
            }
        }

        setLoading(true);
        const response = await axios.request(option);

        if (response.data.status) {
            setLoading(false);
            setSuccess(response.data.message);
        }
    }



    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/createSubscription/?page=${idx}&name=${name}`);
        setName(name);
        const res = await response.json();
        if (res.status) {
            setsubscriptionLists(res.subscriptionlist);
            setButton(Math.ceil(res.totalItems / 10));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/subscription/createSubscription/?page=${idx}&name=${name}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setsubscriptionLists(res.subscriptionlist);
                setButton(Math.ceil(res.totalItems / 10));
            }

        }


    }


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">

                    {

                        message !== "" && <Tooltip message={message} />
                    }

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                                <h4 className="mb-sm-0">Subscriptions List</h4>

                            </div>
                        </div>
                    </div>

                    <div className="row"><div className="col-lg-12"><div className="card" id="invoiceList">



                        <div className="card-body"><form><div className="row g-4 mb-3">

                            <div className="col-sm-auto">
                                <div>
                                    <Link href={`/dashboard/subscription/create`} className="btn btn-success"><i className="ri-add-line align-bottom me-1" /> Add New</Link>
                                </div>
                            </div>

                            <div className="col-sm">
                                <div className="d-flex justify-content-sm-end">
                                    <div className="search-box ms-2">
                                        <input type="text" className="form-control search" placeholder="Search..." onChange={(e) => searching(idx, e.target.value)} />
                                        <i className="ri-search-line search-icon" />
                                    </div>
                                </div>
                            </div>
                        </div></form></div>

                        <div className="card-body"><div><div className="table-responsive table-card"><table className="table align-middle table-nowrap" id="invoiceTable"><thead className="text-muted"><tr><th className=" text-uppercase" data-sort="invoice_id">ID</th><th className=" text-uppercase" data-sort="invoice_id">Subscription Name</th><th className="text-uppercase" data-sort="customer_name">Type</th><th className="text-uppercase" data-sort="customer_name">Duration</th><th className=" text-uppercase" data-sort="country">Price</th><th className=" text-uppercase" data-sort="status">Status</th><th className=" text-uppercase" data-sort="action">Action</th></tr></thead>

                            {subscriptionLists.length > 0 && subscriptionLists.map((item, i) => <tbody key={item.subscriptionId} className="list form-check-all"><tr><td className="customer_name"><div className="d-flex align-items-center">{item.subscriptionId} </div></td><td className="id"><a href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" data-id={25000351} className="fw-medium link-primary">{item.subscriptionName} </a></td><td className="country">{item.subscriptionType}</td><td className="customer_name"><div className="d-flex align-items-center">{item.duration} </div></td><td className="country">{item.price}</td><td className="status"><span className={item.status ? "badge bg-success-subtle text-success text-uppercase" : "badge bg-warning-subtle text-warning text-uppercase"}>{item.status ? 'active' : 'inactive'}</span></td>
                                <td>
                                    <div class="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-success edit-item-btn"
                                            data-bs-toggle="modal"
                                            data-bs-target="#showModal"
                                            onClick={() => setIndividualdata(item)}
                                        >
                                            Edit
                                        </button>
                                        <div class="remove">
                                            <button class="btn btn-sm btn-danger remove-item-btn" onClick={() => openPopup(item.subscriptionId)}>Remove</button>
                                        </div>
                                    </div>
                                </td></tr>



                            </tbody>)}

                        </table><div className="noresult" style={{ display: button > 0 && "none" }}><div className="text-center"><lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ "width": "75px", "height": "75px" }} /><h5 className="mt-2">Sorry! No Result Found</h5></div></div></div>
                            <div className="d-flex justify-content-end mt-3">

                                {button > 0 && <div className="pagination-wrap hstack gap-2" style={{ "display": "flex" }}>

                                    <button className="page-item pagination-prev" onClick={() => pagination(idx - 1)}>Previous</button>

                                    <ul className="pagination listjs-pagination mb-0">

                                        {Array.from({ length: button }, (_, i) => <li className="active"><button className="page" key={i} onClick={() => pagination(i + 1)} style={{ backgroundColor: idx === i + 1 && '#ff681a', border: 'none' }}>{i + 1}</button>
                                        </li>)
                                        }


                                    </ul>

                                    <button className="page-item pagination-next" onClick={() => pagination(idx + 1)}>Next</button>


                                </div>}

                            </div>

                        </div><div className="modal fade flip" id="deleteOrder" tabIndex={-1} aria-labelledby="deleteOrderLabel" aria-hidden="true"><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-body p-5 text-center"><lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style={{ "width": "90px", "height": "90px" }} /><div className="mt-4 text-center"><h4>You are about to delete a order ?</h4><p className="text-muted fs-15 mb-4">Deleting your order will remove all of your information from our database.</p><div className="hstack gap-2 justify-content-center remove"><button className="btn btn-link link-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i className="ri-close-line me-1 align-middle" /> Close</button><button className="btn btn-danger" id="delete-record">Yes, Delete It</button></div></div></div></div></div></div></div></div></div></div>

                </div>

            </div>
            <div
                className="modal fade"
                id="showModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-light p-3">
                            <h5 className="modal-title" id="exampleModalLabel" />
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id="close-modal"
                            //  href='/admin/subscription/list'
                            > </button>
                        </div>
                        <form className="tablelist-form" autoComplete="off" onSubmit={updateDetails}>
                            <div className="modal-body">
                                <div className="mb-3" id="modal-id" style={{ display: "none" }}>
                                    <label htmlFor="id-field" className="form-label">
                                        ID
                                    </label>
                                    <input
                                        type="text"
                                        id="id-field"
                                        className="form-control"
                                        placeholder="ID"
                                        readOnly=""
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="customername-field" className="form-label">
                                        Sbscription Name
                                    </label>
                                    <input
                                        type="text"
                                        id="customername-field"
                                        className="form-control"
                                        placeholder="Enter Name"
                                        required=""
                                        name="name"
                                        defaultValue={userdata.name}
                                    />
                                    <div className="invalid-feedback">
                                        Please enter a subscription name.
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label" htmlFor="menu-serial-input">Price</label>
                                    <input type="number" className="form-control" id="menu-serial-input" placeholder="Enter price" name='price' style={{ border: formValidation.price === 0 && '1px solid red' }} defaultValue={userdata.price} />
                                </div>



                                <div>
                                    <label htmlFor="status-field" className="form-label">
                                        Status
                                    </label>


                                    <select className="form-select" onChange={(e) => setStatus1(e.target.value)}  >
                                        <option value={status === 'active' ? 'active' : 'inactive'} >{status === 'active' ? 'active' : 'inactive'}</option>
                                        <option value={status === 'active' ? 'inactive' : 'active'} >{status === 'active' ? 'inactive' : 'active'}</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-light"
                                        data-bs-dismiss="modal"
                                    >
                                        Close
                                    </button>
                                    {
                                        loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><div className="spinner-border text-success" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div> </div> :
                                            <button type="submit" className="btn btn-success" id="add-btn" >
                                                Update
                                            </button>
                                    }
                                    {
                                        success !== "" && <div style={{ color: 'green' }}>{success}</div>
                                    }
                                    {/* <button type="button" class="btn btn-success" id="edit-btn">Update</button> */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <AdminFooter />

            <div
                className={popup ? "modal fade zoomIn show" : "modal fade zoomIn"}
                id="deletetable"
                aria-hidden={!popup && 'true'}
                role={popup && 'dialog'}
                aria-modal={popup && 'true'}
                style={{ display: popup ? 'block' : 'none', backgroundColor: 'rgb(0,0,0,0.5)' }}



            >
                <div className="modal-dialog modal-dialog-centered">
                    {deleteView === 1 && <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="btn-close" aria-label="Close" id="btn-close" onClick={() => setPopup(false)} />
                        </div>
                        <div className="modal-body">
                            <div className="mt-2 text-center">
                                <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#f7b84b,secondary:#f06548" style={{ "width": "100px", "height": "100px" }} />
                                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                    <h4>Are you Sure ?</h4>
                                    <p className="text-muted mx-4 mb-0">Are you Sure You want to Remove this Record ?</p>
                                </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                <button type="button" className="btn w-sm btn-light" onClick={() => setPopup(false)}>Close</button>
                                <button type="button" className="btn w-sm btn-danger " id="delete-record" onClick={() => deleteRecords(id)}>Yes, Delete It!</button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

        </div>
    )
}
