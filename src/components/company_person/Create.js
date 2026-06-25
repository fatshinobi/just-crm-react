import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function CompanyPersonCreate() {
    const [companyPerson, setCompanyPerson] = useState({ role: '' });
    const [people, setPeople] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/catalogs/clients_by_customer/${id}`, {
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
            throw new Error('Failed to fetch users');
          }
        })
        .then(data => {
          console.log('People data:', data);
          setPeople(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyPerson(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (companyPerson.role !== null) formData.append('role', companyPerson.role);
        if (companyPerson.client_id !== null) formData.append('client_id', companyPerson.client_id);
        formData.append('customer_id', id);

        fetch(`http://localhost:3000/client_customers`, {
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
                throw new Error('Failed to create person for the company');
            }
        })
        .then(data => {
            console.log('Person for the company created:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Add Person</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Person:</label>
                    <select type="text" name="client_id" value={companyPerson?.client_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select a person</option>
                        {people.map(person => (
                            <option key={person.key} value={person.key}>
                                {person.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Role:</label>
                    <input type="text" name="role" value={companyPerson?.role || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
            </form>
        </div>
    );
}

export default CompanyPersonCreate;
