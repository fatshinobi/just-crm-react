import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom'
import { communicationTypes, appointmentStatuses } from '../../constants/appointmentOptions';

function AppointmentCreate() {
    const { id = "" } = useParams();
    const location = useLocation();
    const isPersonContext = location.pathname.includes("/person/appointments/create/");
    const isCompanyContext = location.pathname.includes("/company/appointments/create/");
    const initValues = id === "" ? {} : (isPersonContext ? {"client_id": id} : {"customer_id": id})
    const [appointment, setAppointment] = useState(initValues);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [people, setPeople] = useState([]);
    const [person, setPerson] = useState(null);
    const [opportunities, setOpportunities] = useState([]);

    let currentCompany = null;

    let defaultValidationErrors = {
        "about": "About must be present",
        "user_id": "User must be selected",
        "communication_type": "Communication Type must be selected",
        "status": "Status must be selected",
        "when": "When must be selected"
    }

    if ((id === "") || (isPersonContext)) defaultValidationErrors["customer_id"] = "Company must be selected";

    const [formErrors, setFormErrors] = useState(defaultValidationErrors);
    const navigate = useNavigate();

    const navigatePath = () => {
      switch (true) {
        case location.pathname.includes("/company/appointments/create/"):
            return `/company/details/${id}`;
        case location.pathname.includes("/companies/appointment/create"):
            return "/companies";
        case location.pathname.includes("/person/appointments/create/"):
            return `/person/details/${id}`;
        case location.pathname.includes("/people/appointment/create"):
            return `/people`;
        default:
            return "/";

      }
    }

    const selectCompany = () => {
        if (id === "") return true;
        if (isPersonContext) return true;
        return false;
    }

    const selectPerson = () => {
        if (id === "") return true;
        if (isPersonContext) return false;
        return true;
    }

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
        const customerUrl = isPersonContext ?
            `${process.env.REACT_APP_API_HOST}/catalogs/customers_for_client/${id}`
        :
            `${process.env.REACT_APP_API_HOST}/catalogs/customers`

        fetch(customerUrl, {
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

    useEffect(() => {
        if (!isPersonContext || id === "") return;
        fetch(`${process.env.REACT_APP_API_HOST}/clients/${id}`, {
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
    }, [isPersonContext, id]);

    useEffect(() => {
        let opportunityUrl = null;
        if (isCompanyContext && ((typeof appointment.customer_id === "undefined") || (appointment.customer_id === ""))) {
            setOpportunities([]);
            return;
        }

        if (isPersonContext && ((typeof appointment.client_id === "undefined") || (appointment.client_id === ""))) {
            setOpportunities([]);
            return;
        }

        if ((typeof appointment.client_id !== "undefined") && (appointment.client_id !== "") && (typeof appointment.customer_id !== "undefined") && (appointment.customer_id !== "")) {
            opportunityUrl = `catalogs/opportunities_for_client_customer/${appointment.client_id}/${appointment.customer_id}`;
        } else if (isPersonContext) {
            opportunityUrl = `catalogs/opportunities_for_client/${appointment.client_id}`;
        } else {
            opportunityUrl = `catalogs/opportunities_for_customer/${appointment.customer_id}`;
        }

        fetch(`${process.env.REACT_APP_API_HOST}/${opportunityUrl}`, {
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
            throw new Error('Failed to fetch opportunities');
          }
        })
        .then(data => {
          console.log('Opportunities data:', data);
          setOpportunities(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [appointment.customer_id, appointment.client_id]);

    const fieldValidate = (record, value) => {
        if ((record === "about") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Name must be present" }));
        } else if ((record === "communication_type") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Communication Type must be present" }));
        } else if ((record === "status") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Status must be present" }));
        } else if ((record === "when") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "When must be present" }));
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
        if (appointment.opportunity_id !== null) formData.append('opportunity_id', appointment.opportunity_id);
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
                navigate(navigatePath());
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
                            <option key={type.key} value={type.key}>
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
                            <option key={status.key} value={status.key}>
                                {status.value}
                            </option>
                        ))}
                    </select>
                    {formErrors["status"] && <p style={{ color: "red" }}>{formErrors["status"]}</p>}
                </div>
                { selectCompany() ?
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
                :
                    <div>
                        <label className="block text-gray-700 mb-1">Company:</label>
                        <p>{ companies.find(company => company.key.toString() === id)?.value }</p>
                    </div>
                }
                {  selectPerson() ?
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
                :
                    <div>
                        <label className="block text-gray-700 mb-1">Person:</label>
                        <p>{ person?.name }</p>
                    </div>
                }

                <div>
                    <label className="block text-gray-700 mb-1">Opportunity:</label>
                    <select type="text" name="opportunity_id" value={appointment?.opportunity_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select an opportunities</option>
                        {opportunities.map(opportunity => (
                            <option key={opportunity.key} value={opportunity.key}>
                                {opportunity.value}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <Link to={navigatePath()} className="bg-grey-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Cancel</Link>
            </form>
        </div>
    );
}

export default AppointmentCreate;
