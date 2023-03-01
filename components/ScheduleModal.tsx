import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { FC } from 'react';

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

interface IScheduleModal {
    isOpen: boolean;
    onCloseModal(): void;
    children: React.ReactNode;
}

const ScheduleModal: FC<IScheduleModal> = ({ isOpen, onCloseModal, children }) => {
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>{children}</Box>
            </Modal>
        </div>
    );
};
export default ScheduleModal;
