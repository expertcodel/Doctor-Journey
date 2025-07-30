"use client"
import React from 'react'
import dynamic from 'next/dynamic';
import { useState, useRef, useMemo, useEffect } from 'react';
import Image from 'next/image'
import AdminFooter from './AdminFooter.jsx'
import { useRouter } from 'next/navigation';
import { extractErrorMessage } from '../utils/errorMessage'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import DoctorFormUpdate from './DoctorFormUpdate.jsx'
export default function DoctorUpdate({ doctorDetail }) {



  

   



    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">




                    <div className="row">
                        <div className="col-12 mb-5">

                            {/*end card*/}
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title mb-0">Update Doctor Profile</h5>
                                        </div>

                                    </div>
                                    <div className="progress animated-progress custom-progress progress-label">
                                        <div
                                            className="progress-bar bg-danger"
                                            role="progressbar"
                                            style={{ width: "30%" }}
                                            aria-valuenow={30}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            <div className="label">30%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <DoctorFormUpdate doctorDetail={doctorDetail}/>

                    </div>










                </div>
                {/* container-fluid */}
            </div>
            {/* End Page-content */}

            <AdminFooter />
           
        </div>
    )
}
