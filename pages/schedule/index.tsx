import React from 'react';
import useSwr from 'swr';
import { useRouter } from 'next/router';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Schedule = () => {
    const router = useRouter();
    const params = router.query;
    const { data } = useSwr<any>(`/api/schedule?from=${params.from}&to=${params.to}`, fetcher);

    return <div>Schedule</div>;
};

export default Schedule;
