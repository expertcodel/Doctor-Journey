import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from 'fs'
import path from "path";


export async function POST(request)
{

    let file=await request.formData();
    const file1=file.get('files[0]');
    
    if(file1==='undefined')
    {
        return NextResponse.json({status:false});
    }
    const buffer=Buffer.from(await file1.arrayBuffer());
    const filename=file1.name.replaceAll(" ","_");

    try {

        await writeFile(path.join(process.cwd(),`/public/images/${filename}`),buffer);
        return NextResponse.json({status:true,files:[{url:`/public/images/${filename}`}],messages:"jfhg"});

    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false});
    }
    
}