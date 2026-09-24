import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";

function AppointmentDetails() {
  const [attachments, setAttachments] = useState([]);
  const location = useLocation();
  const { appointment_id } = useParams();

    return (
        <div>
        <Link to={`/dashboard/appointments/show/${appointment_id}`} className="bg-gray-200 hover:bg-gray-400 px-7 py-3 mb-5 rounded-md text-md font-medium">Back to Appointment</Link>

        <h1 className="text-4xl font-bold m-4">Appointment details</h1>
        </div>
    )
}

export default AppointmentDetails;
