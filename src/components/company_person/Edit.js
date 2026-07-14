import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ApiAutocomplete from "../ApiAutocomplete"

function CompanyPersonEdit() {
    const [companyPerson, setCompanyPerson] = useState({ role: '' });
    const { person_id } = useParams();
    const { id } = useParams();
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!person_id) return;
        fetch(`${process.env.REACT_APP_API_HOST}/client_customers/${person_id}`, {
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
            console.log('Company Person data:', data);
            setCompanyPerson(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, [person_id]);

    const fieldValidate = (record, value) => {
        if ((record === "role") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Role must be present" }));
        } else {
            setFormErrors(prev => {
                const { [record]: _, ...rest } = prev;
                return rest;
            });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanyPerson(prev => ({ ...prev, [name]: value }));
        fieldValidate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formErrors).length !== 0) {
            return;
        }
        const formData = new FormData();
        if (companyPerson.role !== null) formData.append('role', companyPerson.role);
if (companyPerson.client_id !== null) formData.append('client_id', companyPerson.client_id);

         fetch(`${process.env.REACT_APP_API_HOST}/client_customers/${person_id}`, {
             method: 'PATCH',
            headers: {
                'authorization': localStorage.getItem('accessToken')
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                navigate(`/company/details/${companyPerson.customer_id}`);
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
            <h1 className="text-3xl font-bold mb-6">Edit Person</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <p className="mb-5"><strong>Person:</strong><Link to={`/person/show/${companyPerson.client_id}`} className="pl-3">{companyPerson.client_name}</Link></p>
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Role:</label>
                    <ApiAutocomplete curValue={companyPerson?.role || ''} fieldName="role" fieldChangeHandler={handleChange} />
                    {formErrors["role"] && <p style={{ color: "red" }}>{formErrors["role"]}</p>}
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <Link to={`/company/details/${companyPerson.customer_id}`} className="bg-grey-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Cancel</Link>
            </form>
        </div>
    );
}

export default CompanyPersonEdit;
