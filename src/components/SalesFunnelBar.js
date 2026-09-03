import { useEffect, useState } from "react";
import { FunnelChart } from 'react-funnel-pipeline'
import 'react-funnel-pipeline/dist/index.css'
import { useNavigate } from 'react-router-dom'
import { opportunityStages } from '../constants/opportunityOptions.js'
import { apiGet } from "../api/apiFetch";

function SalesFunnelBar() {
    const [funnelData, setFunnelData] = useState([]);
    const navigate = useNavigate();

    const handleRowClick = (row) => {
        const stage_id = opportunityStages.find(stage => stage.value === row.name)?.key;
        navigate(`/opportunities/stages/${stage_id}`);
    };

    useEffect(() => {
        apiGet(`${process.env.REACT_APP_API_HOST}/opportunities/by_stages`)
        .then(data => {
            console.log("Sales funnel data:", data);
            setFunnelData(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    return (
        <div className="sales-funnel-bar ml-4 mt-4 mr-4 p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Sales Funnel:</h2>
            <FunnelChart 
                pallette={['#4466a3', '#4e97a8', '#1d7b63', '#f39c35']}
                data={opportunityStages.map(stage => ({ name: stage.value, value: funnelData[stage.key] || 0 }))}
                onRowClick={handleRowClick}
            />
        </div>
    );
}

export default SalesFunnelBar;