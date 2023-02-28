import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { IConnection } from '@/types/types';
import { timestampToDate } from '@/helpers/formatDate';

interface IScheduleDetails {
    connection?: IConnection;
}

const ScheduleDetails: React.FC<IScheduleDetails> = ({ connection }) => {
    const renderConnectionSections = () => {
        return connection?.sections.map((el) => {
            return (
                <Accordion key={el.departure.arrival}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography>
                            {el.departure.station.name} - {el.arrival.station.name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Departure: {timestampToDate(el.departure.departure as string)}
                        </Typography>
                        <Typography>
                            Arrival: {timestampToDate(el.arrival.arrival as string)}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            );
        });
    };
    return (
        <div>
            <Typography marginBottom={3} fontWeight="bold">
                {connection?.from.station.name} - {connection?.to.station.name}
            </Typography>
            <Typography marginBottom={3}>Sections </Typography>
            {renderConnectionSections()}
        </div>
    );
};

export default ScheduleDetails;
