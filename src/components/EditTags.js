import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import TagsCloud from "./TagsCloud"

function EditTags({ tagType }) {
    const { id } = useParams();
    const [tags, setTags] = useState("");
    const [cloudTags, setCloudTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3000/customers/${id}/tags`, {
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
            throw new Error('Failed to fetch company tags');
            }
        })
        .then(data => {
            console.log('Company Person data:', data);
            setTags(data.join(", "));
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [id]);

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

    const handleChange = (e) => {
        const { value } = e.target;
        setTags( value );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('tags', tags);

        fetch(`http://localhost:3000/customers/${id}/tags`, {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('accessToken')
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                navigate(`/company/details/${id}`);
            } else {
                throw new Error('Failed to update customer tags');
            }
        })
        .then(data => {
            console.log('Customer updated:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const addTagToList = (tagVal) => {
        setTags(prevText => `${prevText}${ prevText === "" ? "" : ", "}${tagVal}`);
    }

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Tags Edit</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Tags List:</label>
                    <input type="text" name="tags" value={tags || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <Link to={`/company/details/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 ml-2 rounded">View</Link>
            </form>
            <TagsCloud cloudTags={cloudTags} processTag={addTagToList} />
        </div>
    );
}

export default EditTags;