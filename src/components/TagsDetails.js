import { useEffect, useState } from "react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../api/apiFetch";

function TagsDetails({ tagType, tagName }) {
    const [tags, setTags] = useState([]);
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const tagApiEndpoints = {
        0: "customers",
        1: "clients",
        2: "opportunities"
    };

    const tagRoutePrefixes = {
        0: "company",
        1: "person",
        2: "opportunity"
    };

    const tagLabels = {
        0: "company",
        1: "person",
        2: "opportunity"
    };

    useEffect(() => {
        if (!id) return;
        apiGet(`${process.env.REACT_APP_API_HOST}/${tagApiEndpoints[tagType]}/${id}/tags`)
        .then(data => {
            console.log(`${tagName} tags data:`, data);
            setTags(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [location.key, location.pathname, id, tagType, tagName]);

    return (
        <>
            <label className="ml-4">Tags:</label>
            {tags.map((tagRecord, tagIndex) => (
                <span className="bg-gray-500 text-white font-semibold py-1 px-2 ml-2 rounded" key={tagIndex}>{tagRecord}</span>
            ))}
            <Link to={`/${tagRoutePrefixes[tagType]}/tags/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 ml-2 rounded">Edit Tags+</Link>
        </>
    );
}

export default TagsDetails;
