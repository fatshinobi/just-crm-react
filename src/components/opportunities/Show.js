import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"

function OpportunityShow({ isDetails }) {
    const { id } = useParams();
    const [opportunity, setOpportunity] = useState(null);

    const stageNames = {
        0: "Awareness",
        1: "Interest",
        2: "Decision",
        3: "Buy"
    };

    const statusNames = {
        0: "Draft",
        1: "Active",
        2: "Closed"
    };

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
    }, [id]);

    return (
        <div>
            <h1 className="text-3xl font-bold m-4">Opportunity</h1>
            {opportunity ? (
                <div className="m-4 p-4 border rounded-lg shadow-lg pb-7">
                    <h2 className="text-2xl font-semibold mb-2">{opportunity.title}</h2>
                    <p className="mb-5"><strong>Description:</strong> {opportunity.description}</p>
                    <p className="mb-1"><strong>Amount:</strong> ${opportunity.amount}</p>
                    <p className="mb-1"><strong>Stage:</strong> {stageNames[opportunity.stage] || "Unknown"}</p>
                    <p className="mb-1"><strong>Status:</strong> {statusNames[opportunity.status] || "Unknown"}</p>
                    <p className="mb-1"><strong>Start:</strong> {opportunity.start}</p>
                    <p className="mb-1"><strong>Finish:</strong> {opportunity.finish}</p>
                    <p className="mb-1"><strong>Company:</strong> <Link to={`/company/details/${opportunity.customer_id}`} className="text-blue-800 font-medium py-1 px-3 transition-colors">{opportunity.customer_name}</Link></p>
                    <p className="mb-1"><strong>Person:</strong> <Link to={`/person/details/${opportunity.client_id}`} className="text-blue-800 font-medium py-1 px-3 transition-colors">{opportunity.client_name}</Link></p>
                    <p className="mb-5"><strong>User:</strong> {opportunity.user_name}</p>
                    <Link to={`/opportunity/edit/${opportunity.id}`} className="bg-green-500 hover:bg-green-700 px-7 py-3 mb-5 rounded-md text-md font-medium">Edit</Link>
                    {!isDetails ? <Link to={`/opportunity/details/${opportunity.id}`} className="bg-gray-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Details</Link> : <Link to={`/opportunities`} className="bg-grey-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Sales</Link>}
                </div>
            ) : (
                <p className="m-4">Loading opportunity details...</p>
            )}
        </div>
    );
}

export default OpportunityShow;
