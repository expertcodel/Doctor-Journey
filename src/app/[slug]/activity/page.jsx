"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
export default function Page() {

    
    const [activityList,setActivitylist]=useState([]);
    useEffect(() => {
      
       const fetching=async()=>{
            
        const option={
            method:'GET',
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/api/activity`
        }

        const response=await axios.request(option);
        if(response.data.status)
        {
            setActivitylist(response.data.activityList);
        }
       

       }
       fetching();

    }, [])
    



    return (

        <div className="main-content">
            <div className="page-content">
                
               { activityList.length > 0 && <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title mb-0 flex-grow-1">System Activity</h4>
                            </div>
                            <div className="card-body">
                                <div id="table-gridjs"><div role="complementary" className="gridjs gridjs-container" style={{ "width": "100%" }}><div className="gridjs-head"><div className="gridjs-search"><input type="search" placeholder="Type a keyword..." aria-label="Type a keyword..." className="gridjs-input gridjs-search-input" /></div></div><div className="gridjs-wrapper" style={{ "height": "auto" }}><table role="grid" className="gridjs-table" style={{ "height": "auto" }}><thead className="gridjs-thead"><tr className="gridjs-tr"><th data-column-id="id" className="gridjs-th gridjs-th-sort" tabIndex={0} style={{ "width": "80px" }}><div className="gridjs-th-content">S.No</div><button tabIndex={-1} aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral" /></th><th data-column-id="name" className="gridjs-th gridjs-th-sort" tabIndex={0} style={{ "width": "150px" }}><div className="gridjs-th-content">Name</div><button tabIndex={-1} aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral" /></th><th data-column-id="email" className="gridjs-th gridjs-th-sort" tabIndex={0} style={{ "width": "220px" }}><div className="gridjs-th-content">Userid</div><button tabIndex={-1} aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral" /></th><th data-column-id="position" className="gridjs-th gridjs-th-sort" tabIndex={0} style={{ "width": "250px" }}><div className="gridjs-th-content">Time</div><button tabIndex={-1} aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral" /></th><th data-column-id="company" className="gridjs-th gridjs-th-sort" tabIndex={0} style={{ "width": "180px" }}><div className="gridjs-th-content">Activity</div><button tabIndex={-1} aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral" /></th><th data-column-id="country" className="gridjs-th gridjs-th-sort" tabIndex={0} style={{ "width": "180px" }}><div className="gridjs-th-content">Usertype</div><button tabIndex={-1} aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral" /></th><th data-column-id="actions" className="gridjs-th gridjs-th-sort" tabIndex={0} style={{ "width": "150px" }}><div className="gridjs-th-content">Orgid</div><button tabIndex={-1} aria-label="Sort column ascending" title="Sort column ascending" className="gridjs-sort gridjs-sort-neutral" /></th></tr></thead><tbody className="gridjs-tbody">{activityList.map((item,i)=><tr key={i} className="gridjs-tr"><td data-column-id="id" className="gridjs-td"><span><span className="fw-semibold">{i+1} </span></span></td><td data-column-id="name" className="gridjs-td">{item.name} </td><td data-column-id="email" className="gridjs-td"><span><a href>{item.userId}</a></span></td><td data-column-id="position" className="gridjs-td">{item.time} </td><td data-column-id="company" className="gridjs-td">{item.activity}</td><td data-column-id="country" className="gridjs-td">{item.usertype}</td><td data-column-id="actions" className="gridjs-td"><span><a href="#" className="text-reset text-decoration-underline">{item.orgId}</a></span></td></tr>)}</tbody></table></div><div className="gridjs-footer"><div className="gridjs-pagination"><div role="status" aria-live="polite" className="gridjs-summary" title="Page 1 of 2">Showing <b>1</b> to <b>5</b> of <b>10</b> results</div><div className="gridjs-pages"><button tabIndex={0} role="button" disabled title="Previous" aria-label="Previous" className>Previous</button><button tabIndex={0} role="button" className="gridjs-currentPage" title="Page 1" aria-label="Page 1">1</button><button tabIndex={0} role="button" className title="Page 2" aria-label="Page 2">2</button><button tabIndex={0} role="button" title="Next" aria-label="Next" className>Next</button></div></div></div><div id="gridjs-temp" className="gridjs-temp" /></div></div>
                            </div>{/* end card-body */}
                        </div>{/* end card */}
                    </div>
                    {/* end col */}
                </div>}
            </div>
        </div>
    )
}
