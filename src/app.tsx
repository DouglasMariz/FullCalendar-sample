import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timegridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from "moment";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const App = () => {
    const [calendar, setCalendar]: any = React.useState({});
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin, timegridPlugin]}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                initialEvents={[
                    {
                        id: '1',
                        title: 'Teste Ativo 1',
                        start: moment('2022-05-02 12:00:00').toDate(),
                        end: moment('2022-05-03 12:00:00').toDate(),
                        status: 'Ativo',
                        color: 'blue'
                    },
                    {
                        id: '2',
                        title: 'Teste Inativo',
                        start: moment('2022-05-04 12:00:00').format('YYYY-MM-DD hh:mm:ss'),
                        end: moment('2022-05-05 12:00:00').format('YYYY-MM-DD hh:mm:ss'),
                        status: 'Inativo',
                        color: 'red',
                        textColor: 'black'
                    },
                    {
                        id: '3',
                        title: 'Teste Ativo 2',
                        start: moment('2022-05-06').format('YYYY-MM-DD'),
                        status: 'Ativo',
                        color: 'blue'
                    },
                    {
                        id: '4',
                        title: 'Teste Inativo 2',
                        start: moment('2022-05-07').toDate(),
                        status: 'Inativo',
                        color: 'red',
                        textColor: 'black'
                    },
                ]}
                dateClick={(values) => {
                    setCalendar(values);
                    handleOpen();
                }}
                eventClick={(arg) => {
                    const {id, title, startStr, endStr, backgroundColor, extendedProps: {status: status}} = arg.event;
                    setCalendar({id, title, startStr, endStr, backgroundColor, status});
                    handleOpen();
                }}
            />

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {calendar.title || "Full Calendar example"}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {calendar.dateStr && `you clicked on day ${calendar.dateStr}`}
                        <div>
                            <div>
                                {calendar.startStr && `Event start: ${calendar.startStr}`}
                            </div>

                            {calendar.endStr && `Event end: ${calendar.endStr}`}
                            {calendar.status &&
                                <div style={{
                                    color: calendar.backgroundColor
                                }}>
                                    Status is: {calendar.status}
                                </div>
                            }
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default App;