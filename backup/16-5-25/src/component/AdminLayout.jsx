"use client"
import React from 'react'
import Header from './Header.jsx'
import Menubar from './Menu.jsx'
import { UseContext } from '@/component/context.js'
export default function AdminLayout({ Children, data, userData }) {
    return (
        <div id="layout-wrapper">
            <UseContext.Provider value={{data,userData}}>
                <Header userData={userData} />
                {Children}
                <Menubar data={data} />
            </UseContext.Provider>
        </div>
    )
}
