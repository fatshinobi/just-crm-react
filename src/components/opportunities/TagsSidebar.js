import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TagsCloud from "../TagsCloud";
import { apiGet } from "../../api/apiFetch";

function OpportunityTagsSidebar() {
    const [cloudTags, setCloudTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        apiGet(`${process.env.REACT_APP_API_HOST}/opportunity_tags`)
        .then(data => {
            console.log('Tags data:', data);
            setCloudTags(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    const filterByTag = (tagVal) => {
        navigate(`/opportunities/tags/${tagVal}`);
    }

    return (
        <div className="ml-3">
            <label className="text-2xl font-semibold mb-2">Tags</label>
            <TagsCloud cloudTags={cloudTags} processTag={filterByTag} />
        </div>
    )
}

export default OpportunityTagsSidebar;