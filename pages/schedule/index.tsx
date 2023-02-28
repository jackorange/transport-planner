import React from 'react';
import useSwr from 'swr';
import { useRouter } from 'next/router';
import { ISchedule } from '@/types/types';
import ScheduleTable from '@/components/ScheduleTable';
import { CircularProgress } from '@mui/material';
import styles from '@/styles/Home.module.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Schedule = () => {
    const router = useRouter();
    const params = router.query;
    const { data, isLoading } = useSwr<ISchedule>(
        `/api/schedule?from=${params.from}&to=${params.to}`,
        fetcher
    );

    return (
        <div className={styles.main}>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <ScheduleTable connections={(data && data?.connections) || []} />
            )}
        </div>
    );
};

export default Schedule;
