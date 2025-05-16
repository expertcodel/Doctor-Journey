"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Page() {

  const [invoiceList,setInvoicelist]=useState([]);
  useEffect(() => {

    const fetching=async()=>{

      const option={
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice`,
        method:'GET'
      }

      const response=await axios.request(option);
      if(response.data.status)
      {
        setInvoicelist(response.data.invoiceList);
      }
    } 

    fetching();
   
  }, [])
  
  

  return (
    <div className="main-content">
  <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
            <h4 className="mb-sm-0">Invoice List</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="javascript: void(0);">Invoices</a></li>
                <li className="breadcrumb-item active">Invoice List</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted mb-0">Invoices Sent</p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-success fs-14 mb-0">
                    <i className="ri-arrow-right-up-line fs-13 align-middle" /> +89.24 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="559.25">559.25</span>k</h4>
                  <span className="badge bg-warning me-1">2,258</span> <span className="text-muted">Invoices sent</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-file-text text-success icon-dual-success"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1={16} y1={13} x2={8} y2={13} /><line x1={16} y1={17} x2={8} y2={17} /><polyline points="10 9 9 9 8 9" /></svg>
                  </span>
                </div>
              </div>
            </div>{/* end card body */}
          </div>{/* end card */}
        </div>{/* end col */}
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted mb-0">Paid Invoices</p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-danger fs-14 mb-0">
                    <i className="ri-arrow-right-down-line fs-13 align-middle" /> +8.09 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="409.66">409.66</span>k</h4>
                  <span className="badge bg-warning me-1">1,958</span> <span className="text-muted">Paid by clients</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-square text-success icon-dual-success"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
                  </span>
                </div>
              </div>
            </div>{/* end card body */}
          </div>{/* end card */}
        </div>{/* end col */}
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted mb-0">Unpaid Invoices</p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-danger fs-14 mb-0">
                    <i className="ri-arrow-right-down-line fs-13 align-middle" /> +9.01 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="136.98">136.98</span>k</h4>
                  <span className="badge bg-warning me-1">338</span> <span className="text-muted">Unpaid by clients</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock text-success icon-dual-success"><circle cx={12} cy={12} r={10} /><polyline points="12 6 12 12 16 14" /></svg>
                  </span>
                </div>
              </div>
            </div>{/* end card body */}
          </div>{/* end card */}
        </div>{/* end col */}
        <div className="col-xl-3 col-md-6">
          {/* card */}
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1">
                  <p className="text-uppercase fw-medium text-muted mb-0">Cancelled Invoices</p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-success fs-14 mb-0">
                    <i className="ri-arrow-right-up-line fs-13 align-middle" /> +7.55 %
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">$<span className="counter-value" data-target="84.20">84.2</span>k</h4>
                  <span className="badge bg-warning me-1">502</span> <span className="text-muted">Cancelled by clients</span>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-light rounded fs-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-x-octagon text-success icon-dual-success"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1={15} y1={9} x2={9} y2={15} /><line x1={9} y1={9} x2={15} y2={15} /></svg>
                  </span>
                </div>
              </div>
            </div>{/* end card body */}
          </div>{/* end card */}
        </div>{/* end col */}
      </div> {/* end row*/}
      <div className="row">
        <div className="col-lg-12">
          <div className="card" id="invoiceList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Invoices</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex gap-2 flex-wrap">
                    <button className="btn btn-primary" id="remove-actions" onclick="deleteMultiple()"><i className="ri-delete-bin-2-line" /></button>
                    <a href="/admin/invoices-create" className="btn btn-danger"><i className="ri-add-line align-bottom me-1" /> Create Invoice</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body bg-light-subtle border border-dashed border-start-0 border-end-0">
              <form>
                <div className="row g-3">
                  <div className="col-xxl-5 col-sm-12">
                    <div className="search-box">
                      <input type="text" className="form-control search bg-light border-light" placeholder="Search for customer, email, country, status or something..." />
                      <i className="ri-search-line search-icon" />
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-xxl-3 col-sm-4">
                    <input type="text" className="form-control bg-light border-light flatpickr-input" id="datepicker-range" placeholder="Select date" readOnly="readonly" />
                  </div>
                  {/*end col*/}
                  <div className="col-xxl-3 col-sm-4">
                    <div className="input-light">
                      <div className="choices" data-type="select-one" tabIndex={0} role="listbox" aria-haspopup="true" aria-expanded="false"><div className="choices__inner"><select className="form-control choices__input" data-choices data-choices-search-false name="choices-single-default" id="idStatus" hidden tabIndex={-1} data-choice="active">
                            <option value>Status</option>
                            <option value="all" selected>All</option>
                            <option value="Unpaid">Unpaid</option>
                            <option value="Paid">Paid</option>
                            <option value="Cancel">Cancel</option>
                            <option value="Refund">Refund</option>
                          </select><div className="choices__list choices__list--single"><div className="choices__item choices__item--selectable" data-item data-id={2} data-value="all" aria-selected="true" role="option">All</div></div></div><div className="choices__list choices__list--dropdown" aria-expanded="false"><div className="choices__list" role="listbox"><div id="choices--idStatus-item-choice-1" className="choices__item choices__item--choice choices__placeholder choices__item--selectable is-highlighted" role="option" data-choice data-id={1} data-value data-select-text="Press to select" data-choice-selectable aria-selected="true">Status</div><div id="choices--idStatus-item-choice-2" className="choices__item choices__item--choice is-selected choices__item--selectable" role="option" data-choice data-id={2} data-value="all" data-select-text="Press to select" data-choice-selectable>All</div><div id="choices--idStatus-item-choice-5" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={5} data-value="Cancel" data-select-text="Press to select" data-choice-selectable>Cancel</div><div id="choices--idStatus-item-choice-4" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={4} data-value="Paid" data-select-text="Press to select" data-choice-selectable>Paid</div><div id="choices--idStatus-item-choice-6" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={6} data-value="Refund" data-select-text="Press to select" data-choice-selectable>Refund</div><div id="choices--idStatus-item-choice-3" className="choices__item choices__item--choice choices__item--selectable" role="option" data-choice data-id={3} data-value="Unpaid" data-select-text="Press to select" data-choice-selectable>Unpaid</div></div></div></div>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-xxl-1 col-sm-4">
                    <button type="button" className="btn btn-primary w-100" onclick="SearchData();">
                      <i className="ri-equalizer-fill me-1 align-bottom" /> Filters
                    </button>
                  </div>
                  {/*end col*/}
                </div>
                {/*end row*/}
              </form>
            </div>
            <div className="card-body">
              <div>
                <div className="table-responsive table-card">
                  <table className="table align-middle table-nowrap" id="invoiceTable">
                    <thead className="text-muted">
                      <tr>
                        <th scope="col" style={{"width":"50px"}}>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="checkAll" defaultValue="option" />
                          </div>
                        </th>
                        <th className="sort text-uppercase" data-sort="invoice_id">ID</th>
                        <th className="sort text-uppercase" data-sort="customer_name">Customer</th>
                        <th className="sort text-uppercase" data-sort="email">Email</th>
                        <th className="sort text-uppercase" data-sort="country">Country</th>
                        <th className="sort text-uppercase" data-sort="date">Date</th>
                        <th className="sort text-uppercase" data-sort="invoice_amount">Amount</th>
                        <th className="sort text-uppercase" data-sort="status">Payment Status</th>
                        <th className="sort text-uppercase" data-sort="action">Action</th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all" >

                      {
                          invoiceList.length > 0 && 
                          invoiceList.map((item)=><tr key={item.id}>
                          <th scope="row">
                            <div className="form-check">
                              <input className="form-check-input" type="checkbox" name="chk_child" defaultValue={item.buyerId} />
                            </div>
                          </th>
                          <td className="id"><a href="javascript:void(0);" onclick="ViewInvoice(this);" data-id={25000351} className="fw-medium link-primary">{item.buyerId}</a></td>
                          <td className="customer_name">
                            <div className="d-flex align-items-center">
                              <img src="/assets/images/users/avatar-1.jpg" alt className="avatar-xs rounded-circle me-2" />{item.customerName}
                            </div>
                          </td>
                          <td className="email">{item.email}</td>
                          <td className="country">USA</td>
                          <td className="date">{item.date} <small className="text-muted">9:58 PM</small></td>
                          <td className="invoice_amount">{item.itemDetails.totalPrice}</td>
                          <td className="status"><span className="badge bg-success-subtle text-success text-uppercase">Paid</span>
                          </td>
                          <td>
                            <div className="dropdown">
                              <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="ri-more-fill align-middle" />
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end">
                                <li><a  className="dropdown-item" href={`/admin/invoices-details/${item.buyerId}`} ><i className="ri-eye-fill align-bottom me-2 text-muted" />
                                View</a></li>
                                <li><a className="dropdown-item" href={`/admin/invoices-edit/${item.buyerId}`} data-id={25000351}><i className="ri-pencil-fill align-bottom me-2 text-muted" />
                                    Edit</a></li>
                                <li><a className="dropdown-item" href="javascript:void(0);"><i className="ri-download-2-line align-bottom me-2 text-muted" />
                                    Download</a></li>
                                <li className="dropdown-divider" />
                                <li>
                                  <a className="dropdown-item remove-item-btn" data-bs-toggle="modal" href="#deleteOrder">
                                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted" />
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                      </tr>)
                      }

                    
                  

                    
                    
                    </tbody>
                  </table>
                  <div className="noresult" style={{"display":"none"}}>
                    <div className="text-center">
                      <lord-icon src="https://cdn.lordicon.com/msoeawqm.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style={{"width":"75px","height":"75px"}} />
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">We've searched more than 150+ invoices We did not find any invoices for you search.</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <div className="pagination-wrap hstack gap-2" style={{"display":"flex"}}>
                    <a className="page-item pagination-prev disabled" href="#">
                      Previous
                    </a>
                    <ul className="pagination listjs-pagination mb-0"><li className="active"><a className="page" href="#" data-i={1} data-page={8}>1</a></li><li><a className="page" href="#" data-i={2} data-page={8}>2</a></li><li><a className="page" href="#" data-i={3} data-page={8}>3</a></li></ul>
                    <a className="page-item pagination-next" href="#">
                      Next
                    </a>
                  </div>
                </div>
              </div>
              {/* Modal */}
              <div className="modal fade flip" id="deleteOrder" tabIndex={-1} aria-labelledby="deleteOrderLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-body p-5 text-center">
                      <lord-icon src="https://cdn.lordicon.com/gsqxdxog.json" trigger="loop" colors="primary:#405189,secondary:#f06548" style={{"width":"90px","height":"90px"}} />
                      <div className="mt-4 text-center">
                        <h4>You are about to delete a order ?</h4>
                        <p className="text-muted fs-15 mb-4">Deleting your order will remove all of your information from our database.</p>
                        <div className="hstack gap-2 justify-content-center remove">
                          <button className="btn btn-link link-success fw-medium text-decoration-none" id="deleteRecord-close" data-bs-dismiss="modal"><i className="ri-close-line me-1 align-middle" /> Close</button>
                          <button className="btn btn-danger" id="delete-record">Yes, Delete It</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*end modal */}
            </div>
          </div>
        </div>
        {/*end col*/}
      </div>
      {/*end row*/}
    </div>{/* container-fluid */}
  </div>
  {/* End Page-content */}
  <footer className="footer">
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6">
          2025 © Velzon.
        </div>
        <div className="col-sm-6">
          <div className="text-sm-end d-none d-sm-block">
            Design &amp; Develop by Themesbrand
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
  )
}
