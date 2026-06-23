import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

function PersonEdit() {
    const { id } = useParams();
    const [person, setPerson] = useState({ name: '', about: '', email: '', phone: '', address: '' });
    const [users, setUsers] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:3000/clients/${id}`, {
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
            throw new Error('Failed to fetch person');
          }
        })
        .then(data => {
          console.log('Person data:', data);
          setPerson(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [id]);

    useEffect(() => {
        if (!id) return;
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
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPerson(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', person.name);
        formData.append('about', person.about);
        formData.append('email', person.email);
        formData.append('phone', person.phone);
        formData.append('social', person.social);
        formData.append('user_id', person.user_id);
        
        if (selectedFile) {
            formData.append('avatar', selectedFile);
        }

        fetch(`http://localhost:3000/clients/${id}`, {
            method: 'PATCH',
            headers: {
                'authorization': localStorage.getItem('accessToken')
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                //return response.json();
                navigate("/people");
            } else {
                throw new Error('Failed to update person');
            }
        })
        .then(data => {
            console.log('Person updated:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Person Edit</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Person Name:</label>
                    <input type="text" name="name" value={person?.name || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Person Description:</label>
                    <textarea name="about" value={person?.about || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Person Email:</label>
                    <input type="email" name="email" value={person?.email || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Person Phone:</label>
                    <input type="text" name="phone" value={person?.phone || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Person Social:</label>
                    <input type="text" name="social" value={person?.social || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Curator:</label>
                    <select type="text" name="user_id" value={person?.user_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.key} value={user.key}>
                                {user.value}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Person Logo:</label>
                    <input type="file" name="avatar" onChange={(e) => setSelectedFile(e.target.files[0])} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <Link to={`/person/show/${person?.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 ml-2 rounded">View</Link>
            </form>
        </div>
    );
}

export default PersonEdit;
