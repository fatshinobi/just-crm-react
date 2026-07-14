import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TagsCloud from "../TagsCloud";

function PeopleTagsSidebar() {
    const [cloudTags, setCloudTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/client_tags`, {
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
                throw new Error('Failed to fetch tags');
            }
        })
        .then(data => {
            console.log('Tags data:', data);
            setCloudTags(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    const filterByTag = (tagVal) => {
        navigate(`/people/tags/${tagVal}`);
    }

    return (
        <div className="ml-3">
            <label className="text-2xl font-semibold mb-2">Tags</label>
            <TagsCloud cloudTags={cloudTags} processTag={filterByTag} />
        </div>
    )
}

export default PeopleTagsSidebar;