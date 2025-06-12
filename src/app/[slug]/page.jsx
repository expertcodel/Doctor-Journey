import React from 'react'
import AdminFooter from '../../component/AdminFooter.jsx'
import Link from 'next/link';
export const metadata = {
  title: "Dashboard",
  description: "",
  keywords: ""
};


async function Page() {

  let blogdata = [];
  let videodata = [];
  let totalblogs;
  let totalvideos;
  let author;
  let doctor;
  let publisher;
  let organization;

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboarddata`, {

      method: 'GET',
      cache: 'no-store'
    })

    if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

    const res = await response.json();

    if (res.status) {
      blogdata = res.blogdata
      videodata = res.videodata
      totalblogs = res.totalblogs
      totalvideos = res.totalvideos
      author=res.author
      doctor=res.doctor
      publisher=res.publisher
      organization=res.organization
    }


  } catch (error) {

    console.log("fetching failed", error);
  }

  return (



    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-galaxy-transparent">
                <h4 className="mb-sm-0">Dashboard</h4>

              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">

            <div className="col-lg-3">
              <div className="card">
                <div className="card-body d-flex gap-3 align-items-center">
                  <div className="avatar-sm">
                    <div className="avatar-title border bg-success-subtle border-success border-opacity-25 rounded-2 fs-17">
                      <i data-feather="users" className="icon-dual-success" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="fs-15">{author}</h5>
                    <p className="mb-0 text-muted">Authors</p>
                  </div>
                </div>
              </div>
            </div>{/*end col*/}
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body d-flex gap-3 align-items-center">
                  <div className="avatar-sm">
                    <div className="avatar-title border bg-warning-subtle border-warning border-opacity-25 rounded-2 fs-17">
                      <i data-feather="file-text" className="icon-dual-warning" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="fs-15">{doctor}</h5>
                    <p className="mb-0 text-muted">Doctors</p>
                  </div>
                </div>
              </div>
            </div>{/*end col*/}
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body d-flex gap-3 align-items-center">
                  <div className="avatar-sm">
                    <div className="avatar-title border bg-danger-subtle border-danger border-opacity-25 rounded-2 fs-17">
                      <i data-feather="heart" className="icon-dual-danger" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="fs-15">{publisher}</h5>
                    <p className="mb-0 text-muted">Publishers</p>
                  </div>
                </div>
              </div>
            </div>{/*end col*/}
            <div className="col-lg-3">
              <div className="card">
                <div className="card-body d-flex gap-3 align-items-center">
                  <div className="avatar-sm">
                    <div className="avatar-title border bg-primary-subtle border-primary border-opacity-25 rounded-2 fs-17">
                      <i data-feather="bar-chart" className="icon-dual-primary" />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="fs-15">{organization}</h5>
                    <p className="mb-0 text-muted">Organizations</p>
                  </div>
                </div>
              </div>
            </div>{/*end col*/}

          </div>{/*end row*/}

          <div className="row">
            <div className="col-xl-6">
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Latest Videos</h4>
                  <div className="flex-shrink-0">
                    <div className="dropdown card-header-dropdown">
                      <a
                        className="text-reset dropdown-btn"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >

                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">
                          Today
                        </a>
                        <a className="dropdown-item" href="#">
                          Last Week
                        </a>
                        <a className="dropdown-item" href="#">
                          Last Month
                        </a>
                        <a className="dropdown-item" href="#">
                          Current Year
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card header */}
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                      <thead className="table-light">
                        <tr className="text-muted">
                          <th scope="col">Id</th>
                          <th scope="col" style={{ width: "20%" }}>
                            Title
                          </th>
                          <th scope="col">Date</th>
                          <th scope="col" style={{ width: "16%" }}>
                            Action
                          </th>

                        </tr>
                      </thead>
                      {videodata.map((item) => <tbody key={item.videoId}>
                        <tr>
                          <td>{item.videoId}</td>

                          <td>
                            <img
                              src={item.thumbnailImage}
                              alt=""
                              className="avatar-xs rounded-circle me-2 material-shadow"
                            />
                            <a href="#javascript: void(0);" className="text-body fw-medium">
                              {item.videoTitle.substring(0, 10)}...
                            </a>
                          </td>
                          <td className="status">{item.publishedDate}</td>
                          <td><Link className="btn btn-sm btn-success edit-item-btn" href='/dashboard/doctors/videos/list'>view</Link></td>

                        </tr>

                      </tbody>)}
                      {/* end tbody */}
                    </table>
                    {/* end table */}
                  </div>
                  {/* end table responsive */}
                </div>


                {/* end card body */}
              </div>
              {/* end card */}
            </div>


            <div className="col-xl-6">
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Latest Blogs</h4>
                  <div className="flex-shrink-0">
                    <div className="dropdown card-header-dropdown">
                      <a
                        className="text-reset dropdown-btn"
                        href="#"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >

                      </a>
                      <div className="dropdown-menu dropdown-menu-end">
                        <a className="dropdown-item" href="#">
                          Today
                        </a>
                        <a className="dropdown-item" href="#">
                          Last Week
                        </a>
                        <a className="dropdown-item" href="#">
                          Last Month
                        </a>
                        <a className="dropdown-item" href="#">
                          Current Year
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end card header */}
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-borderless table-hover table-nowrap align-middle mb-0">
                      <thead className="table-light">
                        <tr className="text-muted">
                          <th scope="col">Id</th>
                          <th scope="col" style={{ width: "20%" }}>
                            Name
                          </th>
                          <th scope="col">Status</th>
                          <th scope="col" style={{ width: "16%" }}>
                            Action
                          </th>

                        </tr>
                      </thead>
                      {blogdata.map((item) => <tbody key={item.blogId}>
                        <tr>
                          <td>{item.blogId}</td>

                          <td>
                            <img
                              src={item.blogImage}
                              alt=""
                              className="avatar-xs rounded-circle me-2 material-shadow"
                            />
                            <a href="#javascript: void(0);" className="text-body fw-medium">
                              {item.blogTitle.substring(0, 5)}...
                            </a>
                          </td>
                          <td className="status"><span className={item.blogStatus ? "badge bg-success-subtle text-success text-uppercase" : "badge bg-warning-subtle text-warning text-uppercase"}>{item.blogStatus ? 'active' : 'inactive'}</span></td>
                          <td>  <Link className="btn btn-sm btn-success edit-item-btn" href='/dashboard/blog'>view</Link></td>

                        </tr>

                      </tbody>)}
                      {/* end tbody */}
                    </table>
                    {/* end table */}
                  </div>
                  {/* end table responsive */}
                </div>


                {/* end card body */}
              </div>
              {/* end card */}
            </div>

          </div>

        </div>
        {/* container-fluid */}
      </div>
      <AdminFooter />
    </div>

  )
}

export default Page