import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
        <div>
            <h1 className="text-3xl font-bold m-4">Company Edit</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={company?.name || ''} onChange={handleChange} placeholder="Company Name" className="border p-2 rounded mb-2 w-full" />
                <textarea name="about" value={company?.about || ''} onChange={handleChange} placeholder="Company Description" className="border p-2 rounded mb-2 w-full"></textarea>
                <input type="email" name="email" value={company?.email || ''} onChange={handleChange} placeholder="Company Email" className="border p-2 rounded mb-2 w-full" />
                <input type="text" name="phone" value={company?.phone || ''} onChange={handleChange} placeholder="Company Phone" className="border p-2 rounded mb-2 w-full" />
                <input type="text" name="address" value={company?.address || ''} onChange={handleChange} placeholder="Company Address" className="border p-2 rounded mb-2 w-full" />
                <button type="submit" className="bg-green-500 hover:bg-green-700 px-7 py-3 mb-5 rounded-md text-md font-medium">Save</button>
            </form>
        </div>
    );
}

export default CompanyEdit;
