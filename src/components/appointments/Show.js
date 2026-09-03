import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs';
import { apiGet } from "../../api/apiFetch"
import { defaultImage } from "../../constants/appointmentOptions";

function AppointmentShow({isDetails}) {
    const { appointment_id } = useParams();
    const [appointment, setAppointment] = useState(null);

    const toLocalTimeView = (utcTime) => {
        if (!utcTime) return '';
        return dayjs.utc(utcTime).local().format('YYYY-MM-DD hh:mm A');
    };

    useEffect(() => {
        if (!appointment_id) return;
        apiGet(`${process.env.REACT_APP_API_HOST}/appointments/${appointment_id}`)
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
                    <svg className="w-16 h-16 md:w-20 md:h-20 mr-4 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={defaultImage(appointment)}></path>
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