import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import AppointmentCard from "../../components/appointments/Card";
import AppointmentNewCard from "../../components/appointments/NewCard";

function OpportunityDetails() {
    const [appointments, setAppointments] = useState([]);
    const [opportunity, setOpportunity] = useState(null);
    const [tags, setTags] = useState([]);
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
        console.log('Fetching appointments for opportunity ID:', id);
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

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.REACT_APP_API_HOST}/opportunities/${id}/tags`, {
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
                throw new Error('Failed to fetch opportunity tags');
            }
        })
        .then(data => {
            console.log('Opportunity tags data:', data);
            setTags(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [location.key, location.pathname]);

    return (
        <div>
            {opportunity && (
                <Link to={`/opportunity/show/${opportunity.id}`} className="bg-gray-200 hover:bg-gray-400 px-7 py-3 mb-5 rounded-md text-md font-medium">Back to Opportunity</Link>
            )}

            <h1 className="text-4xl font-bold m-4">Opportunity details</h1>
            <label className="ml-4">Tags:</label>
            {tags.map((tagRecord, tagIndex) => (
                <span className="bg-gray-500 text-white font-semibold py-1 px-2 ml-2 rounded">{tagRecord}</span>
            ))}

            <Link to={`/opportunity/tags/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 ml-2 rounded">Edit Tags+</Link>

            <h2 className="text-3xl font-bold m-4">Appointments</h2>

            <AppointmentNewCard link_path={`/opportunity/appointments/create/${id}`} />
            <div className="">
                {appointments.map((record, index) => (
                    <AppointmentCard record={record} link_path={`/opportunity/appointments/edit/${record.id}/${id}`} key={index} />
                ))}
            </div>
        </div>
    );
}

export default OpportunityDetails;
