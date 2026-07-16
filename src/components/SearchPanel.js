import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SearchPanel({ tagType }) {
    const [searchValue, setSearchValue] = useState([]);
    const navigate = useNavigate();
    const navigationRoute = tagType === "0" ? "companies" : "people";

    const handleChange = (e) => {
        const { value } = e.target;
        setSearchValue(value);
        const resolvedRoute = (value === "") ? `/${navigationRoute}` : `/${navigationRoute}/search/${value}`

        navigate(resolvedRoute);
    };

    return (
        <div className="p-4">
            <div>
                <label className="block text-gray-700 mb-1">Search (at least 3 chars):</label>
                <input type="text" name="search" value={searchValue || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
        </div>
    );
}

export default SearchPanel;
