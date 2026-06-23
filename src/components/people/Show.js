import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'

function PersonShow() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const avatar_url = process.env.PUBLIC_URL + "/def_person_ava.png";

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

    return (
        <div>
            <h1 className="text-3xl font-bold m-4">Person Details</h1>
            {person ? (
                <div className="m-4 p-4 border rounded-lg shadow-lg pb-7">
                    <img src={person.avatar_url ? person.avatar_url :avatar_url} alt="Person Avatar" className="w-40 h-40 object-cover mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">{person.name}</h2>
                    <p className="mb-5"><strong>Description:</strong> {person.about}</p>
                    <p className="mb-1"><strong>Email:</strong> {person.email}</p>
                    <p className="mb-1"><strong>Phone:</strong> {person.phone}</p>
                    <p className="mb-1"><strong>Social:</strong> {person.social}</p>
                    <p className="mb-5"><strong>User:</strong> {person.user_name}</p>
                    <Link to={`/person/edit/${id}`} className="bg-green-500 hover:bg-green-700 px-7 py-3 mb-5 rounded-md text-md font-medium">Edit</Link>
                </div>
            ) : (
                <p className="m-4">Loading person details...</p>
            )}
        </div>
    );
}

export default PersonShow;
