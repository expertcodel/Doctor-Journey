"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';



function Page() {

    const [journalList, setJournallist] = useState([]);
    const [searchList, setSearchlist] = useState([]);
    const [message, setMessage] = useState("");
    useEffect(() => {


        const fetching = async () => {

            const option = {

                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getJournal`,
            }

            const response = await axios.request(option);
            setJournallist(response.data.journals);
            setSearchlist(response.data.journals);

        }

        fetching();

    }, [message])

    const approveJournals = async () => {

        const checkbox = Array.from(document.querySelectorAll('.checkbox-input'));
        let arr = [];
        checkbox.map((item, i) => { if (item.checked) { arr.push(journalList[i].journalsId) } })
        // setCheckedjournal(checkbox.map((item,i)=>item.checked && journalList[i].journalsId));
        //console.log(arr);

        try {
            const option = {

                method: 'POST',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/approveJournals`,
                data: {

                    checkedJournal: arr
                }
            }

            const response = await axios.request(option);
            setMessage(response.data.message);
        } catch (error) {

            console.log("error", error);

        }



    }

    const searchArticles = (e) => {

        e.preventDefault();
        if (e.target.value === "") {
            setSearchlist(journalList);
        }
        setSearchlist((prev) => prev.filter((item) => item.journalsName.toLowerCase().includes(e.target.value.toLowerCase())))

    }



    return (
        <div className="main-content">
            <div className="page-content">

                {



                  //  searchList.length > 0 &&

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header" style={{ display: 'flex' }}>
                                    <div style={{ width: '50%' }}><h3 className="card-title mb-0">Published Journals</h3></div>
                                    <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                                        <form className="app-search d-none d-md-block">
                                            <div className="position-relative">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search..."
                                                    onChange={searchArticles}
                                                />
                                                <span className="mdi mdi-magnify search-widget-icon" />
                                                <span
                                                    className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                                                    id="search-close-options"
                                                />
                                            </div>
                                            <div className="dropdown-menu dropdown-menu-lg" id="search-dropdown">
                                                <div data-simplebar="init" style={{ maxHeight: 320 }}>
                                                    <div className="simplebar-wrapper" style={{ margin: 0 }}>
                                                        <div className="simplebar-height-auto-observer-wrapper">
                                                            <div className="simplebar-height-auto-observer" />
                                                        </div>
                                                        <div className="simplebar-mask">
                                                            <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
                                                                <div
                                                                    className="simplebar-content-wrapper"
                                                                    tabIndex={0}
                                                                    role="region"
                                                                    aria-label="scrollable content"
                                                                    style={{ height: "auto", overflow: "hidden" }}
                                                                >
                                                                    <div className="simplebar-content" style={{ padding: 0 }}>
                                                                        <div className="dropdown-header">
                                                                            <h6 className="text-overflow text-muted mb-0 text-uppercase">
                                                                                Recent Searches
                                                                            </h6>
                                                                        </div>
                                                                        <div className="dropdown-item bg-transparent text-wrap">
                                                                            <a
                                                                                href="index.html"
                                                                                className="btn btn-soft-secondary btn-sm rounded-pill"
                                                                            >
                                                                                how to setup <i className="mdi mdi-magnify ms-1" />
                                                                            </a>
                                                                            <a
                                                                                href="index.html"
                                                                                className="btn btn-soft-secondary btn-sm rounded-pill"
                                                                            >
                                                                                buttons <i className="mdi mdi-magnify ms-1" />
                                                                            </a>
                                                                        </div>
                                                                        <div className="dropdown-header mt-2">
                                                                            <h6 className="text-overflow text-muted mb-1 text-uppercase">
                                                                                Pages
                                                                            </h6>
                                                                        </div>
                                                                        <a
                                                                            href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
                                                                            className="dropdown-item notify-item"
                                                                            style={{ display: "block" }}
                                                                        >
                                                                            <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2" />
                                                                            <span>Analytics Dashboard</span>
                                                                        </a>
                                                                        <a
                                                                            href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
                                                                            className="dropdown-item notify-item"
                                                                            style={{ display: "none" }}
                                                                        >
                                                                            <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2" />
                                                                            <span>Help Center</span>
                                                                        </a>
                                                                        <a
                                                                            href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
                                                                            className="dropdown-item notify-item"
                                                                            style={{ display: "block" }}
                                                                        >
                                                                            <i className="ri-user-settings-line align-middle fs-18 text-muted me-2" />
                                                                            <span>My account settings</span>
                                                                        </a>
                                                                        <div className="dropdown-header mt-2">
                                                                            <h6 className="text-overflow text-muted mb-2 text-uppercase">
                                                                                Members
                                                                            </h6>
                                                                        </div>
                                                                        <div className="notification-list">
                                                                            <a
                                                                                href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
                                                                                className="dropdown-item notify-item py-2"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="d-flex">
                                                                                    <img
                                                                                        src="assets/images/users/avatar-2.jpg"
                                                                                        className="me-3 rounded-circle avatar-xs"
                                                                                        alt="user-pic"
                                                                                    />
                                                                                    <div className="flex-grow-1">
                                                                                        <h6 className="m-0">Angela Bernier</h6>
                                                                                        <span className="fs-11 mb-0 text-muted">Manager</span>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                            <a
                                                                                href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
                                                                                className="dropdown-item notify-item py-2"
                                                                                style={{ display: "block" }}
                                                                            >
                                                                                <div className="d-flex">
                                                                                    <img
                                                                                        src="assets/images/users/avatar-3.jpg"
                                                                                        className="me-3 rounded-circle avatar-xs"
                                                                                        alt="user-pic"
                                                                                    />
                                                                                    <div className="flex-grow-1">
                                                                                        <h6 className="m-0">David Grasso</h6>
                                                                                        <span className="fs-11 mb-0 text-muted">
                                                                                            Web Designer
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                            <a
                                                                                href="javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
                                                                                className="dropdown-item notify-item py-2"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <div className="d-flex">
                                                                                    <img
                                                                                        src="assets/images/users/avatar-5.jpg"
                                                                                        className="me-3 rounded-circle avatar-xs"
                                                                                        alt="user-pic"
                                                                                    />
                                                                                    <div className="flex-grow-1">
                                                                                        <h6 className="m-0">Mike Bunch</h6>
                                                                                        <span className="fs-11 mb-0 text-muted">
                                                                                            React Developer
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="simplebar-placeholder"
                                                            style={{ width: 0, height: 0 }}
                                                        />
                                                    </div>
                                                    <div
                                                        className="simplebar-track simplebar-horizontal"
                                                        style={{ visibility: "hidden" }}
                                                    >
                                                        <div
                                                            className="simplebar-scrollbar"
                                                            style={{ width: 0, display: "none" }}
                                                        />
                                                    </div>
                                                    <div
                                                        className="simplebar-track simplebar-vertical"
                                                        style={{ visibility: "hidden" }}
                                                    >
                                                        <div
                                                            className="simplebar-scrollbar"
                                                            style={{ height: 0, display: "none" }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="text-center pt-3 pb-1">
                                                    <a href="pages-search-results.html" className="btn btn-primary btn-sm">
                                                        View All Results <i className="ri-arrow-right-line ms-1" />
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>


                                </div>
                                {/* <div>{message}</div> */}

                                {/* end card header */}
                                <div className="card-body">


                                    <div id="table-pagination">
                                        <div
                                            role="complementary"
                                            className="gridjs gridjs-container"
                                            style={{ width: "100%" }}
                                        >
                                            <div className="gridjs-wrapper" style={{ height: "auto" }}>
                                                <table
                                                    role="grid"
                                                    className="gridjs-table"
                                                    style={{ height: "auto" }}
                                                >
                                                    <thead className="gridjs-thead">
                                                        <tr className="gridjs-tr">
                                                            <th
                                                                data-column-id="id"
                                                                className="gridjs-th"
                                                                style={{ width: 5 }}
                                                            >
                                                                <div className="gridjs-th-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <input
                                                                    className="form-check-input"
                                                                    id="checkAll"
                                                                    type="checkbox"
                                                                    defaultValue="option"

                                                                /></div>
                                                            </th>
                                                            <th
                                                                data-column-id="id"
                                                                className="gridjs-th"
                                                                style={{ width: 120 }}
                                                            >
                                                                <div className="gridjs-th-content">ID</div>
                                                            </th>
                                                            <th
                                                                data-column-id="name"
                                                                className="gridjs-th"
                                                                style={{ width: 150 }}
                                                            >
                                                                <div className="gridjs-th-content">Name</div>
                                                            </th>
                                                            <th
                                                                data-column-id="date"
                                                                className="gridjs-th"
                                                                style={{ width: 180 }}
                                                            >
                                                                <div className="gridjs-th-content">Publisher</div>
                                                            </th>
                                                            <th
                                                                data-column-id="total"
                                                                className="gridjs-th"
                                                                style={{ width: 120 }}
                                                            >
                                                                <div className="gridjs-th-content">ISBN</div>
                                                            </th>
                                                            <th
                                                                data-column-id="status"
                                                                className="gridjs-th"
                                                                style={{ width: 120 }}
                                                            >
                                                                <div className="gridjs-th-content">approved</div>
                                                            </th>
                                                            <th
                                                                data-column-id="status"
                                                                className="gridjs-th"
                                                                style={{ width: 120 }}
                                                            >
                                                                <div className="gridjs-th-content">frequency</div>
                                                            </th>
                                                            <th
                                                                data-column-id="status"
                                                                className="gridjs-th"
                                                                style={{ width: 120 }}
                                                            >
                                                                <div className="gridjs-th-content">Status</div>
                                                            </th>
                                                            <th
                                                                data-column-id="actions"
                                                                className="gridjs-th"
                                                                style={{ width: 100 }}
                                                            >
                                                                <div className="gridjs-th-content">Actions</div>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="gridjs-tbody">

                                                        {
                                                            searchList.map((item, i) => <tr className="gridjs-tr" key={i}>
                                                                <td data-column-id="name" className="gridjs-td" style={{
                                                                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                                    border: 'none'
                                                                }}>
                                                                    <div className="gridjs-th-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <input
                                                                        className="form-check-input checkbox-input"
                                                                        id="checkAll"
                                                                        type="checkbox"
                                                                        defaultValue="option"
                                                                    //  checked={item.isApproved==="pending"?false:true}
                                                                    /></div>
                                                                </td>
                                                                <td data-column-id="id" className="gridjs-td">
                                                                    <span>
                                                                        <a href="#" className="fw-medium">
                                                                            {item.journalsId}
                                                                        </a>
                                                                    </span>
                                                                </td>
                                                                <td data-column-id="name" className="gridjs-td">
                                                                    {item.journalsName}
                                                                </td>
                                                                <td data-column-id="date" className="gridjs-td">
                                                                    {item.publisherName}
                                                                </td>
                                                                <td data-column-id="total" className="gridjs-td">
                                                                    {item.journalsIsbn}
                                                                </td>
                                                                <td data-column-id="total" className="gridjs-td">
                                                                    <span className="badge bg-success-subtle text-success">{item.journalStatus}</span>

                                                                </td>
                                                                <td data-column-id="total" className="gridjs-td">
                                                                    {item.frequency}
                                                                </td>
                                                                <td data-column-id="status" className="gridjs-td">
                                                                    {item.journalStatus ? "Active" : "Inactive"}
                                                                </td>
                                                                <td data-column-id="actions" className="gridjs-td" style={{ display: 'flex', gap: '1rem' }}>
                                                                    {/* <span>
                                      <button type="button" className="btn btn-sm btn-light" onClick={() => handleJournal(item)}>
                                        Details
                                      </button>
                                    </span> */}
                                                                    <span>
                                                                        <Link href={`/admin/publishjournal/${item.journalsId}`} className="btn btn-sm btn-light">
                                                                            Publish
                                                                        </Link>
                                                                    </span>
                                                                </td>
                                                            </tr>)
                                                        }


                                                    </tbody>
                                                </table>
                                            </div>

                                            <div id="gridjs-temp" className="gridjs-temp" />
                                        </div>
                                    </div>
                                </div>
                                {/* end card-body */}
                            </div>
                            {/* end card */}
                        </div>
                        {/* end col */}
                    </div>

                }


            </div>
        </div>
    )
}

export default Page