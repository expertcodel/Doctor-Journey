"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";

function Roles({ permissions, setPermissions, usertype }) {
    const [updateRole, setUpdateRole] = useState(false);
    const [expandedIdx, setExpandedIdx] = useState(0); // default first open
    const nodeRef = useRef(null);

    const managePermissions = (parentIdx, childIdx = null) => {
        setPermissions(prev =>
            prev.map((item, i) => {
                if (i === parentIdx) {
                    if (childIdx === null) {
                        return {
                            ...item,
                            allowed: !item.allowed,
                            child: item.child?.map(child => ({
                                ...child,
                                allowed: !item.allowed
                            })) || []
                        };
                    } else {
                        const updatedChild = item.child.map((child, j) =>
                            j === childIdx ? { ...child, allowed: !child.allowed } : child
                        );
                        return {
                            ...item,
                            child: updatedChild
                        };
                    }
                }
                return item;
            })
        );
    };

    const flattenPermissions = (permissions) => {
        return permissions.flatMap(p => {
            const all = [{ role: p.role, allowed: p.allowed, path: p.path, child: p.child }];

            return all;
        });
    };

    const updatePermission = async () => {
        const option = {
            method: "POST",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/role/updateRole`,
            data: {
                usertype,
                access: flattenPermissions(permissions)
            }
        };
        const response = await axios.request(option);
        if (response.data.status) {
            // setUpdateRole(!updateRole);
            sessionStorage.setItem('successMsg','Role Updated Successfully');
            window.location.href='/dashboard/role';
        }
    };

    const toggleAccordion = (idx) => {
        setExpandedIdx(prev => (prev === idx ? null : idx));
    };

    return (
        <>
            <table className="table table-borderless roleTable align-middle table-nowrap mb-0" style={{ backgroundColor: "#ffffff" }}>
                <thead>
                    <tr>
                        <th className="col-20">Action</th>
                        <th className="col-40">Permissions</th>
                        <th className="col-20">Status</th>
                        <th className="col-20">&nbsp;</th>
                    </tr>
                </thead>
                {permissions.map((item, i) => {
                    const nodeRef = useRef(null);

                    return (
                        <tbody key={i}>
                            <tr>
                                <td className="col-20">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={item.allowed}
                                        onChange={() => managePermissions(i)}
                                    />
                                </td>
                                <td className="col-40"><strong>{item.role}</strong></td>
                                <td className="col-20">
                                    <span className={`badge ${item.allowed ? 'bg-success' : 'bg-danger'}`}>
                                        {item.allowed ? 'Active' : 'inActive'}
                                    </span>
                                </td>
                                <td className="text-end col-20">
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => toggleAccordion(i)}
                                    >
                                        {expandedIdx === i ? (
                                            <i className="ri-arrow-up-s-line" />
                                        ) : (
                                            <i className="ri-arrow-down-s-line" />
                                        )}
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td colSpan={4} style={{ padding: 0 }}>
                                    <CSSTransition
                                        in={expandedIdx === i}
                                        timeout={300}
                                        classNames="fade-slide"
                                        unmountOnExit
                                        nodeRef={nodeRef}
                                    >
                                        <div ref={nodeRef} style={{ overflow: "hidden" }}>
                                            <table className="table table-borderless mb-0">
                                                <tbody>
                                                    {item.child?.map((child, j) => (
                                                        <tr key={j}>
                                                            <td className="col-20 ps-4">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    checked={child.allowed}
                                                                    onChange={() => managePermissions(i, j)}
                                                                />
                                                            </td>
                                                            <td className="col-40">{child.role}</td>
                                                            <td className="col-20">
                                                                <span className={`badge ${child.allowed ? 'bg-success' : 'bg-danger'}`}>
                                                                    {child.allowed ? 'Active' : 'inActive'}
                                                                </span>
                                                            </td>
                                                            <td className="col-20" />
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </CSSTransition>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>

            <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#ffff' }}>
                <button
                    type="button"
                    className="btn btn-warning"
                    onClick={updatePermission}
                    style={{ marginBottom: "20px" }}
                >
                    Submit
                </button>
            </div>
        </>
    );
}

export default Roles;
