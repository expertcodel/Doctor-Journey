// "use client"
// import axios from "axios";
//  import { useState, useEffect } from "react";
import React from 'react'
import Image from 'next/image'
import Link from "next/link";
import image1 from '../../public/assets/images/logo-sm.png'
import image2 from '../../public/assets/images/logo-dark.png'
import image3 from '../../public/assets/images/logo-sm.png'
import image4 from '../../public/assets/images/logo2 (1).png'
import image5 from '../../public/assets/images/users/avatar-1.jpg'
import { UniversalContext } from "./context.js";



export default  function Menubar({data}) {

 // const { data } = UniversalContext();
  
  // useEffect(() => {
  //   console.log( data,"menbar");
  // }, [])
  
  return (
    < div className="app-menu navbar-menu" >
      {/* LOGO */}
      <div className="navbar-brand-box">
        {/* Dark Logo*/}
        <a href="index.html" className="logo logo-dark">
          <span className="logo-sm">
            <Image src={image1} alt="" height={22} />
          </span>
          <span className="logo-lg">
            <Image src={image2} alt="" height={17} />
          </span>
        </a>
        {/* Light Logo*/}
        <a href="index.html" className="logo logo-light">
          <span className="logo-sm">
            <Image src={image3} alt="" height={22} />
          </span>
          <span className="logo-lg">
            <img src="/assets/images/logo2 (1).png" alt="" style={{ width: '57%', height: '57%' }} />
          </span>
        </a>
        <button
          type="button"
          className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
          id="vertical-hover"
        >
          <i className="ri-record-circle-line" />
        </button>
      </div>
      <div className="dropdown sidebar-user m-1 rounded">
        <button
          type="button"
          className="btn material-shadow-none"
          id="page-header-user-dropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="d-flex align-items-center gap-2">
            <Image
              className="rounded header-profile-user"
              src={image5}
              alt="Header Avatar"

            />
            <span className="text-start">
              <span className="d-block fw-medium sidebar-user-name-text">
                Anna Adame
              </span>
              <span className="d-block fs-14 sidebar-user-name-sub-text">
                <i className="ri ri-circle-fill fs-10 text-success align-baseline" />{" "}
                <span className="align-middle">Online</span>
              </span>
            </span>
          </span>
        </button>
        <div className="dropdown-menu dropdown-menu-end">
          {/* item*/}
          <h6 className="dropdown-header">Welcome Anna!</h6>
          <a className="dropdown-item" href="pages-profile.html">
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Profile</span>
          </a>
          <a className="dropdown-item" href="apps-chat.html">
            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Messages</span>
          </a>
          <a className="dropdown-item" href="apps-tasks-kanban.html">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Taskboard</span>
          </a>
          <a className="dropdown-item" href="pages-faqs.html">
            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Help</span>
          </a>
          <div className="dropdown-divider" />
          <a className="dropdown-item" href="pages-profile.html">
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">
              Balance : <b>$5971.67</b>
            </span>

          </a>
          <a className="dropdown-item" href="pages-profile-settings.html">
            <span className="badge bg-success-subtle text-success mt-1 float-end">
              New
            </span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Settings</span>
          </a>
          <a className="dropdown-item" href="auth-lockscreen-basic.html">
            <i className="mdi mdi-lock text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle">Lock screen</span>
          </a>
          <a className="dropdown-item" href="auth-logout-basic.html">
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
            <span className="align-middle" data-key="t-logout">
              Logout
            </span>
          </a>
        </div>
      </div>



      {

        <div
          id="scrollbar"
          data-simplebar="init"
          className="h-100 simplebar-scrollable-y"
        >
          <div className="simplebar-wrapper" style={{ margin: 0 }}>
            <div className="simplebar-height-auto-observer-wrapper">
              <div className="simplebar-height-auto-observer" />
            </div>
            <div className="simplebar-mask">
              <div className="simplebar-offset" style={{ right: 0, bottom: 0 }}>
                <div
                  className="simplebar-content-wrapper"
                  tabIndex={0}
                  role="region"
                  aria-label="scrollable content"
                  style={{ height: "100%", overflow: "hidden scroll" }}
                >


                  <div className="simplebar-content" style={{ padding: 0 }}>
                    <div className="container-fluid">
                      <div id="two-column-menu"></div>
                      <ul
                        className="navbar-nav"
                        id="navbar-nav"
                        data-simplebar="init"
                      >
                        <div className="simplebar-wrapper" style={{ margin: 0 }}>
                          <div className="simplebar-height-auto-observer-wrapper">
                            <div className="simplebar-height-auto-observer" />
                          </div>

                          <div className="simplebar-mask">
                            <div
                              className="simplebar-offset"
                              style={{ right: 0, bottom: 0 }}
                            >
                              <div
                                className="simplebar-content-wrapper"
                                tabIndex={0}
                                role="region"
                                aria-label="scrollable content"
                                style={{ height: "auto", overflow: "hidden" }}
                              >
                                <div
                                  className="simplebar-content"
                                  style={{ padding: 0 }}
                                >
                                  <li className="menu-title">
                                    <span data-key="t-menu">Menu</span>
                                  </li>
                                  {
                                    data.map((item, i) => {

                                      if (item.allowed) {


                                        {

                                          <span>{item.role}</span>
                                          return item?.path === 'scroll' ?
                                            <li className='nav-item' key={i}>
                                              <Link
                                                className="nav-link menu-link collapsed"
                                                href={`#sidebarDashboards1${i}`}
                                                data-bs-toggle="collapse"
                                                role="button"
                                                aria-expanded="false"
                                                aria-controls={`sidebarDashboards1${i}`}

                                              >
                                                <i className="ri-dashboard-2-line" />{" "}
                                                <span data-key="t-dashboards" >{item.role}</span>
                                              </Link>
                                              <div
                                                className="menu-dropdown collapse"
                                                id={`sidebarDashboards1${i}`}
                                                style={{}}
                                              >

                                                {
                                                  item?.child?.map((item1, i) =>
                                                    <ul className="nav nav-sm flex-column" key={i}>
                                                      {item1.path === 'scroll' ?
                                                        <li className="nav-item" >
                                                          <Link
                                                            href={`#sidebarCalendar${i}`}
                                                            className="nav-link collapsed"
                                                            data-bs-toggle="collapse"
                                                            role="button"
                                                            aria-expanded="false"
                                                            aria-controls="sidebarCalendar"
                                                            data-key="t-calender"
                                                          >
                                                            {item1?.role}
                                                          </Link>
                                                          {

                                                            item1.path === 'scroll' ?
                                                              <div className="menu-dropdown collapse" id={`sidebarCalendar${i}`} style={{}}>

                                                                {

                                                                  item1?.child?.map((item2, i) =>

                                                                    <ul className="nav nav-sm flex-column" key={i}>
                                                                      <li className="nav-item">
                                                                        <Link
                                                                          href={item2.path}
                                                                          className="nav-link"
                                                                          data-key="t-main-calender"
                                                                        >
                                                                          {" "}
                                                                          {item2.role}{" "}
                                                                        </Link>
                                                                      </li>

                                                                    </ul>

                                                                  )
                                                                }
                                                              </div> : <li className="nav-item">
                                                                <Link href="apps-chat.html" className="nav-link" data-key="t-chat">
                                                                  {" "}
                                                                  {item1.path}{" "}
                                                                </Link>
                                                              </li>

                                                          }
                                                        </li>
                                                        : <li className="nav-item" key={i}>
                                                          <Link href={item1.path} className="nav-link" data-key="t-chat">
                                                            {" "}
                                                            {item1.role}{" "}
                                                          </Link>
                                                        </li>
                                                      }
                                                    </ul>


                                                  )





                                                }



                                              </div>
                                            </li> :

                                            <li className="nav-item" key={i}>
                                              <Link href={item.path} className="nav-link" data-key="t-chat">
                                                {" "}
                                                <i className="ri-dashboard-2-line" />{" "}
                                                {item.role}{" "}
                                              </Link>
                                            </li>
                                        }
                                      }
                                    })}




                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="simplebar-placeholder"
                            style={{ width: 249, height: 827 }}
                          />
                        </div>
                        <div
                          className="simplebar-track simplebar-horizontal"
                          style={{ visibility: "hidden" }}
                        >
                          <div
                            className="simplebar-scrollbar"
                            style={{
                              width: 0,
                              display: "none",
                              transform: "translate3d(0px, 0px, 0px)"
                            }}
                          />
                        </div>
                        <div
                          className="simplebar-track simplebar-vertical"
                          style={{ visibility: "hidden" }}
                        >
                          <div
                            className="simplebar-scrollbar"
                            style={{ height: 0, display: "none" }}
                          />
                        </div>
                        <div className="simplebar-track simplebar-horizontal">
                          <div className="simplebar-scrollbar" />
                        </div>
                        <div className="simplebar-track simplebar-vertical">
                          <div className="simplebar-scrollbar" />
                        </div>
                        <div className="simplebar-track simplebar-horizontal">
                          <div className="simplebar-scrollbar" />
                        </div>
                        <div className="simplebar-track simplebar-vertical">
                          <div className="simplebar-scrollbar" />
                        </div>
                      </ul>
                    </div>
                   
                  </div>





                </div>
              </div>
            </div>
            <div
              className="simplebar-placeholder"
              style={{ width: 249, height: 827 }}
            />
          </div>
          <div
            className="simplebar-track simplebar-horizontal"
            style={{ visibility: "hidden" }}
          >
            <div
              className="simplebar-scrollbar"
              style={{
                width: 0,
                display: "none",
                transform: "translate3d(0px, 0px, 0px)"
              }}
            />
          </div>
          <div
            className="simplebar-track simplebar-vertical"
            style={{ visibility: "visible" }}
          >
            <div
              className="simplebar-scrollbar"
              style={{
                height: 451,
                transform: "translate3d(0px, 0px, 0px)",
                display: "block"
              }}
            />
          </div>
        </div>}

      <li className='nav-item' >

        <a
          className="nav-link menu-link collapsed"
          href="#sidebarDashboards1"
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="sidebarDashboards1"

        >
          <i className="ri-dashboard-2-line" />{" "}
          <span data-key="t-dashboards" ></span>
        </a>
        <div
          className="menu-dropdown collapse"
          //id=sidebarDashboards1${i}`}
          style={{}}
        >


          <ul className="nav nav-sm flex-column" >

            <li className="nav-item" >
              <a
                href="#sidebarCalendar"
                className="nav-link collapsed"
                data-bs-toggle="collapse"
                role="button"
                aria-expanded="false"
                aria-controls="sidebarCalendar"
                data-key="t-calender"
              >
                setting
              </a>

              <div className="menu-dropdown collapse" id="sidebarCalendar" style={{}}>


                <ul className="nav nav-sm flex-column" >
                  <li className="nav-item">
                    <a
                      href="apps-calendar.html"
                      className="nav-link"
                      data-key="t-main-calender"
                    >
                      {" "}

                    </a>
                  </li>

                </ul>







              </div>
            </li>
          </ul>
        </div>
      </li>





      <div className="sidebar-background" />
    </div>

    //   <div className="app-menu navbar-menu">
    //   {/* LOGO */}
    //   <div className="navbar-brand-box">
    //     {/* Dark Logo*/}
    //     <a href="index.html" className="logo logo-dark">
    //       <span className="logo-sm">
    //         <img src="/assets/images/logo-sm.png" alt height={22} />
    //       </span>
    //       <span className="logo-lg">
    //         <img src="/assets/images/logo-dark.png" alt height={17} />
    //       </span>
    //     </a>
    //     {/* Light Logo*/}
    //     <a href="index.html" className="logo logo-light">
    //       <span className="logo-sm">
    //         <img src="/assets/images/logo-sm.png" alt height={22} />
    //       </span>
    //       <span className="logo-lg">
    //         <img src="/assets/images/logo-light.png" alt height={17} />
    //       </span>
    //     </a>
    //     <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
    //       <i className="ri-record-circle-line" />
    //     </button>
    //   </div>
    //   <div className="dropdown sidebar-user m-1 rounded">
    //     <button type="button" className="btn material-shadow-none" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //       <span className="d-flex align-items-center gap-2">
    //         <img className="rounded header-profile-user" src="/assets/images/users/avatar-1.jpg" alt="Header Avatar" />
    //         <span className="text-start">
    //           <span className="d-block fw-medium sidebar-user-name-text">Anna Adame</span>
    //           <span className="d-block fs-14 sidebar-user-name-sub-text"><i className="ri ri-circle-fill fs-10 text-success align-baseline" /> <span className="align-middle">Online</span></span>
    //         </span>
    //       </span>
    //     </button>
    //     <div className="dropdown-menu dropdown-menu-end">
    //       {/* item*/}
    //       <h6 className="dropdown-header">Welcome Anna!</h6>
    //       <a className="dropdown-item" href="pages-profile.html"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" /> <span className="align-middle">Profile</span></a>
    //       <a className="dropdown-item" href="apps-chat.html"><i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1" /> <span className="align-middle">Messages</span></a>
    //       <a className="dropdown-item" href="apps-tasks-kanban.html"><i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1" /> <span className="align-middle">Taskboard</span></a>
    //       <a className="dropdown-item" href="pages-faqs.html"><i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1" /> <span className="align-middle">Help</span></a>
    //       <div className="dropdown-divider" />
    //       <a className="dropdown-item" href="pages-profile.html"><i className="mdi mdi-wallet text-muted fs-16 align-middle me-1" /> <span className="align-middle">Balance : <b>$5971.67</b></span></a>
    //       <a className="dropdown-item" href="pages-profile-settings.html"><span className="badge bg-success-subtle text-success mt-1 float-end">New</span><i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1" /> <span className="align-middle">Settings</span></a>
    //       <a className="dropdown-item" href="auth-lockscreen-basic.html"><i className="mdi mdi-lock text-muted fs-16 align-middle me-1" /> <span className="align-middle">Lock screen</span></a>
    //       <a className="dropdown-item" href="auth-logout-basic.html"><i className="mdi mdi-logout text-muted fs-16 align-middle me-1" /> <span className="align-middle" data-key="t-logout">Logout</span></a>
    //     </div>
    //   </div>
    //   <div id="scrollbar">

    //   <div className="container-fluid">
    //       <div id="two-column-menu">
    //       </div>
    //       <ul className="navbar-nav" id="navbar-nav">
    //         <li className="menu-title"><span data-key="t-menu">Menu</span></li>


    //        { 
    //         // data.length > 0 &&
    //         <li className="nav-item">
    //          { data.access.length > 0 && 
    //          <a className="nav-link menu-link" href="#sidebarDashboards" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="sidebarDashboards">
    //             <i className="ri-dashboard-2-line" /> <span data-key="t-dashboards">Dashboards</span>
    //           </a>}
    //           <div className="collapse menu-dropdown" id="sidebarDashboards">
    //             <ul className="nav nav-sm flex-column">
    //               <li className="nav-item">
    //                 <a href="dashboard-analytics.html" className="nav-link" data-key="t-analytics"> Analytics </a>
    //               </li>
    //               <li className="nav-item">
    //                 <a href="dashboard-crm.html" className="nav-link" data-key="t-crm"> CRM </a>
    //               </li>
    //               <li className="nav-item">
    //                 <a href="index.html" className="nav-link" data-key="t-ecommerce"> Ecommerce </a>
    //               </li>
    //               <li className="nav-item">
    //                 <a href="dashboard-crypto.html" className="nav-link" data-key="t-crypto"> Crypto </a>
    //               </li>
    //               <li className="nav-item">
    //                 <a href="dashboard-projects.html" className="nav-link" data-key="t-projects"> Projects </a>
    //               </li>
    //               <li className="nav-item">
    //                 <a href="dashboard-nft.html" className="nav-link" data-key="t-nft"> NFT</a>
    //               </li>
    //               <li className="nav-item">
    //                 <a href="dashboard-job.html" className="nav-link" data-key="t-job">Job</a>
    //               </li>
    //               <li className="nav-item">
    //                 <a href="dashboard-blog.html" className="nav-link"><span data-key="t-blog">Blog</span> <span className="badge bg-success" data-key="t-new">New</span></a>
    //               </li>
    //             </ul>
    //           </div>
    //         </li> 
    //        }
    //       </ul>
    //     </div>

    //   </div>
    //   <div className="sidebar-background" />
    // </div>
  )
}

