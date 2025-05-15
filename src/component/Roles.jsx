"use client"
import React from 'react'
import axios from 'axios';
import { UniversalContext } from './context';
function Roles({ permissions, setPermissions, usertype }) {

    // const { updateRole, setUpdaterole } = UniversalContext();
    const updateRole=true
    const managePermissions = (idx) => {
        setPermissions(permissions.map((item, i) => {

            if (i === idx) {
                if (item.allowed) {
                    item.allowed = false;
                }
                else {

                    item.allowed = true;

                }


            }

            return item;

        }))

    }

    const updatePermission = async () => {

        const option = {

            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/role/updateRole`,
            data: {

                usertype,
                access: permissions

            }
        }

        const response = await axios.request(option);
        if (response.data.status) {
            setUpdaterole(!updateRole);
        }
    }

    return (


        <>



            <table className="table table-borderless align-middle table-nowrap mb-0" style={{ backgroundColor: "#ffffff" }}>
                <thead>
                    <tr>
                        <th scope="col">Action</th>
                        <th scope="col">Permissions</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                {
                    permissions.map((item, i) =>
                        <tbody key={i} >


                            <tr >
                                <td>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="cardtableCheck01"

                                            checked={item.allowed}
                                            onClick={() => managePermissions(i)}
                                        />
                                        <label className="form-check-label" htmlFor="cardtableCheck01" />
                                    </div>
                                </td>

                                <td>{item.role}</td>

                                <td>
                                    {
                                        item.allowed ?
                                            <span className="badge bg-success">Active</span> :
                                            <span className="badge bg-danger">inActive</span>
                                    }
                                </td>
                            </tr>

                           



                        </tbody>)


                }

                {/* Base Example */}



            </table>



            

            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffff' }}>
                <button type="button" class="btn btn-warning" onClick={updatePermission} style={{ marginBottom: '20px' }}>Submit</button>
            </div>
        </>



    )
}

export default Roles



{/* <table className="table table-borderless align-middle table-nowrap mb-0" style={{ backgroundColor: "#fff" }}> */ }
{/* <thead>
    <tr>
        <th scope="col">Action</th>
        <th scope="col">Permissions</th>
        <th scope="col">Status</th>
    </tr>
</thead> */}
{/* {
    permissions.map((item, i) =>
        <tbody key={i}>


            <tr>
                <td>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="cardtableCheck01"

                            checked={item.allowed}
                            onClick={() => managePermissions(i)}
                        />
                        <label className="form-check-label" htmlFor="cardtableCheck01" />
                    </div>
                </td>

                <td>{item.role}</td>

                <td>
                    {
                        item.allowed ?
                            <span className="badge bg-success">Active</span> :
                            <span className="badge bg-danger">inActive</span>
                    }
                </td>
            </tr>



        </tbody>)


} */}

{/* Base Example */ }



// </table>