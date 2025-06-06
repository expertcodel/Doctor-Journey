import { cookies } from "next/headers"

export const extractUsertype=async ()=>{

    const token=await cookies();
    const userdata=token.get('userData');
    const userId=JSON.parse(userdata.value).userData.userId;
    const usertype=JSON.parse(userdata.value).userData.usertype;
    return { usertype , userId};


}