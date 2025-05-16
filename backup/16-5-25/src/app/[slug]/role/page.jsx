"use client"
import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Roles from '../../../component/Roles'
import { UniversalContext } from '@/component/context'
function Page() {

    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [rolePage, setRolepage] = useState(false);
    const [usertype, setUsertype] = useState("");
    const [role, setRole] = useState("");
    const [Message, setMessage] = useState("");
    const [succMessage, setSuccmessage] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [deleterole,setDeleterole]=useState(false);
    const [addrole,setAddrole]=useState(false);
    const {updateRole,setUpdaterole}=UniversalContext()

    useEffect(() => {

        const fetching = async () => {
            const option = {

                method: 'GET',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/role/getRole`,

            }

            const response = await axios.request(option);
            setRoles(response.data.allRoles);

        }

        fetching()
    }, [addrole,deleterole])

    const managePermissions = (permission) => {


        setPermissions(permission.access);
        setUsertype(permission.usertype);
        setRolepage(true)
    }

    const addRole = async () => {

        setLoading(true);
        const option =
        {
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/role/createRole`,
            data: {
                usertype: role.trim()
            }
        }

        const response = await axios.request(option);
        setLoading(false);
        if (response.data.status) 
        {
            setAddrole(!addrole)
            setSuccmessage(1);
            setMessage(response.data.message);

        }
        else{

            setSuccmessage(0);
            setMessage(response.data.message);
        }


    }

    const deleteRole=async(usertype,status)=>
    {
         
        const option =
        {
            method: 'DELETE',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/role/deleteRole`,
            data: {
                usertype,
                status
            }
        }
        
        const response = await axios.request(option);
        if(response.data.status)
        {
           setDeleterole(!deleterole);
           setUpdaterole(!updateRole);
        }

    }



    return (

        <div className="main-content" >

            <div className="page-content" >
                 
                 {
                
                !rolePage?
                <div style={{ marginBottom: '20px' }}><button className='btn btn-dark btn-rounded remove-item-btn' data-bs-toggle="modal"
                data-bs-target="#deletetable">+Add Role</button></div>:
                <div style={{ marginBottom: '20px' }}><button className='btn btn-dark btn-rounded remove-item-btn'  onClick={()=>setRolepage(false)}>Back</button></div>
                 }

                {!rolePage ?

                    <table className="table table-borderless align-middle table-nowrap mb-0 " style={{backgroundColor:"#fff"}}>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Permissions</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        {

                            roles.length > 0 &&
                            roles.map((item, i) =>
                                <tbody key={item.id}>
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.usertype}</td>
                                        <td>{item.date}</td>
                                        <td><button type="button" className="btn btn-primary" data-mdb-ripple-init onClick={() => managePermissions(item)}>Manage</button></td>
                                        <td >
                                            {
                                                item.status ?
                                                <span className="badge bg-success-subtle text-success" >Active</span> :
                                                <span className="badge bg-danger-subtle text-danger" >Disabled</span>
                                            }
                                        </td>
                                        <td>
                                            <div className="hstack gap-3 fs-15">
                                                <a href="javascript:void(0);" className="link-primary">
                                                    <i className="ri-settings-4-line" />
                                                </a>
                                                <a href="javascript:void(0);" className="link-danger">
                                                    <i className="ri-delete-bin-5-line" onClick={()=>deleteRole(item.usertype,item.status)}/>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>

                                </tbody>
                            )}
                    </table>

                    : <Roles permissions={permissions} setPermissions={setPermissions} usertype={usertype} />
                }

            </div>

            {/* {
                updateRole && */}
            <div
                className="modal fade zoomIn"
                id="deletetable"
           >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"


                            />
                        </div>
                        <div className="modal-body">
                            <div className="mt-2 text-center">

                                <i class="ri-home-line ri-pencil-fill" style={{ fontSize: 'x-large' }}></i>
                                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">


                                    <div className="mb-3">
                                        <label htmlFor="useremail" className="form-label">
                                            Role Name <span className="text-danger">**</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter name"
                                            required
                                            onChange={(e) => setRole(e.target.value)}

                                        />
                                        <div className="invalid-feedback">Please enter name</div>
                                    </div>
                                    <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                                        <button
                                            type="button"
                                            className="btn w-sm btn-light"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>

                                        {
                                            loading ? <div style={{ display: 'flex', justifyContent: 'center' }}><div className="spinner-border text-success" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div> </div> :
                                                <>
                                                <button
                                                    type="button"
                                                    className="btn w-sm btn-danger "
                                                    onClick={addRole}
                                                >
                                                    submit
                                                </button>
                                                {
                                                    succMessage === 1 ?
                                                    <div style={{ color: 'green',display:'flex',alignItems:'center',justifyContent:'center'}}>{Message}</div> :
                                                    <div style={{ color: 'red',display:'flex',alignItems:'center',justifyContent:'center' }}>{Message}</div>
                                                }
                                               
                                                </>

                                        }


                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            {/* } */}
        </div>

    )
}

export default Page