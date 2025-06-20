import Subscription from '../../component/Subscription.jsx'
import { extractUsertype } from '../../../utils/userType.js'
export default async function MySubscription() {

    let subscriptionList = [];
    let subscriptionsList = [];
    const {userId } = await extractUsertype();
    try {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/client/subscription/?userId=${userId}&name=`, {

            method: 'GET',
            cache: 'no-store',

        })

        if (!response.ok) throw new error(`Failed to fetch: ${response.status}`);

        const res = await response.json();

        if (res.status) {

            subscriptionList = res.subscriptionlist
            subscriptionsList = res.subscriptionslist
        }


    } catch (error) {

        console.log("fetching failed", error);


    }

    return (
        <>
            {<Subscription subscriptionList={subscriptionList} subscriptionsList={subscriptionsList} />}
        </>
    )
}