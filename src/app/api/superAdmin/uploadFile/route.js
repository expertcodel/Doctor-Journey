import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request)
{
     const data=await request.formData()
     const file=data.get('file');
     //console.log(data.get('files[0]'));
     
   
    if(file==='undefined')
    {
     
      return NextResponse.json({status:false,message:"Please upload file again!"});
    }

    const buffer=Buffer.from(await file.arrayBuffer());
    const filename=file.name.replaceAll(" ","_");
    try {

      await writeFile(path.join(process.cwd(),"/public/images/"+filename),buffer);
      return NextResponse.json({status:true,message:"file uploaded successfully",imageUrl:`/images/${filename}`});

      
      
    } catch (error) {
      
      console.log(error);
      return NextResponse.json({status:false,message:"error Please upload file again!"});
      
    }

    //return NextResponse.json({status:false,message:"error Please upload file again!"});
   
}