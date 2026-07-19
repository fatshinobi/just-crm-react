import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function AppointmentCreate() {
    const [appointment, setAppointment] = useState({});
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [people, setPeople] = useState([]);
    const communicationTypes = [
        {key: "0", value: "Task"},
        {key: "1", value: "Email"},
        {key: "2", value: "Phone"}
    ];

    const appointmentStatuses = [
        {key: "0", value: "Draft"},
        {key: "1", value: "Planned"},
        {key: "2", value: "Finished"}
    ];

    const [formErrors, setFormErrors] = useState({
        "about": "About must be present",
        "user_id": "User must be selected",
        "customer_id": "Company must be selected",
        "communication_type": "Communication Type must be selected",
        "status": "Status must be selected",
        "when": "When must be selected"
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/catalogs/users`, {
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

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/catalogs/customers`, {
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
            throw new Error('Failed to fetch customers');
          }
        })
        .then(data => {
          console.log('Customers data:', data);
          setCompanies(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);

    useEffect(() => {
        if ((typeof appointment.customer_id === "undefined") || (appointment.customer_id === "")) {
            setPeople([]);
            return;
        }
        fetch(`${process.env.REACT_APP_API_HOST}/catalogs/clients_for_customer/${appointment.customer_id}`, {
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
            throw new Error('Failed to fetch people');
          }
        })
        .then(data => {
          console.log('People data:', data);
          setPeople(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [appointment.customer_id]);

    const fieldValidate = (record, value) => {
        if ((record === "about") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Name must be present" }));
        } else if ((record === "communication_type") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Communication Type must be present" }));
        } else if ((record === "status") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Status must be present" }));
        } else if ((record === "when") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Status must be present" }));
        } else if ((record === "user_id") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "User must be selected" }));
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
        setAppointment(prev => ({ ...prev, [name]: value }));
        fieldValidate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formErrors).length !== 0) {
            return;
        }
        const formData = new FormData();
        if (appointment.about !== null) formData.append('about', appointment.about);
        if (appointment.communication_type !== null) formData.append('communication_type', appointment.communication_type);
        if (appointment.status !== null) formData.append('status', appointment.status);
        if (appointment.when !== null) formData.append('when', appointment.when);
        if (appointment.user_id !== null) formData.append('user_id', appointment.user_id);
        if (appointment.customer_id !== null) formData.append('customer_id', appointment.customer_id);
        if ((appointment.client_id !== null) && (typeof appointment.client_id !== "undefined")) formData.append('client_id', appointment.client_id);

        fetch(`${process.env.REACT_APP_API_HOST}/appointments`, {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('accessToken')
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                navigate("/companies");
            } else {
                throw new Error('Failed to create appointment');
            }
        })
        .then(data => {
            console.log('Appointment created:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Appointment Create</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">When:</label>
                    <input type="datetime-local" name="when" value={appointment?.when || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    {formErrors["when"] && <p style={{ color: "red" }}>{formErrors["when"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Appointment Description:</label>
                    <textarea name="about" value={appointment?.about || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                    {formErrors["about"] && <p style={{ color: "red" }}>{formErrors["about"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Curator:</label>
                    <select type="text" name="user_id" value={appointment?.user_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.key} value={user.key}>
                                {user.value}
                            </option>
                        ))}
                    </select>
                    {formErrors["user_id"] && <p style={{ color: "red" }}>{formErrors["user_id"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Communication Type:</label>
                    <select type="text" name="communication_type" value={appointment?.communication_type || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select a Communication Type</option>
                        {communicationTypes.map(type => (
                            <option key={type.key} value={type.value}>
                                {type.value}
                            </option>
                        ))}
                    </select>
                    {formErrors["communication_type"] && <p style={{ color: "red" }}>{formErrors["communication_type"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Status:</label>
                    <select type="text" name="status" value={appointment?.status || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select Status</option>
                        {appointmentStatuses.map(status => (
                            <option key={status.key} value={status.value}>
                                {status.value}
                            </option>
                        ))}
                    </select>
                    {formErrors["status"] && <p style={{ color: "red" }}>{formErrors["status"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Company:</label>
                    <select type="text" name="customer_id" value={appointment?.customer_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select a company</option>
                        {companies.map(company => (
                            <option key={company.key} value={company.key}>
                                {company.value}
                            </option>
                        ))}
                    </select>
                    {formErrors["customer_id"] && <p style={{ color: "red" }}>{formErrors["customer_id"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Person:</label>
                    <select type="text" name="client_id" value={appointment?.client_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select a person</option>
                        {people.map(person => (
                            <option key={person.key} value={person.key}>
                                {person.value}
                            </option>
                        ))}
                    </select>
                    {formErrors["client_id"] && <p style={{ color: "red" }}>{formErrors["client_id"]}</p>}
                </div>

                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <Link to={"/companies"} className="bg-grey-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Cancel</Link>
            </form>
        </div>
    );
}

export default AppointmentCreate;
