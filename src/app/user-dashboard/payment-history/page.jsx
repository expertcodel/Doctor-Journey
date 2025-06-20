import PaymentHistory from '../../component/PaymentHistory.jsx'
import { extractUsertype } from '../../../utils/userType.js'
export default async function Page() {


    const { userId } = await extractUsertype();
    let paymentList = [];
    let totalItems;
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/payments/?page=1&userId=${userId}&name=`, {

            method: 'GET',
            cache: 'no-store',

        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {

            paymentList = res.paymentlist;
            totalItems = Math.ceil(res.totalItems / 5);
        }


    } catch (error) {
    console.log("fetching failed", error);
    }

    return (
        <>
            {
                < PaymentHistory paymentList={paymentList} totalItems={totalItems} userId={userId}/>
            }
        </>
    )
}