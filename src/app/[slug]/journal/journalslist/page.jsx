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
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createJournal`,
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

    const addArticles = async (journalsId) => {

        const checkedArticles = Array.from(document.querySelectorAll('.checkbox-input'));
        let arr = [];
        checkedArticles.map((item, i) => { if (item.checked && articleList[i].articleStatus === 'Pending') { arr.push(articleList[i].articleId) } });
        //console.log('ji',arr,articleList.length,articleList);
    
    
        if (arr.length > 0) {
          const option = {
    
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/addArticle`,
            data: {
    
              articlesList: arr,
              journalsId
    
            }
    
    
          }
    
          const response = await axios.request(option);
          setSuccmessage(response.data.message);
          //  console.log(response.data.message);
    
    
        }
        else {
          setSelectionmsg(true);
        }
    
      }

    




    return (
        <div className="main-content">
            <div className="page-content">

                {



                    journalList.length > 0 &&

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header" style={{ display: 'flex' }}>
                                    <div style={{ width: '50%' }}><h3 className="card-title mb-0">Journals</h3></div>
                                    <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>

                                        <button type="submit" className="btn btn-primary" onClick={approveJournals}>
                                        Approve
                                        </button>

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
                                                                    <div className="gridjs-th-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',display:item.journalStatus === 'approved' && 'none' }}> <input
                                                                        className="form-check-input checkbox-input"
                                                                        id="checkAll"
                                                                        type="checkbox"
                                                                        
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
                                                                    {item.journalStatus === 'pending' ? <span className="badge bg-warning-subtle text-warning">{item.journalStatus}</span>
                                                                        : <span className="badge bg-success-subtle text-success">{item.journalStatus}</span>
                                                                    }
                                                                </td>
                                                                <td data-column-id="total" className="gridjs-td">
                                                                    {item.frequency}
                                                                </td>
                                                                <td data-column-id="status" className="gridjs-td">
                                                                    {item.status ? "Active" : "Inactive"}
                                                                </td>
                                                                <td data-column-id="actions" className="gridjs-td" style={{ display: 'flex', gap: '1rem' }}>
                                                                    {/* <span>
                                      <button type="button" className="btn btn-sm btn-light" onClick={() => handleJournal(item)}>
                                        Details
                                      </button>
                                    </span> */}
                                                                    <span>
                                                                        <Link href={`/admin/journalList/${item.journalsId}`} className="btn btn-sm btn-light">
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
                    </div>

                }


            </div>
        </div>
    )
}

export default Page