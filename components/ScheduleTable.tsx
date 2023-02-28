import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';

import { timestampToDate } from '@/helpers/formatDate';
import { IConnection } from '@/types/types';

import ScheduleDetails from './ScheduleDetails';
import ScheduleModal from './ScheduleModal';

interface Column {
    id: 'direction' | 'departure' | 'arrivalTime' | 'journeyLength' | 'stopOversAmount';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'direction', label: 'Direction', minWidth: 170 },
    { id: 'departure', label: 'Departure', minWidth: 170 },
    { id: 'arrivalTime', label: 'Arrival', minWidth: 170 },
    { id: 'journeyLength', label: 'Journey length', minWidth: 100 },
    {
        id: 'stopOversAmount',
        label: 'Stopovers',
        minWidth: 170
    }
];

interface Data {
    direction: string;
    departure: string;
    arrivalTime: string;
    journeyLength: string;
    population: number;
    stopOversAmount: number;
}

function createData(
    direction: string,
    departure: string,
    arrivalTime: string,
    journeyLength: string,
    population: number,
    stopOversAmount: number
): Data {
    return { direction, departure, arrivalTime, journeyLength, population, stopOversAmount };
}

interface IScheduleTable {
    connections: IConnection[];
}

export const ScheduleTable: React.FC<IScheduleTable> = ({ connections }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [tableData, setTableData] = React.useState<Data[]>();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [modalConnection, setModalConnection] = React.useState<IConnection>();

    React.useEffect(() => {
        if (connections && connections.length > 0) {
            const formattedData = connections.map((el) => {
                return createData(
                    `${el.from.station.name} - ${el.to.station.name}`,
                    timestampToDate(el.from.departure as string),
                    timestampToDate(el.to.arrival as string),
                    el.duration,
                    0,
                    el.sections.length
                );
            });
            setTableData(formattedData);
        }
    }, [connections]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const redirectToDetailsPage = (row: Data) => {
        const currentConnection = connections.find(
            (el) =>
                timestampToDate(el.from.departure as string) === row.departure &&
                timestampToDate(el.to.arrival as string) === row.arrivalTime
        );
        if (currentConnection) {
            setModalConnection(currentConnection);
            setIsModalOpen(true);
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData &&
                            tableData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.departure}
                                            onClick={() => redirectToDetailsPage(row)}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={(tableData && tableData.length) || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ScheduleModal onCloseModal={() => setIsModalOpen(false)} isOpen={isModalOpen}>
                <ScheduleDetails connection={modalConnection} />
            </ScheduleModal>
        </Paper>
    );
};

export default ScheduleTable;
