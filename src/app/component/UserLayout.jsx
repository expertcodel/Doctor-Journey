"use client"
import React from 'react'
import { useState,useEffect } from 'react'
import {UseContext} from '../../component/context.js'
function UserLayout({children,data}) {

  const [userData,setUserdata]=useState({});
  useEffect(() => {
   setUserdata(data);
  },[])
  

  return (
    <UseContext.Provider value={{userData}}>
        <div>{children}</div>
    </UseContext.Provider>
  )
}

export default UserLayout