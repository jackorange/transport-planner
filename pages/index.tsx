import { Autocomplete, Button, FormControl, TextField } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSwr from 'swr';

import { formatLocation } from '@/helpers/formatLocations';
import styles from '@/styles/Home.module.css';
import { IList, ILocation } from '@/types/types';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
    const router = useRouter();
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [valueToSearch, setValueToSearch] = useState('');
    const [fromStationsList, setFromStationsList] = useState<IList[]>([]);
    const [toStationsList, setToStationsList] = useState<IList[]>([]);
    const { data } = useSwr<ILocation>(`/api/locations?query=${valueToSearch}`, fetcher);

    useEffect(() => {
        if (data && data?.stations && data?.stations.length > 0) {
            setFromStationsList(formatLocation(data.stations));
            setToStationsList(formatLocation(data.stations));
        }
    }, [data]);

    const searchValue = (value: string, isFrom = false) => {
        isFrom ? setFromValue(value) : setToValue(value);
        setValueToSearch(value);
    };

    const searchConnections = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push({ pathname: '/schedule', query: { from: fromValue, to: toValue } });
    };
    return (
        <>
            <Head>
                <title>Transport Planner</title>
                <meta name="description" content="Transport Planner for Switzerland" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.center}>
                    <form className={styles.container} onSubmit={searchConnections}>
                        <FormControl>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={fromStationsList}
                                sx={{ width: 300 }}
                                onChange={(e, selected) =>
                                    searchValue(selected?.value as string, true)
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="From"
                                        required
                                        value={fromValue}
                                        onChange={(e) => searchValue(e.target.value, true)}
                                    />
                                )}
                            />
                        </FormControl>
                        <FormControl>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={toStationsList}
                                sx={{ width: 300 }}
                                onChange={(e, selected) => searchValue(selected?.value as string)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="To"
                                        required
                                        value={toValue}
                                        onChange={(e) => searchValue(e.target.value)}
                                    />
                                )}
                            />
                        </FormControl>
                        <Button type="submit" variant="outlined">
                            Search
                        </Button>
                    </form>
                </div>
            </main>
        </>
    );
}
