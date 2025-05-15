"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';



function Page() {

    const [articleList, setArticlelist] = useState([]);
    
    useEffect(() => {


        const fetching = async () => {

            const option = {

                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getArticle`,
            }

            const response = await axios.request(option);
            setArticlelist(response.data.articles);


        }

        fetching();

    }, [])

    



    return (
        <div>
      <div className="main-content">
        <div className="page-content">

          {

          

              articleList.length > 0 &&

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header" style={{ display: 'flex' }}>
                      <div style={{ width: '50%' }}><h3 className="card-title mb-0">PUBLISHED ARTICLES</h3></div>
                      <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end' }}>
                       

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
                                  articleList.map((item, i) => <tr className="gridjs-tr" key={i}>
                                    <td data-column-id="name" className="gridjs-td" style={{
                                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                                      border: 'none'
                                    }}>
                                      <div className="gridjs-th-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> {item.articleStatus === 'Pending' && <input
                                        className="form-check-input checkbox-input"
                                        id="checkAll"
                                        type="checkbox"
                                        defaultValue="disabled"
                                      />}</div>
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
                                    <span className="badge bg-success-subtle text-success"> {item.articleStatus}</span>
                                     
                                    </td>
                                    <td data-column-id="actions" className="gridjs-td" style={{ display: 'flex', gap: '1rem' }}>
                                     
                                      <span>
                                        <Link href={`/admin/articlelist/${item.articleId}`} className="btn btn-sm btn-light">
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

      




    </div>
    )
}

export default Page