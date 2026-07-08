import React, { useState, useEffect} from "react";

const ApiAutocomplete = ({curValue, fieldName, fieldChangeHandler}) => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (query.length < 2) {
            return;
        }

        if (query.trim() === '') {
            setSuggestions([]);
            return;
        }

        const fetchRecords = async () => {
            console.log("Fetched start");
            try {
                const result = await fetch(`http://localhost:3000/roles/${query}`, {
                    method: 'GET',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': localStorage.getItem('accessToken')
                    }
                })

                const data = await result.json();
                console.log("Fetched suggestions:", data);
                setSuggestions(data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchRecords();
    }, [query]);

    return (
        <>
            {console.log("query inp", query)}
            <input
                type="text"
                list="records-suggestions"
                value={curValue}
                name={fieldName}
                autocomplete="off"
                onChange={(e) => {
                    setQuery(e.target.value);
                    fieldChangeHandler(e);
                }}
                placeholder="Search..."
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <datalist id="records-suggestions">
                {suggestions.map((record) => (
                    <option key={record} value={record} />
                ))}
            </datalist>
        </>
    );
}

export default ApiAutocomplete;
