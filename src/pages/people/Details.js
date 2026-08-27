import {useEffect, useState} from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import NewCard from "../../components/NewCard";
import ElementCard from "../../components/ElementCard";
import AppointmentCard from "../../components/appointments/Card";
import AppointmentNewCard from "../../components/appointments/NewCard";
import OpportunityElementCard from "../../components/opportunities/ElementCard";
import OpportunityNewCard from "../../components/opportunities/NewCard";
import TagsDetails from "../../components/TagsDetails";

function PersonDetails() {
    const [companies, setCompanies] = useState([]);
    const location = useLocation();
    const [appointments, setAppointments] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/clients/customers/${id}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                authorization: localStorage.getItem("accessToken"),
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Failed to fetch companies");
            }
        })
        .then((data) => {
            console.log("Companies data:", data);
            setCompanies(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }, [location.key, location.pathname]);

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.REACT_APP_API_HOST}/clients/${id}/appointments`, {
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
            throw new Error('Failed to fetch person appointments');
            }
        })
        .then(data => {
            console.log('Person Appointments data:', data);
            setAppointments(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [location.key, location.pathname]);

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.REACT_APP_API_HOST}/clients/${id}/opportunities`, {
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
                throw new Error('Failed to fetch person opportunities');
            }
        })
        .then(data => {
            console.log('Person Opportunities data:', data);
            setOpportunities(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [location.key, location.pathname]);

    return (
        <div>
            <Link to={`/person/show/${id}`} className="bg-gray-200 hover:bg-gray-400 px-7 py-3 mb-5 rounded-md text-md font-medium">Back to Person</Link>
            <h1 className="text-4xl font-bold m-4">Person details</h1>
            <TagsDetails tagType={1} tagName="Person" />
            <h2 className="text-3xl font-bold m-4">Companies</h2>

            <div className="gap-4 flex m-5">
                {companies.map((record, index) => (
                    <ElementCard record={record} default_image={"/def_company_logo.png"} link_path={`/person_company/edit/${record.id}/${id}`} key={index} />
                ))}
                <NewCard parentId={id} link_path={`/person_company/create/${id}`} />
            </div>

            <h2 className="text-3xl font-bold m-4">Opportunities</h2>
            <OpportunityNewCard link_path={`/person/opportunities/create/${id}`} />
            <div className="">
                {opportunities.map((record, index) => (
                    <OpportunityElementCard record={record} link_path={`/person/opportunities/edit/${record.id}/${id}`} key={index} />
                ))}
            </div>

            <h2 className="text-3xl font-bold m-4">Appointments</h2>
            <AppointmentNewCard link_path={`/person/appointments/create/${id}`} />
            <div className="">
                {appointments.map((record, index) => (
                    <AppointmentCard record={record} link_path={`/person/appointments/edit/${record.id}/${id}`} key={index} />
                ))}
            </div>
        </div>
    );
}

export default PersonDetails;
