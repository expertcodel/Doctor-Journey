// components/Breadcrumb.jsx
"use client";
import Link from "next/link";

export default function Breadcrumb({ title = "Page Title" }) {
  return (
    <section>
      <div className="bannerimg cover-image bg-background3" data-image-src="../assets/images/banners/banner2.jpg">
        <div className="header-text mb-0">
          <div className="container">
            <div className="text-center text-white">
              <h1 className="">{title}</h1>
              <ol className="breadcrumb text-center">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item active text-white" aria-current="page">
                  {title}
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
