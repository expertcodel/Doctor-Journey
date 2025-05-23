"use client"
import React, { useState } from 'react'
import axios from 'axios'
import dynamic from 'next/dynamic'


function Page() {

  const [message,setMessage]=useState("");
  async function saveJournal(e) {

    e.preventDefault(); 
    //console.log(e.target.frequency.value.trim());
    

    const option =
    {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/superAdmin/createJournal`,
      data:
      {
        journalsName:e.target.Journalname.value.trim(),
        journalsIsbn:e.target.ISBN.value.trim(),
        publisherName:e.target.Publishername.value.trim(),
        rights:e.target.Rights.value.trim(),
        frequency:e.target.frequency.value.trim(),
      }
    }

    const response=await axios.request(option)
    setMessage(response.data.message);

  }


  return (
    
    <div className="main-content">
    <div className="page-content">
    <form className="row g-3" onSubmit={saveJournal}>

          <div className="col-md-6">
            <label htmlFor="fullnameInput" className="form-label">
              Journal Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullnameInput"
              placeholder="Journal Name"
              name='Journalname'
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="fullnameInput" className="form-label">
             ISBN
            </label>
            <input
              type="text"
              className="form-control"
              id="fullnameInput"
              placeholder="ISBN"
              name='ISBN'
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="fullnameInput" className="form-label">
              Publisher Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullnameInput"
              placeholder="Publisher Name"
              name='Publishername'
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="fullnameInput" className="form-label">
              Rights
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
              frequency
            </label>
          
            <select name="frequency" id=""  className="form-control" 
            >
              <option value="select" selected>Select</option>
              <option value="Yearly">Yearly</option>
              <option value="Yearly">Half Yearly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="form-control" className="form-label">
            Description
            </label>
            <textarea
              name='Description'
              className="form-control"
              rows={5}
              placeholder="Description"
            />
          </div>

         
          <div className="col-12">
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
          {
             message!=="" && <div>{message}</div>
          }
    </form>
    </div>
    </div>
  )
}

export default Page