import { useEffect, useState } from 'react'
import TagsCloud from "../TagsCloud";

function CompaniesTagsSidebar() {
    const [cloudTags, setCloudTags] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000//customer_tags`, {
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
        console.log("Filter by tag: ", tagVal);
    }

    return (
        <div>
            <label className="text-2xl font-semibold mb-2 ml-3">Tags</label>
            <TagsCloud cloudTags={cloudTags} processTag={filterByTag} />
        </div>
    )
}

export default CompaniesTagsSidebar;
