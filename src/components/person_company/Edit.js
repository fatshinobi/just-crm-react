import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import ApiAutocomplete from "../ApiAutocomplete"

function PersonCompanyEdit() {
    const [companyPerson, setCompanyPerson] = useState({ role: '' });
    const { company_id } = useParams();
    const { id } = useParams();
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!company_id) return;
        fetch(`${process.env.REACT_APP_API_HOST}/client_customers/${company_id}`, {
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
            throw new Error('Failed to fetch company person record');
            }
        })
        .then(data => {
            console.log('Company Person data:', data);
            setCompanyPerson(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}, [company_id]);

    const fieldValidate = (record, value) => {
        if ((record === "role") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Role must be present" }));
        } else if ((record === "customer_id") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Company must be selected" }));
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

         fetch(`${process.env.REACT_APP_API_HOST}/client_customers/${company_id}`, {
             method: 'PATCH',
            headers: {
                'authorization': localStorage.getItem('accessToken')
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                navigate(`/person/details/${id}`);
            } else {
                throw new Error('Failed to update company for the person');
            }
        })
        .then(data => {
            console.log('Company for the person updated:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Edit Company</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <p className="mb-5"><strong>Company:</strong><Link to={`/company/show/${companyPerson.customer_id}`} className="pl-3">{companyPerson.customer_name}</Link></p>
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Role:</label>
                    <ApiAutocomplete curValue={companyPerson?.role || ''} fieldName="role" fieldChangeHandler={handleChange} />
                    {formErrors["role"] && <p style={{ color: "red" }}>{formErrors["role"]}</p>}
                </div>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <Link to={`/person/details/${id}`} className="bg-grey-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Cancel</Link>
            </form>
        </div>
    );
}

export default PersonCompanyEdit;