"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import Articles from './Articles'
// import { UniversalContext } from '../../../component/context.js';
import { useRouter } from 'next/navigation';
import Tooltip from '../component/Tooltip.jsx'

function ArticlelistPage({ articleList, totalItems, usertype, userId }) {

    const [articleLists, setArticlelists] = useState(articleList);
    const [articlePage, setArticlepage] = useState(false);
    const [articleDetail, setArticledetail] = useState({});
    const [popup, setPopup] = useState(false);
    const [deleteView, setDeleteview] = useState(-1);
    const [deleteditems, setDeleteditems] = useState([])
    const [msg, setMsg] = useState("");
    const [message, setMessage] = useState("");
    const [selectionMsg, setSelectionmsg] = useState(false);
    const [button, setButton] = useState(totalItems);
    const [idx, setIdx] = useState(1);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [articleNumbers, setArticlenumbers] = useState(4);

    // const { } = UniversalContext();
    const router = useRouter();
    //  console.log(setarticlelist,articlelist);


    const [Message, setmessage] = useState(typeof window !== 'undefined' && sessionStorage.getItem('successMsg') ? sessionStorage.getItem('successMsg') : "")


    useEffect(() => {


        if (Message !== "") {
            const timer = setTimeout(() => {
                setmessage("");
                sessionStorage.removeItem('successMsg');
            }, 3000);

            return () => clearTimeout(timer);
        }

    }, [])


    const handleArticle = (item) => {
        setArticledetail(item);
        setArticlepage(true);
    }


    const approveArticles = async () => {

        const checkbox = Array.from(document.querySelectorAll('.checkbox-input'));
        let arr = [];
        checkbox.map((item, i) => { if (item.checked) { arr.push(articleList[i].articleId) } })

        if (arr.length > 0) {

            try {
                const option = {

                    method: 'POST',
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/approveArticles`,
                    data: {

                        checkedArticle: arr
                    }
                }

                const response = await axios.request(option);
                // setMessage(response.data.message);
                if (response.data.status) {
                    sessionStorage.setItem('successMsg', 'Article Approved Successfully');
                    window.location.href = `/dashboard/articlelist`
                }


            } catch (error) {

                console.log("error", error);

            }

        }
        else {

            setSelectionmsg(true);

        }

    }


    const searching = async (idx, name) => {


        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createArticle/?page=${idx}&name=${name}&userId=${userId}&usertype=${typeof (usertype)}`);
        setName(name);

        const res = await response.json();
        if (res.status) {
            setArticlelists(res.articlelist);
            setButton(Math.ceil(res.totalItems / 10));
        }

    }

    const pagination = async (idx) => {

        if (idx > 0 && idx <= button) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createArticle/?page=${idx}&name=${name}&userId=${userId}&usertype=${typeof (usertype)}`);
            setIdx(idx);
            const res = await response.json();
            if (res.status) {
                setArticlelists(res.articlelist);
                setButton(Math.ceil(res.totalItems / 10));
            }

        }


    }


    const deleteMultipleRecords = async () => {


        let deleteditem = [];
        const checkboxlist = Array.from(document.querySelectorAll('.deleteinput'));
        checkboxlist.map((item, i) => item.checked && deleteditem.push(articleLists[i].id))
        setDeleteditems(deleteditem);

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createArticle`, {
            method: "DELETE",
            body: JSON.stringify({ deleteditem }),
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

            sessionStorage.setItem('successMsg', 'Article deleted Successfully');
            window.location.href = "/dashboard/articlelist"
        }




    }

    const openPopup = () => {

        let deleteditem = [];
        const checkboxlist = Array.from(document.querySelectorAll('.deleteinput'));
        checkboxlist.map((item, i) => item.checked && deleteditem.push(articleList[i].id))
        setDeleteditems(deleteditem);
        if (deleteditem.length === 0) {
            setMsg("Please select atleast one checkbox!")
        }
        else {

            setDeleteview(1);
            setPopup(true)
        }

    }

    const selectAllcheckbox = () => {

        const parent = document.getElementById('selectall').checked;
        const checkboxlist = Array.from(document.querySelectorAll('.deleteinput'));
        checkboxlist.forEach((box) => box.checked = parent);
    }

    return (

        <div>
            <div className="main-content">
                <div className="page-content">

                    <div className="container-fluid">

                        {

                            Message !== "" && <Tooltip message={Message} />
                        }

                        {

                            !articlePage ?



                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="card">
                                            <div className="card-header" style={{ display: 'flex' }}>
                                                <div style={{ width: '50%' }}><h3 className="card-title mb-0">Articles</h3></div>
                                                {
                                                    msg !== "" && <div style={{ color: 'red' }}>{msg}</div>

                                                }

                                                <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>

                                                    {
                                                        selectionMsg && <div className='text-danger'>Please select atleast one article!</div>
                                                    }

                                                    <div className="col-sm">
                                                        <div className="d-flex justify-content-sm-end">
                                                            <div className="search-box ms-2">
                                                                <input type="text" className="form-control search" placeholder="Search..." onChange={(e) => searching(idx, e.target.value)} />
                                                                <i className="ri-search-line search-icon" />
                                                            </div>
                                                        </div>

                                                    </div>


                                                    {typeof (usertype) === 'string' && <button type="submit" className="btn btn-primary" onClick={approveArticles}>
                                                        Approve
                                                    </button>}

                                                    <button class="btn btn-primary btn-danger remove-item-btn deleteBtn" type="button" onClick={openPopup}

                                                    >Remove</button>

                                                </div>


                                            </div>
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


                                                                            {/* <div className="gridjs-th-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> <input
                                      className="form-check-input"
                                      id="checkAll"
                                      type="checkbox"
                                      defaultValue="option"
                                    /></div> */}
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
                                                                            <div className="gridjs-th-content">Title</div>
                                                                        </th>
                                                                        <th
                                                                            data-column-id="date"
                                                                            className="gridjs-th"
                                                                            style={{ width: 180 }}
                                                                        >
                                                                            <div className="gridjs-th-content">Date</div>
                                                                        </th>
                                                                        <th
                                                                            data-column-id="total"
                                                                            className="gridjs-th"
                                                                            style={{ width: 120 }}
                                                                        >
                                                                            <div className="gridjs-th-content">DOI</div>
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
                                                                        articleLists.map((item, i) => <tr className="gridjs-tr" key={i}>
                                                                            <td data-column-id="name" className="gridjs-td" style={{
                                                                                display: 'flex', justifyContent: 'center', alignItems: 'center',
                                                                                border: 'none'
                                                                            }}>
                                                                                <div className="gridjs-th-content" >  <input
                                                                                    className="form-check-input checkbox-input deleteinput"
                                                                                    id="checkAll"
                                                                                    type="checkbox"
                                                                                // onClick={()=>console.log('k',item.articleId)}

                                                                                /></div>
                                                                            </td>
                                                                            <td data-column-id="id" className="gridjs-td">
                                                                                <span>
                                                                                    <a href="#" className="fw-medium">
                                                                                        {item.articleId}
                                                                                    </a>
                                                                                </span>
                                                                            </td>
                                                                            <td data-column-id="name" className="gridjs-td">
                                                                                {item.articleTitle}
                                                                            </td>
                                                                            <td data-column-id="date" className="gridjs-td">
                                                                                {item.publishedDate}
                                                                            </td>
                                                                            <td data-column-id="total" className="gridjs-td">
                                                                                {item.DOI}
                                                                            </td>
                                                                            <td data-column-id="status" className="gridjs-td">
                                                                                {item.articleStatus === 'pending' ? <span className="badge bg-warning-subtle text-warning">{item.articleStatus}</span>
                                                                                    : <span className="badge bg-success-subtle text-success">{item.articleStatus}</span>
                                                                                }
                                                                            </td>
                                                                            <td data-column-id="actions" className="gridjs-td" style={{ display: 'flex', gap: '1rem' }}>
                                                                                <span>
                                                                                    <button type="button" className="btn btn-sm btn-light" onClick={() => handleArticle(item)}>
                                                                                        Details
                                                                                    </button>
                                                                                </span>
                                                                                <span>
                                                                                    <Link href={`/dashboard/articlelist/${item.articleId}`} className="btn btn-sm btn-light">
                                                                                        Edit
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
                                    <div className="noresult" style={{ display: button > 0 && "none" }}><div className="text-center"><lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{ "width": "75px", "height": "75px" }} /><h5 className="mt-2">Sorry! No Result Found</h5></div></div>
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
                                </div> :

                                <Articles setArticlepage={setArticlepage} articleDetails={articleDetail} />

                        }


                    </div>

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
                                        <button type="button" className="btn w-sm btn-danger " id="delete-record" onClick={deleteMultipleRecords}>Yes, Delete It!</button>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>

                </div>
            </div>






        </div>
    )
}

export default ArticlelistPage