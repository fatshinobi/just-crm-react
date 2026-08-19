import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import AppointmentCard from "../../components/appointments/Card";

function OpportunityDetails() {
    const [appointments, setAppointments] = useState([]);
    const [opportunity, setOpportunity] = useState(null);
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.REACT_APP_API_HOST}/opportunities/${id}`, {
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
                throw new Error('Failed to fetch opportunity');
            }
        })
        .then(data => {
            console.log('Opportunity data:', data);
            setOpportunity(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [location.key, location.pathname, id]);

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.REACT_APP_API_HOST}/opportunities/${id}/appointments`, {
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
                throw new Error('Failed to fetch opportunity appointments');
            }
        })
        .then(data => {
            console.log('Opportunity Appointments data:', data);
            setAppointments(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [location.key, location.pathname, id]);

    return (
        <div>
            <h1 className="text-3xl font-bold m-4">Opportunity</h1>
            <h2 className="text-3xl font-bold m-4">Appointments</h2>

            <div className="">
                {appointments.map((record, index) => (
                    <AppointmentCard record={record} link_path={`/appointment/show/${record.id}`} key={index} />
                ))}
            </div>
            {opportunity && (
                <Link to={`/opportunity/show/${opportunity.id}`} className="bg-gray-200 hover:bg-gray-400 px-7 py-3 mb-5 rounded-md text-md font-medium">Back to Opportunity</Link>
            )}
        </div>
    );
}

export default OpportunityDetails;
