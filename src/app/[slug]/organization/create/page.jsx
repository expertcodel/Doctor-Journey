"use client"
import React from 'react'
import dynamic from 'next/dynamic';
import { useState, useRef, useMemo } from 'react';
import Image from 'next/image'
import AdminFooter from '../../../../component/AdminFooter.jsx'
import { useRouter } from 'next/navigation';
import { extractErrorMessage } from '../../../../utils/errorMessage'
import OrganizationForm from '../../../../component/OrganizationForm.jsx'



export default function Page() {



    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">


                    <div className="row">
                        <div className="col-12">

                            {/*end card*/}
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-5">
                                        <div className="flex-grow-1">
                                            <h5 className="card-title mb-0">Complete Organization Profile</h5>
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

                        <OrganizationForm />

                    </div>


                </div>

            </div>

            <AdminFooter />

        </div>
    )
}
