import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function CompanyEdit() {
    const { id } = useParams();
    const [company, setCompany] = useState({ name: '', about: '', email: '', phone: '', address: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
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
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/customers/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': localStorage.getItem('accessToken')
            },
            body: JSON.stringify({
                name: company.name,
                about: company.about,
                email: company.email,
                phone: company.phone,
                address: company.address
            })
        })
        .then(response => {
            if (response.ok) {
                //return response.json();
                navigate("/companies");
            } else {
                throw new Error('Failed to update company');
            }
        })
        .then(data => {
            console.log('Company updated:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Company Edit</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Company Name:</label>
                    <input type="text" name="name" value={company?.name || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Company Description:</label>
                    <textarea name="about" value={company?.about || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Company Email:</label>
                    <input type="email" name="email" value={company?.email || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Company Phone:</label>
                    <input type="text" name="phone" value={company?.phone || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Company Address:</label>
                    <input type="text" name="address" value={company?.address || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <Link to={`/company/show/${company?.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 ml-2 rounded">View</Link>
            </form>
        </div>
    );
}

export default CompanyEdit;
