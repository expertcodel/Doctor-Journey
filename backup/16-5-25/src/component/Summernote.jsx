"use client"
import dynamic from 'next/dynamic'
 //import $ from 'jquery'
import '../../node_modules/summernote/dist/summernote-bs4.min.css'
const $=dynamic(()=>import('jquery'),{ssr:false})
 import 'summernote/dist/summernote-bs4.min.js'
//dynamic(()=>import('summernote/dist/summernote-bs4.min.js'))
import React, { useRef } from 'react'
import { useEffect } from 'react'

export default function Summernote() {

    //console.log($);
    
    const editoref=useRef(null);

  useEffect(() => {
    
//     console.log('jQuery version:', $.fn.jquery); // Logs the jQuery version
// console.log('Summernote:', $.fn.summernote);
    if(editoref.current)
    {

        $(editoref.current).summernote({

            height:300,
            minHeight:null,
            maxHeight:null,
            focus:true,
            callbacks:{
               onImageUpload:function(files)
               {
                   handleImageupload(files);
               } 
            }
         })
         return () => {
     
             $(editoref.current).summernote('destroy');
           
         }

    }
   
  }, [])


  const handleImageupload=async (files)=>{

    const formData=new FormData();
    formData.append('file',files[0]);
    try {

        const response=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/uploadImage`,{method:'POST',body:formData});
        const data=await response.json();
        if(data.status)
        {
            $('#summernote').summernote('insertImage',data.url);
        }
        else{
            alert('image upload failed')
        }
        
    } catch (error) {

        alert('image upload failed')
        
    }
   
  }
  



  return (
    <div >
        <textarea  id="summernote" ref={editoref}></textarea>
    </div>
  )
}
