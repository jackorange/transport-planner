import useSwr from 'swr';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { FormControl, Button, TextField, Autocomplete } from '@mui/material';
import styles from '@/styles/Home.module.css';
import { IList, ILocation } from '@/types/types';
import { formatLocation } from '@/helpers/formatLocations';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
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

    const searchConnections = () => {};
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
                    <form className={styles.container}>
                        <FormControl>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                freeSolo
                                options={fromStationsList}
                                sx={{ width: 300 }}
                                value={fromValue}
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
                                freeSolo
                                options={toStationsList}
                                sx={{ width: 300 }}
                                value={toValue}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="To"
                                        required
                                        onChange={(e) => searchValue(e.target.value)}
                                    />
                                )}
                            />
                        </FormControl>
                        <Button type="submit" variant="outlined" onSubmit={searchConnections}>
                            Search
                        </Button>
                    </form>
                </div>
            </main>
        </>
    );
}
