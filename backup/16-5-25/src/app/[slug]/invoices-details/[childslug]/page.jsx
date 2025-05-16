"use client"

import { useEffect , useState} from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function Page() {


  const [invoiceDetail,setInvoicedetail]=useState({});
  const {slug}=useParams();
  useEffect(() => {
    
    const fetching=async()=>{
        
         const option={
            method:'POST',
            url:`${process.env.NEXT_PUBLIC_BASE_URL}/api/invoice-details`,
            data:{
                 buyerId:slug
            }
         }

         const response=await axios.request(option);
         if(response.data.status)
         {
          setInvoicedetail(response.data.invoice);
         }
    }

    fetching();
  }, [])
  

  const printInvoice=()=>{
    
    window.print();
  }


  return (
    <div className="main-content">
  
  
  {
    
  Object.keys(invoiceDetail).length > 0 && <div className="page-content">
    <div className="container-fluid">
      {/* start page title */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
            <h4 className="mb-sm-0">Invoice Details</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item"><a href="javascript: void(0);">Invoices</a></li>
                <li className="breadcrumb-item active">Invoice Details</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row justify-content-center">
        <div className="col-xxl-9">
          <div className="card" id="demo">
            <div className="row">
              <div className="col-lg-12">
                <div className="card-header border-bottom-dashed p-4">
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <img src="/assets/images/logo-dark.png" className="card-logo card-logo-dark" alt="logo dark" height={17} />
                      <img src="/assets/images/logo-light.png" className="card-logo card-logo-light" alt="logo light" height={17} />
                      <div className="mt-sm-5 mt-4">
                        <h6 className="text-muted text-uppercase fw-semibold">Address</h6>
                        <p className="text-muted mb-1" id="address-details">{invoiceDetail.itemDetails.billingaddress.Address}</p>
                        <p className="text-muted mb-0" id="zip-code">90201</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-sm-0 mt-3">
                      <h6><span className="text-muted fw-normal">Legal Registration No:</span><span id="legal-register-no">987654</span></h6>
                      <h6><span className="text-muted fw-normal">Email:</span><span id="email">{invoiceDetail.email}</span></h6>
                      <h6><span className="text-muted fw-normal">Website:</span> <a href="www.themesbrand.com" className="link-primary" target="_blank" id="website">www.themesbrand.com</a></h6>
                      <h6 className="mb-0"><span className="text-muted fw-normal">Contact No: </span><span id="contact-no">{invoiceDetail.itemDetails.billingaddress.MobileNumber}</span></h6>
                    </div>
                  </div>
                </div>
                {/*end card-header*/}
              </div>{/*end col*/}
              <div className="col-lg-12">
                <div className="card-body p-4">
                  <div className="row g-3">
                    <div className="col-lg-3 col-6">
                      <p className="text-muted mb-2 text-uppercase fw-semibold">Invoice No</p>
                      <h5 className="fs-14 mb-0"><span id="invoice-no">{invoiceDetail.invoiceNumber}</span></h5>
                    </div>
                    {/*end col*/}
                    <div className="col-lg-3 col-6">
                      <p className="text-muted mb-2 text-uppercase fw-semibold">Date</p>
                      <h5 className="fs-14 mb-0"><span id="invoice-date">{invoiceDetail.date}</span> <small className="text-muted" id="invoice-time">9:58 PM</small></h5>
                    </div>
                    {/*end col*/}
                    <div className="col-lg-3 col-6">
                      <p className="text-muted mb-2 text-uppercase fw-semibold">Payment Status</p>
                      <span className="badge bg-success-subtle text-success fs-11" id="payment-status">Paid</span>
                    </div>
                    {/*end col*/}
                    <div className="col-lg-3 col-6">
                      <p className="text-muted mb-2 text-uppercase fw-semibold">Total Amount</p>
                      <h5 className="fs-14 mb-0">$<span id="total-amount">{invoiceDetail.itemDetails.totalPrice}</span></h5>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </div>
                {/*end card-body*/}
              </div>{/*end col*/}
              <div className="col-lg-12">
                <div className="card-body p-4 border-top border-top-dashed">
                  <div className="row g-3">
                    <div className="col-6">
                      <h6 className="text-muted text-uppercase fw-semibold mb-3">Billing Address</h6>
                      <p className="fw-medium mb-2" id="billing-name">{invoiceDetail.itemDetails.billingaddress.FullName}</p>
                      <p className="text-muted mb-1" id="billing-address-line-1">{invoiceDetail.itemDetails.billingaddress.Address}</p>
                      <p className="text-muted mb-1"><span>Phone: +</span><span id="billing-phone-no">{invoiceDetail.itemDetails.billingaddress.MobileNumber}</span></p>
                      <p className="text-muted mb-0"><span>Tax: </span><span id="billing-tax-no">12-3456789</span> </p>
                    </div>
                    {/*end col*/}
                    <div className="col-6">
                      <h6 className="text-muted text-uppercase fw-semibold mb-3">Shipping Address</h6>
                      <p className="fw-medium mb-2" id="shipping-name">{invoiceDetail.itemDetails.shippingaddress.FullName}</p>
                      <p className="text-muted mb-1" id="shipping-address-line-1">{invoiceDetail.itemDetails.shippingaddress.Address}</p>
                      <p className="text-muted mb-1"><span>Phone: +</span><span id="shipping-phone-no">{invoiceDetail.itemDetails.shippingaddress.MobileNumber}</span></p>
                    </div>
                    {/*end col*/}
                  </div>
                  {/*end row*/}
                </div>
                {/*end card-body*/}
              </div>{/*end col*/}
              <div className="col-lg-12">
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-borderless text-center table-nowrap align-middle mb-0">
                      <thead>
                        <tr className="table-active">
                          <th scope="col" >#</th>
                          <th scope="col">Product Details</th>
                          {/* <th scope="col">Rate</th> */}
                          {/* <th scope="col">Quantity</th> */}
                          <th scope="col" className="text-end">Amount</th>
                        </tr>
                      </thead>
                      { invoiceDetail.itemDetails.journaldetails.map((item1,i)=><tbody id="products-list" key={item1.id}>
                        <tr>
                          <th scope="row">{i+1}</th>
                          <td className="text-start">
                            <span className="fw-medium">{item1.JournalName}</span>
                            {/* <p className="text-muted mb-0">Graphic Print Men &amp; Women Sweatshirt</p> */}
                          </td>
                          <td>{item1.Price}</td>
                          {/* <td>02</td> */}
                          {/* <td className="text-end">$239.98</td> */}
                        </tr>
                      </tbody>)}
                    </table>{/*end table*/}
                  </div>
                  <div className="border-top border-top-dashed mt-2">
                    <table className="table table-borderless table-nowrap align-middle mb-0 ms-auto" style={{"width":"250px"}}>
                      <tbody>
                        <tr>
                          <td>Sub Total</td>
                          <td className="text-end">$699.96</td>
                        </tr>
                        <tr>
                          <td>Estimated Tax (12.5%)</td>
                          <td className="text-end">${invoiceDetail.itemDetails.gst}</td>
                        </tr>
                        <tr>
                          <td>Discount <small className="text-muted">(VELZON15)</small></td>
                          <td className="text-end">- $53.99</td>
                        </tr>
                        <tr>
                          <td>Shipping Charge</td>
                          <td className="text-end">$65.00</td>
                        </tr>
                        <tr className="border-top border-top-dashed fs-15">
                          <th scope="row">Total Amount</th>
                          <th className="text-end">{invoiceDetail.itemDetails.price}</th>
                        </tr>
                      </tbody>
                    </table>
                    {/*end table*/}
                  </div>
                  <div className="mt-3">
                    <h6 className="text-muted text-uppercase fw-semibold mb-3">Payment Details:</h6>
                    <p className="text-muted mb-1">Payment Method: <span className="fw-medium" id="payment-method">Mastercard</span></p>
                    <p className="text-muted mb-1">Card Holder: <span className="fw-medium" id="card-holder-name">David Nichols</span></p>
                    <p className="text-muted mb-1">Card Number: <span className="fw-medium" id="card-number">xxx xxxx xxxx 1234</span></p>
                    <p className="text-muted">Total Amount: <span className="fw-medium" id>$ </span><span id="card-total-amount">755.96</span></p>
                  </div>
                  <div className="mt-4">
                    <div className="alert alert-info">
                      <p className="mb-0"><span className="fw-semibold">NOTES:</span>
                        <span id="note">All accounts are to be paid within 7 days from receipt of invoice. To be paid by cheque or
                          credit card or direct payment online. If account is not paid within 7
                          days the credits details supplied as confirmation of work undertaken
                          will be charged the agreed quoted fee noted above.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                    <button onClick={printInvoice} className="btn btn-success"><i className="ri-printer-line align-bottom me-1" /> Print</button>
                    <a href="javascript:void(0);" className="btn btn-primary"><i className="ri-download-2-line align-bottom me-1" /> Download</a>
                  </div>
                </div>
                {/*end card-body*/}
              </div>{/*end col*/}
            </div>{/*end row*/}
          </div>
          {/*end card*/}
        </div>
        {/*end col*/}
      </div>
      {/*end row*/}
    </div>{/* container-fluid */}
  </div>
  
  }
  
  
  
  
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
