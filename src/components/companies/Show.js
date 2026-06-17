import React, { useEffect, useState } from 'react';    
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
    
function CompanyShow() {
    const { id } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        // Fetch company data from API and update state
        fetch(`http://localhost:3000/customers/${id}`, {
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
            throw new Error('Failed to fetch company');
          }
        })
        .then(data => {
          console.log('Company data:', data);
          setCompany(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold m-4">Company Details</h1>
            {company ? (
                <div className="m-4 p-4 border rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-2">{company.name}</h2>
                    <p className="mb-5"><strong>Description:</strong> {company.about}</p>
                    <p className="mb-1"><strong>Email:</strong> {company.email}</p>
                    <p className="mb-1"><strong>Phone:</strong> {company.phone}</p>
                    <p className="mb-1"><strong>Address:</strong> {company.address}</p>
                    <p className="mb-5"><strong>User:</strong> {company.user_name}</p>
                    <Link to={`/company/edit/${id}`} className="bg-green-500 hover:bg-green-700 px-7 py-3 mb-5 rounded-md text-sm font-medium">Edit</Link>
                </div>
            ) : (
                <p className="m-4">Loading company details...</p>
            )}
        </div>
    );
}

export default CompanyShow;