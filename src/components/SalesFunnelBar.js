import { useEffect, useState } from "react";
import { FunnelChart } from 'react-funnel-pipeline'
import 'react-funnel-pipeline/dist/index.css'
import { opportunityStages } from '../constants/opportunityOptions.js'

function SalesFunnelBar() {
    const [funnelData, setFunnelData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}//opportunities/by_stages`, {
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
                throw new Error('Failed to fetch Sales funnel');
            }
        })
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
            />
        </div>
        
    )
}

export default SalesFunnelBar;