import { Records } from '@/components/Records'
import { useRouter } from 'next/router';
import React from 'react'

const UserRecords = () => {
    const router = useRouter();
    const { userId } = router.query;
    return (
        <Records userId={userId} />
    )
}

export default UserRecords