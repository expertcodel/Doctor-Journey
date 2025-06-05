import { cookies } from "next/headers"

export const extractUsertype=async ()=>{

    const token=await cookies();
    const userdata=token.get('userData').value;
    return { usertype : userdata.usertype, userId: userdata.userId};


}