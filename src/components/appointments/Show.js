import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs';

function AppointmentShow({isDetails}) {
    const { appointment_id } = useParams();
    const [appointment, setAppointment] = useState(null);

    const defaultImage = () => {
        switch (appointment.communication_type) {
            case 0:
                // task icon               
                return "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z";
            case 1:
                // email icon
                return "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
            case 2:
                // phone icon
                return "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z";
            }
    };

    const toLocalTimeView = (utcTime) => {
        if (!utcTime) return '';
        return dayjs.utc(utcTime).local().format('YYYY-MM-DD hh:mm A');
    };

    useEffect(() => {
        if (!appointment_id) return;
        fetch(`${process.env.REACT_APP_API_HOST}/appointments/${appointment_id}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
              'authorization': localStorage.getItem('accessToken')
            }
        })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch appointment');
          }
        })
        .then(data => {
          console.log('Appointment data:', data);
          setAppointment(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [appointment_id]);

    return (
        <div>
            <h1 className="text-3xl font-bold m-4">Appointment</h1>
            {appointment ? (
                <div className="m-4 p-4 border rounded-lg shadow-lg pb-7">
                    <svg className="w-16 h-16 md:w-20 md:h-20 mr-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={defaultImage()}></path>
                    </svg>

                    <p className="mb-5"><strong>About:</strong> {appointment.about}</p>
                    <p className="mb-1"><strong>When:</strong> {toLocalTimeView(appointment.formatted_when)}</p>
                    <p className="mb-1"><strong>Company:</strong> <Link to={`/company/details/${appointment.customer_id}`} className="text-blue-800 font-medium py-1 px-3 transition-colors">{appointment.customer_name}</Link></p>
                    <p className="mb-1"><strong>Person:</strong> <Link to={`/person/details/${appointment.client_id}`} className="text-blue-800 font-medium py-1 px-3 transition-colors">{appointment.client_name}</Link></p>
                    <p className="mb-5"><strong>User:</strong> {appointment.user_name}</p>
                    <Link to={`/dashboard/appointments/edit/${appointment_id}`} className="bg-green-500 hover:bg-green-700 px-7 py-3 mb-5 rounded-md text-md font-medium">Edit</Link>
                    <Link to={`/`} className="bg-grey-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Cancel</Link>
                </div>
            ) : (
                <p className="m-4">Loading appointment details...</p>
            )}
        </div>
    );
}

export default AppointmentShow;