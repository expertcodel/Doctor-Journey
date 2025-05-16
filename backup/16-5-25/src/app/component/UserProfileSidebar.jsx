"use client"
import { useAuth } from "@/context/AuthContext";
import { faClipboardCheck, faClipboardList, faEdit, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserProfileSidebar() {
    const { logout } = useAuth();
    const pathName = usePathname();
  return (
    <div className="card">
        <div className="card-header">
            <h3 className="card-title">My Dashboard</h3>
        </div>
        <div className="card-body text-center item-user border-bottom">
            <div className="profile-pic">
                <div className="profile-pic-img">
                    <span className="bg-success dots" data-bs-toggle="tooltip" data-bs-placement="top" title="online" />
                    <Image src="/images/users/male/25.jpg" width={80} height={80} className="brround" alt="user" />
                </div>
                <Link href="/user-dashboard/profile">
                    <h4 className="mt-3 mb-0 font-weight-semibold text-dark">
                        Robert McLean
                    </h4>
                </Link>
            </div>
        </div>
        <div className="item1-links mb-0">
            <Link href="/user-dashboard/profile" 
                className={`link ${
                    pathName === '/user-dashboard/profile' ? 'active d-flex border-bottom' : 'd-flex border-bottom'
                }`}
            >
                <span className="icon1 me-2">
                    <FontAwesomeIcon icon={faEdit} />
                </span>{" "} Edit Profile
            </Link>
            <Link href="/user-dashboard/my-subscription" 
                className={`link ${
                    pathName === '/user-dashboard/my-subscription' ? 'active d-flex border-bottom' : 'd-flex border-bottom'
                }`}
            >
                <span className="icon1 me-2">
                    <FontAwesomeIcon icon={faClipboardList} />
                </span>{" "} My Subscription
            </Link>
            <Link href="/user-dashboard/upgrade-subscription" 
                className={`link ${
                    pathName === '/user-dashboard/upgrade-subscription' ? 'active d-flex border-bottom' : 'd-flex border-bottom'
                }`}
            >
                <span className="icon1 me-2">
                    <FontAwesomeIcon icon={faClipboardCheck} />
                </span>{" "} Upgrade Subscription
            </Link>
            <button className="d-flex" onClick={logout}>
                <span className="icon1 me-2">
                <FontAwesomeIcon icon={faPowerOff} />
                </span>{" "} Logout
            </button>
        </div>
    </div>
  );
}
