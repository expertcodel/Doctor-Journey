"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link';
import Articles from '../../../component/Articles'
import { UniversalContext } from '../../../component/context.js';
import { useRouter } from 'next/navigation';

function Page() {

  const [articleList, setArticlelist] = useState([]);
  const [articlePage, setArticlepage] = useState(false);
  const [articleDetail, setArticledetail] = useState({});
  const [message, setMessage] = useState("");
  const [selectionMsg, setSelectionmsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [articleNumbers, setArticlenumbers] = useState(4);
  // const { } = UniversalContext();
  const router = useRouter();
  //  console.log(setarticlelist,articlelist);


  useEffect(() => {


    const fetching = async () => {

      const option = {

        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createArticle`,
      }

      const response = await axios.request(option);
      setArticlelist(response.data.articles);


    }

    fetching();

  }, [message])

  const handleArticle = (item) => {
    setArticledetail(item);
    setArticlepage(true);
  }



  const [journalList, setJournallist] = useState([]);
  const [searchedList, setSearchedlist] = useState([]);

  // const fetchingJournals = async () => {

  //   if (journalList.length === 0) {

  //     setLoading(true);
  //     const option = {

  //       method: 'GET',
  //       url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getJournal`,
  //     }

  //     const response = await axios.request(option);
  //     setJournallist(response.data.journals);
  //     setLoading(false);
  //     setSearchedlist(response.data.journals);
  //   }

  // }

  // const searchJournals = (e) => {

  //   e.preventDefault();
  //   if (e.target.value === "") {
  //     setSearchedlist(journalList);
  //   }
  //   setSearchedlist((prev) => prev.filter((item) => item.journalsName.toLowerCase().includes(e.target.value)));



  // }

  // const addArticles = async (journalsId) => {

  //   setarticlelist([])
  //   const checkedArticles = Array.from(document.querySelectorAll('.checkbox-input'));
  //   let arr = [];
  //   checkedArticles.map((item, i) => { if (item.checked && articleList[i].articleStatus === 'pending') { setarticlelist((prev) => [...prev, articleList[i].articleId]); arr.push(articleList[i].articleId) } });


  //   if (arr.length > 0) {
  //     // const option = {

  //     //   method: 'POST',
  //     //   url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/addArticle`,
  //     //   data: {

  //     //     articlesList: arr,
  //     //     journalsId

  //     //   }


  //     // }

  //     // const response = await axios.request(option);
  //     // setSuccmessage(response.data.message);
  //     // //  console.log(response.data.message);
  //     router.push('/admin/addjournals');

  //   }
  //   else {
  //     setSelectionmsg(true);
  //   }

  // }

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
        setMessage(response.data.message);
      } catch (error) {

        console.log("error", error);

      }

    }
    else {

      setSelectionmsg(true);

    }

  }


  return (

    <div>
      <div className="main-content">
        <div className="page-content">

          {

            !articlePage ?

              articleList.length > 0 &&

              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header" style={{ display: 'flex' }}>
                      <div style={{ width: '50%' }}><h3 className="card-title mb-0">Articles</h3></div>
                      <div style={{ width: '50%', display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>

                        {
                          selectionMsg && <div className='text-danger'>Please select atleast one article!</div>
                        }

                      
                        <button type="submit" className="btn btn-primary" onClick={approveArticles}>
                          Approve
                        </button>

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
                                      <div className="gridjs-th-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', display: item.articleStatus !== 'pending' && 'none' }}>  <input
                                        className="form-check-input checkbox-input"
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
                <div className="d-flex justify-content-center">
                  <div className="pagination-wrap hstack gap-2">
                    <a
                      className="page-item pagination-prev disabled"
                      href="javascript:void(0)"
                    >
                      Previous
                    </a>
                    <ul className="pagination listjs-pagination mb-0">
                      <li className="active">
                        <a className="page" href="#" data-i={1} data-page={3}>
                          1
                        </a>
                      </li>
                      <li>
                        <a className="page" href="#" data-i={2} data-page={3}>
                          2
                        </a>
                      </li>
                    </ul>
                    <a className="page-item pagination-next" href="javascript:void(0)">
                      Next
                    </a>
                  </div>
                </div>
              </div> :

              <Articles setArticlepage={setArticlepage} articleDetails={articleDetail} />

          }




        </div>
      </div>






    </div>
  )
}

export default Page