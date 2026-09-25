import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import AttachmentElementCard from "../../components/attachments/ElementCard";
import NewAttachmentElementCard from "../../components/attachments/NewElementCard";
import { apiGet } from "../../api/apiFetch";

function AppointmentDetails() {
  const [attachments, setAttachments] = useState([]);
  const location = useLocation();
  const { appointment_id } = useParams();

  useEffect(() => {
    if (!appointment_id) return;
    apiGet(`${process.env.REACT_APP_API_HOST}/appointments/attachments/${appointment_id}`)
    .then(data => {
        console.log('Appointment Attachments data:', data);
        setAttachments(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }, [location.key, location.pathname, appointment_id]);

    return (
        <div>
        <Link to={`/dashboard/appointments/show/${appointment_id}`} className="bg-gray-200 hover:bg-gray-400 px-7 py-3 mb-5 rounded-md text-md font-medium">Back to Appointment</Link>

        <h1 className="text-4xl font-bold m-4">Appointment details</h1>

        <h2 className="text-3xl font-bold m-4">Attachments</h2>

        <div className="gap-4 flex m-5">
            {attachments.map((record, index) => (
                <AttachmentElementCard record={record} link_path={`/appointment/attachments/edit/${appointment_id}/${record.id}`} key={index} />
            ))}
            <NewAttachmentElementCard parentId={appointment_id} link_path={`/appointment/attachments/create/${appointment_id}`}/>
        </div>
        </div>
    )
}

export default AppointmentDetails;
