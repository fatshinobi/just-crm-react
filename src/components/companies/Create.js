import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function CompanyCreate() {
    const [company, setCompany] = useState({ name: '', about: '', email: '', phone: '', address: '' });
    const [users, setUsers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3000/catalogs/users`, {
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
          console.log('Users data:', data);
          setUsers(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompany(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', company.name);
        formData.append('about', company.about);
        formData.append('email', company.email);
        formData.append('phone', company.phone);
        formData.append('address', company.address);
        formData.append('user_id', company.user_id);
        if (selectedFile) {
            formData.append('avatar', selectedFile);
        }

        fetch(`http://localhost:3000/customers`, {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('accessToken')
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                //return response.json();
                navigate("/companies");
            } else {
                throw new Error('Failed to create company');
            }
        })
        .then(data => {
            console.log('Company created:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Company Create</h1>
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
                <div>
                    <label className="block text-gray-700 mb-1">Curator:</label>
                    <select type="text" name="user_id" value={company?.user_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.key} value={user.key}>
                                {user.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Company Logo:</label>
                    <input type="file" name="avatar" onChange={(e) => setSelectedFile(e.target.files[0])} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
            </form>
        </div>
    );
}

export default CompanyCreate;
