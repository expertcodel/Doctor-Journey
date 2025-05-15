"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { UniversalContext } from "@/component/context";

function Page() {

    // const [data, setData] = useState([]);
    // const [userList, setUserlist] = useState([]);
    // // const { userData } = UniversalContext();
    // const userData ={}
    // const [userdata, setUserdata] = useState({ name: "", email: "", number: "", joiningDate: "", status: "", usertype: "" })
    // const [loading, setLoading] = useState(false);
    // const [success, setSuccess] = useState(false);
    // useEffect(() => {



    //     const fetching = async () => {

    //         const option =
    //         {
    //             method: 'POST',
    //             url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/getUsers`,

    //             headers: {
    //                 'api_key': process.env.NEXT_PUBLIC_SECRET_KEY
    //             }
    //         }

    //         const response = await axios.request(option);
    //         if (response.data.status) {

    //             setData(response.data.getAllusers);


    //         }
    //         else {
    //             console.log(response.data.message);

    //         }


    //     }

    //     fetching();

    // }, [success])

    // const setIndividualdata = (item) => {

    //     setUserdata({ name: item.name, email: item.email, number: item.mobile_number, joiningDate: item.joining_date, status: item.user_status, usertype: item.usertype })

    // }

    // const searchUser = async (query) => {

    //     console.log(query.trim().toLowerCase());
        
    //     const option = {

    //         method: 'POST',
    //         url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/userSearch`,
    //         data: {
    //             input: query.trim().toLowerCase()
    //         }
    //     }
        
    //     if(query!=="")
    //     {

    //         const response = await axios.request(option);
    //         console.log(response.data.response);
            
    //         if (response.data.status) {
    //             setUserlist(response.data.response);
    //         }

    //     }
    //     else{

    //         setUserlist([]);
    //     }
       

    // }

    // const updateDetails = async (e) => {


    //     e.preventDefault();
    //     const name = e.target.name.value;
    //     const email = e.target.email.value;
    //     const mobile_number = e.target.number.value;
    //     const usertype = e.target.usertype.value;
    //     const profile_img = "";
    //     const userId = userData.userId;
    //     const option = {

    //         method: 'POST',
    //         url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/updateUser`,
    //         data: {
    //             name, email, mobile_number, usertype, profile_img, userId
    //         }
    //     }

    //     setLoading(true);
    //     const response = await axios.request(option);

    //     if (response.data.status) {
    //         setLoading(false);
    //         setSuccess(true);
    //     }
    // }
    return (

        // <div>


        //     <div className="main-content overflow-hidden">

        //         <div className="page-content">
        //             <div className="container-fluid">

        //                 <div className="row">
        //                     <div className="col-12">
        //                         <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
        //                             <h4 className="mb-sm-0">Listjs</h4>
        //                             <div className="page-title-right">
        //                                 <ol className="breadcrumb m-0">
        //                                     <li className="breadcrumb-item">
        //                                         <a href="javascript: void(0);">Tables</a>
        //                                     </li>
        //                                     <li className="breadcrumb-item active">Listjs</li>
        //                                 </ol>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>


        //                 <div className="row">
        //                     <div className="col-lg-12">
        //                         <div className="card">
        //                             <div className="card-header">
        //                                 <h4 className="card-title mb-0">Add, Edit &amp; Remove</h4>
        //                             </div>
        //                             {/* end card header */}
        //                             <div className="card-body">
        //                                 <div className="listjs-table" id="customerList">
        //                                     <div className="row g-4 mb-3">
        //                                         <div className="col-sm-auto">
        //                                             <div>
        //                                                 <button
        //                                                     type="button"
        //                                                     className="btn btn-success add-btn"
        //                                                     data-bs-toggle="modal"
        //                                                     id="create-btn"
        //                                                     data-bs-target="#showModal"
        //                                                 >
        //                                                     <i className="ri-add-line align-bottom me-1" /> Add
        //                                                 </button>
        //                                                 <button
        //                                                     className="btn btn-soft-danger"
        //                                                     onclick="deleteMultiple()"
        //                                                 >
        //                                                     <i className="ri-delete-bin-2-line" />
        //                                                 </button>
        //                                             </div>
        //                                         </div>
        //                                         <div className="col-sm">
        //                                             <div className="d-flex justify-content-sm-end">
        //                                                 <div className="search-box ms-2">
        //                                                     <input
        //                                                         type="text"
        //                                                         className="form-control search"
        //                                                         placeholder="Search..."
        //                                                         onChange={(e) => searchUser(e.target.value)}
        //                                                     />
        //                                                     <i className="ri-search-line search-icon" />
        //                                                 </div>
        //                                             </div>
        //                                         </div>
        //                                     </div>

        //                                     {

        //                                         userList.length > 0 ? userList.map((item) =>
        //                                             <div className="table-responsive table-card mt-3 mb-1" key={item.id}>
        //                                                 <table
        //                                                     className="table align-middle table-nowrap"
        //                                                     id="customerTable"
        //                                                 >
        //                                                     <thead className="table-light">
        //                                                         <tr>
        //                                                             <th scope="col" style={{ width: 50 }}>
        //                                                                 <div className="form-check">
        //                                                                     <input
        //                                                                         className="form-check-input"
        //                                                                         type="checkbox"
        //                                                                         id="checkAll"
        //                                                                         defaultValue="option"
        //                                                                     />
        //                                                                 </div>
        //                                                             </th>
        //                                                             <th className="sort" data-sort="customer_name">
        //                                                                 User
        //                                                             </th>
        //                                                             <th className="sort" data-sort="email">
        //                                                                 Email
        //                                                             </th>
        //                                                             <th className="sort" data-sort="phone">
        //                                                                 Phone
        //                                                             </th>
        //                                                             <th className="sort" data-sort="date">
        //                                                                 Joining Date
        //                                                             </th>
        //                                                             <th className="sort" data-sort="status">
        //                                                                 User Status
        //                                                             </th>
        //                                                             <th className="sort" data-sort="action">
        //                                                                 Action
        //                                                             </th>
        //                                                         </tr>
        //                                                     </thead>
        //                                                     <tbody className="list form-check-all">
        //                                                         <tr>
        //                                                             <td>
        //                                                                 <div className="d-flex gap-2 align-items-center">
        //                                                                     <div className="flex-shrink-0">
        //                                                                         <img src={item.profile_img} alt className="avatar-xs rounded-circle" />
        //                                                                     </div>

        //                                                                 </div>
        //                                                             </td>

        //                                                             <td className="customer_name">{item.name.toUpperCase()}</td>
        //                                                             <td className="email">{item.email}</td>
        //                                                             <td className="phone">{item.mobile_number}</td>
        //                                                             <td className="date">{item.joining_date}</td>
        //                                                             <td className="status">
        //                                                                 <span className="badge bg-success-subtle text-success text-uppercase">
        //                                                                     {item.user_status}
        //                                                                 </span>
        //                                                             </td>
        //                                                             <td>
        //                                                                 <div className="d-flex gap-2">
        //                                                                     <div className="edit">
        //                                                                         <button
        //                                                                             className="btn btn-sm btn-success edit-item-btn"
        //                                                                             data-bs-toggle="modal"
        //                                                                             data-bs-target="#showModal"
        //                                                                             onClick={() => setIndividualdata(item)}
        //                                                                         >
        //                                                                             Edit
        //                                                                         </button>
        //                                                                     </div>
        //                                                                     <div className="remove">
        //                                                                         <button
        //                                                                             className="btn btn-sm btn-danger remove-item-btn"
        //                                                                             data-bs-toggle="modal"
        //                                                                             data-bs-target="#deleteRecordModal"
        //                                                                         >
        //                                                                             Remove
        //                                                                         </button>
        //                                                                     </div>
        //                                                                 </div>
        //                                                             </td>
        //                                                         </tr>
        //                                                     </tbody>
        //                                                 </table>
        //                                                 <div className="noresult" style={{ display: "none" }}>
        //                                                     <div className="text-center">
        //                                                         <lord-icon
        //                                                             src="https://cdn.lordicon.com/msoeawqm.json"
        //                                                             trigger="loop"
        //                                                             colors="primary:#121331,secondary:#08a88a"
        //                                                             style={{ width: 75, height: 75 }}
        //                                                         />
        //                                                         <h5 className="mt-2">Sorry! No Result Found</h5>
        //                                                         <p className="text-muted mb-0">
        //                                                             We've searched more than 150+ Orders We did not find any
        //                                                             orders for you search.
        //                                                         </p>
        //                                                     </div>
        //                                                 </div>
        //                                             </div>  ) :<p>Type something...</p>

        //                                     }
        //                                     <div className="d-flex justify-content-end">
        //                                         <div
        //                                             className="pagination-wrap hstack gap-2"
        //                                             style={{ display: "none" }}
        //                                         >
        //                                             <a
        //                                                 className="page-item pagination-prev disabled"
        //                                                 href="javascript:void(0);"
        //                                             >
        //                                                 Previous
        //                                             </a>
        //                                             <ul className="pagination listjs-pagination mb-0">
        //                                                 <li className="active">
        //                                                     <a className="page" href="#" data-i={1} data-page={8}>
        //                                                         1
        //                                                     </a>
        //                                                 </li>
        //                                             </ul>
        //                                             <a
        //                                                 className="page-item pagination-next disabled"
        //                                                 href="javascript:void(0);"
        //                                             >
        //                                                 Next
        //                                             </a>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                             {/* end card */}
        //                         </div>
        //                         {/* end col */}
        //                     </div>
        //                     {/* end col */}
        //                 </div>





        //             </div>
        //         </div>

        //     </div>

        //     <div
        //         className="modal fade"
        //         id="showModal"
        //         tabIndex={-1}
        //         aria-labelledby="exampleModalLabel"
        //         aria-hidden="true"
        //     >
        //         <div className="modal-dialog modal-dialog-centered">
        //             <div className="modal-content">
        //                 <div className="modal-header bg-light p-3">
        //                     <h5 className="modal-title" id="exampleModalLabel" />
        //                     <button
        //                         type="button"
        //                         className="btn-close"
        //                         data-bs-dismiss="modal"
        //                         aria-label="Close"
        //                         id="close-modal"
        //                     />
        //                 </div>
        //                 <form className="tablelist-form" autoComplete="off" onSubmit={updateDetails}>
        //                     <div className="modal-body">
        //                         <div className="mb-3" id="modal-id" style={{ display: "none" }}>
        //                             <label htmlFor="id-field" className="form-label">
        //                                 ID
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="id-field"
        //                                 className="form-control"
        //                                 placeholder="ID"
        //                                 readOnly=""
        //                             />
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="customername-field" className="form-label">
        //                                 Username
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="customername-field"
        //                                 className="form-control"
        //                                 placeholder="Enter Name"
        //                                 required=""
        //                                 name="name"
        //                                 defaultValue={userdata.name}
        //                             />
        //                             <div className="invalid-feedback">
        //                                 Please enter a user name.
        //                             </div>
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="customername-field" className="form-label">
        //                                 Usertype
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="customername-field"
        //                                 className="form-control"
        //                                 placeholder="Enter Name"
        //                                 required=""
        //                                 name="usertype"
        //                                 defaultValue={userdata.usertype}
        //                             />
        //                             <div className="invalid-feedback">
        //                                 Please enter a user type.
        //                             </div>
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="email-field" className="form-label">
        //                                 Email
        //                             </label>
        //                             <input
        //                                 type="email"
        //                                 id="email-field"
        //                                 className="form-control"
        //                                 placeholder="Enter Email"
        //                                 required=""
        //                                 name="email"
        //                                 defaultValue={userdata.email}
        //                             />
        //                             <div className="invalid-feedback">Please enter an email.</div>
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="phone-field" className="form-label">
        //                                 Phone
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="phone-field"
        //                                 className="form-control"
        //                                 placeholder="Enter Phone no."
        //                                 required=""
        //                                 name="number"
        //                                 defaultValue={userdata.number}
        //                             />
        //                             <div className="invalid-feedback">Please enter a phone.</div>
        //                         </div>
        //                         <div className="mb-3">
        //                             <label htmlFor="date-field" className="form-label">
        //                                 Joining Date
        //                             </label>
        //                             <input
        //                                 type="text"
        //                                 id="date-field"
        //                                 className="form-control"
        //                                 placeholder="Select Date"
        //                                 required=""
        //                                 defaultValue={userdata.joiningDate}
        //                             />
        //                             <div className="invalid-feedback">Please select a date.</div>
        //                         </div>
        //                         <div>
        //                             <label htmlFor="status-field" className="form-label">
        //                                 Status
        //                             </label>
        //                             <select
        //                                 className="form-control"
        //                                 data-trigger=""
        //                                 name="status-field"
        //                                 id="status-field"
        //                                 required=""
        //                                 onChange={(e) => console.log(e.target.value)}
        //                             >
        //                                 <option value={userdata.status} selected>{userdata.status}</option>

        //                                 {userdata.status === 'Active' ? <option value="Block">Block</option> : <option value="Active">Active</option>}

        //                             </select>
        //                         </div>
        //                     </div>
        //                     <div className="modal-footer">
        //                         <div className="hstack gap-2 justify-content-end">
        //                             <button
        //                                 type="button"
        //                                 className="btn btn-light"
        //                                 data-bs-dismiss="modal"
        //                             >
        //                                 Close
        //                             </button>
        //                             {
        //                                 loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><div className="spinner-border text-success" role="status">
        //                                     <span className="sr-only">Loading...</span>
        //                                 </div> </div> :
        //                                     <button type="submit" className="btn btn-success" id="add-btn" >
        //                                         Update
        //                                     </button>
        //                             }
        //                             {/* <button type="button" class="btn btn-success" id="edit-btn">Update</button> */}
        //                         </div>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>


        //     <div
        //         className="modal fade zoomIn"
        //         id="deleteRecordModal"
        //         tabIndex={-1}
        //         aria-hidden="true"
        //     >
        //         <div className="modal-dialog modal-dialog-centered">
        //             <div className="modal-content">
        //                 <div className="modal-header">
        //                     <button
        //                         type="button"
        //                         className="btn-close"
        //                         data-bs-dismiss="modal"
        //                         aria-label="Close"
        //                         id="btn-close"
        //                     />
        //                 </div>
        //                 <div className="modal-body">
        //                     <div className="mt-2 text-center">
        //                         <lord-icon
        //                             src="https://cdn.lordicon.com/gsqxdxog.json"
        //                             trigger="loop"
        //                             colors="primary:#f7b84b,secondary:#f06548"
        //                             style={{ width: 100, height: 100 }}
        //                         />
        //                         <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
        //                             <h4>Are you Sure ?</h4>
        //                             <p className="text-muted mx-4 mb-0">
        //                                 Are you Sure You want to Remove this Record ?
        //                             </p>
        //                         </div>
        //                     </div>
        //                     <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
        //                         <button
        //                             type="button"
        //                             className="btn w-sm btn-light"
        //                             data-bs-dismiss="modal"
        //                         >
        //                             Close
        //                         </button>
        //                         <button
        //                             type="button"
        //                             className="btn w-sm btn-danger "
        //                             id="delete-record"
        //                         >
        //                             Yes, Delete It!
        //                         </button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>


        // </div>
        <div></div>
    );
}

export default Page