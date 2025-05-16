"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UniversalContext } from '@/component/context';
import { useRouter } from 'next/navigation';

function Page() {

    // const { articlelist, setarticlelist } = UniversalContext();
    const articlelist=[]
    // const [journalId,setjournalid]=useState("");
    const [succMessage, setSuccmessage] = useState("");
    const [searchedList, setSearchedlist] = useState([]);
    const [journalList, setJournallist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [journalNumbers, setJournalnumbers] = useState(2);
    //const [startIdx, setStartidx] = useState(0);
    const [idx, setIdx] = useState(1);
    const [totalItems, setTotalitems] = useState(0);
    const [primaryAuth, setPrimaryauth] = useState(false);
    const [jounalId, setJournalid] = useState('');
    const router = useRouter()

    useEffect(() => {

        if (articlelist.length === 0) {
            router.push('/admin/articlelist');
        }
        else {


            const fetching = async () => {
               
                const option = {

                    method: 'GET',
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/getJournal`,
                }

                const response = await axios.request(option);
                setJournallist(response.data.journals);
               
                // setSearchedlist(response.data.journals.slice(idx * journalNumbers - journalNumbers, idx + journalNumbers - 1));
                setSearchedlist(response.data.journals)
                // if ((response.data.journals.length) % 2 === 0) {
                //     setTotalitems(response.data.journals.length / 2);
                // }
                // else {

                //     setTotalitems(Math.ceil((response.data.journals.length) / 2));
                // }



            }

            fetching();
        }

    }, [])

    const setPage = (i) => {


        if (i * journalNumbers > journalList.length) {
            setSearchedlist(journalList.slice(i * journalNumbers - journalNumbers, (i * journalNumbers - journalNumbers) + (i * journalNumbers) - (journalList.length)));
        }
        else {
            setSearchedlist(journalList.slice(i * journalNumbers - journalNumbers, i + journalNumbers - 1));
        }

    }

    const searchJournals = (e) => {

        e.preventDefault();
        if (e.target.value === "") {
            setSearchedlist(journalList);
        }
        setSearchedlist((prev) => prev.filter((item) => item.journalsName.toLowerCase().includes(e.target.value)));



    }

    const addArticles = async () => {


        setLoading(true);
        const option = {

            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/addArticle`,
            data: {

                articlesList: articlelist,
                journalsId: jounalId

            }


        }

        const response = await axios.request(option);
        setLoading(false);
        setSuccmessage(response.data.message);
        // //  console.log(response.data.message);

    }

    const handleSearch = (value, journalsId) => {

        document.querySelector('.form-select').innerHTML = value;
        setJournalid(journalsId);
        setPrimaryauth(false)

    }


    return (

        <div className="main-content">
            <div className="page-content">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title mb-0">Published Journals List</h4>
                    </div>
                    {/* end card header */}
                    <div className="card-body">
                        <div className='row g-3'>
                            <div className="col-md-6" >
                                <label htmlFor="inputAddress2" className="form-label">
                                    Search Journals
                                </label>
                                <div style={{display:'flex',gap:'1rem'}}>

                                    <div className="form-select mb-3" style={{ height: '50px', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }} onClick={() => setPrimaryauth(!primaryAuth)}>
                                    </div>
                                   { 
                                    
                                    !loading ?
                                    <button
                                        type="button"
                                        className="btn btn-success add-btn"
                                        style={{height: '50px'}}
                                        onClick={addArticles}
                                    >
                                        Add
                                    </button> :
                                    <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}><div className="spinner-border text-success" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> </div>
                                   }
                                </div>



                                {

                                    primaryAuth &&
                                    <div className="form-control" >



                                        <input type="text" className="form-control" placeholder='Search Journals' onChange={searchJournals} />


                                        <div className="form-control" style={{ marginTop: '17px', cursor: 'pointer', overflow: 'hidden',border:'none'}}>

                                            {

                                                searchedList.map((item, i) => <div key={i} onClick={() => handleSearch(item.journalsName.toUpperCase(), item.journalsId)} style={{ marginTop: '10px' }}>{item.journalsName.toUpperCase()}</div>
                                                )

                                            }
                                        </div>



                                    </div>
                                }
                                {
                                    succMessage!=="" && <div>{succMessage}</div>
                                }


                            </div>

                            {/* <div className='col-md-6' style={{display:'flex',alignItems:'center'}}>
                           
                        </div> */}

                        </div>

                        {/* {
        selectionMsg &&
        <p className="text-danger">Please select atleast one article!</p>
      } */}

                        {/* <div className="listjs-table" id="pagination-list">
                            <div className="mb-2">
                                <input className="form-control" placeholder="Search" onChange={searchJournals} />
                            </div>
                            <div className="mx-n3">
                                <ul className="list list-group list-group-flush mb-0">

                                    {

                                        loading ?

                                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '20px' }}><div className="spinner-border text-success" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div> </div> :

                                            searchedList.map((item, i) =>
                                                <li className="list-group-item" key={i}>
                                                    <div className="d-flex align-items-center pagi-list">
                                                        <div className="flex-shrink-0 me-3">
                                                            <div>
                                                                {item.journalsId}
                                                            </div>
                                                        </div>
                                                        <div className="flex-grow-1 overflow-hidden">
                                                            <h5 className="fs-13 mb-1">
                                                                <a href="#" className="link text-body">
                                                                    {item.journalsName.toUpperCase()}
                                                                </a>
                                                            </h5>
                                                            <p className="born timestamp text-muted mb-0">
                                                                {item.frequency}
                                                            </p>
                                                        </div>
                                                        <div className="flex-shrink-0 ms-2">
                                                            <div>
                                                                <button type="button" className="btn btn-success" onClick={() => addArticles(item.journalsId)}>
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>)
                                    }

                                </ul>
                                
                                <div className="d-flex justify-content-center">
                                    <div className="pagination-wrap hstack gap-2">
                                        <div
                                            className="page-item pagination-prev disabled"

                                        >
                                            Previous
                                        </div>
                                        <ul className="pagination listjs-pagination mb-0">

                                            {

                                                journalList.map((item, i) => i < totalItems && <li className="active" key={i}>
                                                    <div className="page"  onClick={()=>setPage(i+1)}>
                                                        {i+1}
                                                    </div>
                                                </li>)

                                            }

                                           
                                        </ul>
                                        <div className="page-item pagination-next" >
                                            Next
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                </div>

            </div>
        </div>

    )
}

export default Page