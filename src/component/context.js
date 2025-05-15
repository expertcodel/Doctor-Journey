"use client"

import { createContext, useContext } from 'react'

export const UseContext = createContext({

    articlelist: [],
    setarticlelist:()=>{},
    userData:{},
    setUserdata:()=>{},
    data:[],
    setData:()=>{},
    updateRole:false,
    setUpdaterole:()=>{},
   

})




export const UniversalContext = () => {

    return useContext(UseContext);
}
