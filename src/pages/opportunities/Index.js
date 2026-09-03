import {useEffect, useState} from "react";
import { useLocation, useParams } from "react-router-dom";
import OpportunityCard from "../../components/opportunities/Card";
import { apiGet } from "../../api/apiFetch";

function OpportunitiesIndex() {
    const [opportunities, setOpportunities] = useState([]);
    const location = useLocation();
    const { tag } = useParams();
    const { query } = useParams();
    const { stage } = useParams();

    useEffect(() => {
        if (!location.pathname.includes('/opportunities') && opportunities.length > 0) return;

        let url = `${process.env.REACT_APP_API_HOST}/opportunities`;
        if (typeof tag !== "undefined") {
            url = `${url}?tag=${tag}`;
        } else if (typeof query !== "undefined" && query.length > 2 ) {
            url = `${url}?search=${query}`;
        } else if (typeof stage !== "undefined" ) {
            url = `${url}?stage=${stage}`;
        }

        apiGet(url)
        .then(data => {
          console.log('Opportunities data:', data);
          setOpportunities(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [location.key, location.pathname]);

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">Opportunities List</h1>
            <div>
                {opportunities.map((record, index) => (
                <OpportunityCard record={record} link_path={`/opportunity/show/${record.id}`} key={index} />
                ))}
            </div>
        </div>
    );
}

export default OpportunitiesIndex;
