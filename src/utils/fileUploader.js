import path from "path";
import fs from 'fs'

export async function fileUploader(file)
{
    try {

        const buffer=Buffer.from(await file.arrayBuffer());
        const filename=String(Date.now())+file.name.replaceAll(' ','-');
        const uploadDir=path.join(process.cwd(),'uploads');
        if(!fs.existsSync(uploadDir))
        {
            fs.mkdirSync(uploadDir,{recursive:true});
        }

        const filepath=path.join(uploadDir,filename);
        fs.writeFileSync(filepath,buffer);
        const fileUrl=`/api/get-image/?imageName=${filename}`;
        return fileUrl;
        
    } catch (error) {
        
        console.log(error);
        throw new Error("File not uploaded!");
       
    }
   


}
