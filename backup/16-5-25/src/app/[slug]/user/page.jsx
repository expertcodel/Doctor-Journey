import React from 'react'

export default function Page() {
    return (

        <div className="main-content">
            <div className="page-content">
            <div className="container-fluid">
            <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
            <h4 className="mb-sm-0">Apply for Organization</h4>
           
          </div>
        </div>
      </div>
                <form className="row g-3" >

                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Organization Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullnameInput"
                            placeholder=" Organization Name"
                            name='Organization'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Incorporation Number
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullnameInput"
                            placeholder="Incorporation Number"
                            name='Incorporation'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Attachments
                        </label>
                        <input
                            type="file"
                            className="form-control"
                            id="fullnameInput"
                            placeholder="Publisher Name"
                            name='Attachments'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Branch
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullnameInput"
                            placeholder="Rights"
                            name='Rights'
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="fullnameInput" className="form-label">
                            Organization Type
                        </label>

                        <select name="frequency" id="" className="form-control"
                        >
                            <option value="select" selected>Select</option>
                            <option value="select" >Individual</option>
                            <option value="Yearly">Organization</option>
                           
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="form-control" className="form-label">
                            Billing address
                        </label>
                        <textarea
                            name='billing address'
                            className="form-control"
                            rows={5}
                            placeholder="Billing address"
                        />
                    </div>


                    <div className="col-12">
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </div>
                    </div>
                    {/* {
             message!=="" && <div>{message}</div>
          } */}
                </form>
            </div>
           </div>
        </div>
    )
}
