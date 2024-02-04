import { Dashboard } from '@/components/Dashboard';
import { useRouter } from 'next/router'
import React from 'react'

const UserDashboard = () => {

    const router = useRouter();
    const { userId } = router.query;

    return (
        <div>
            <Dashboard userId={userId} />
        </div>
    )
}

export default UserDashboard