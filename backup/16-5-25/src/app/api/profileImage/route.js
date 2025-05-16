import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request)
{
    const input=await request.formData();
    const file=input.get('file');

    if(!file)
    {
        return NextResponse.json({status:false,message:"Please upload image!"});
    }

    const buffer= Buffer.from(await file.arrayBuffer());
    const filename=file.name.replaceAll(" ","-");
    

    try {

        await writeFile(path.join(process.cwd(),`/public/images/${filename}`),buffer);
        return NextResponse.json({status:true,message:"uploaded successfully",url:`/images/${filename}`});
        
    } catch (error) {
        
        console.log(error);
        return NextResponse.json({status:false,message:"Please upload image again!"});
    }

   
}