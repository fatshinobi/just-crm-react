import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams, useLocation } from 'react-router-dom'
import { opportunityStages, opportunityStatuses } from '../../constants/opportunityOptions';

function OpportunityEdit() {
    const { id = "" } = useParams();
    const { opportunity_id } = useParams();
    const location = useLocation();
    const isPersonContext = location.pathname.includes("/person/opportunities/edit/");
    const isCompanyContext = location.pathname.includes("/company/opportunities/edit/");
    const [opportunity, setOpportunity] = useState({});
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [people, setPeople] = useState([]);
    const [person, setPerson] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();

    const navigatePath = () => {
      switch (true) {
        case location.pathname.includes("/company/opportunities/edit/"):
            return `/company/details/${id}`;
        case location.pathname.includes("/person/opportunities/edit/"):
            return `/person/details/${id}`;
        default:
            return "/opportunities";
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
        if (isCompanyContext) return true;
        return false;
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_HOST}/opportunities/${opportunity_id}`, {
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
            throw new Error('Failed to fetch opportunity');
          }
        })
        .then(data => {
          console.log('Opportunity data:', data);
          setOpportunity(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [opportunity_id]);

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
    }, [isPersonContext, id]);

    useEffect(() => {
        if ((typeof opportunity.customer_id === "undefined") || (opportunity.customer_id === "")) {
            setPeople([]);
            return;
        }
        fetch(`${process.env.REACT_APP_API_HOST}/catalogs/clients_for_customer/${opportunity.customer_id}`, {
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
    }, [opportunity.customer_id]);

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

    const fieldValidate = (record, value) => {
        if ((record === "title") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Title must be present" }));
        } else if ((record === "amount") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Amount must be present" }));
        } else if ((record === "stage") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Stage must be selected" }));
        } else if ((record === "status") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Status must be selected" }));
        } else if ((record === "start") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Start date must be present" }));
        } else if ((record === "finish") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Finish date must be present" }));
        } else if ((record === "user_id") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "User must be selected" }));
        } else if ((record === "customer_id") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Company must be selected" }));
        } else if ((record === "client_id") && ((value === null) || (value.trim() === ""))) {
            setFormErrors(prev => ({ ...prev, [record]: "Person must be selected" }));
        } else {
            setFormErrors(prev => {
                const { [record]: _, ...rest } = prev;
                return rest;
            });
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOpportunity(prev => ({ ...prev, [name]: value }));
        fieldValidate(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formErrors).length !== 0) {
            return;
        }
        const formData = new FormData();
        if (opportunity.title !== null) formData.append('title', opportunity.title);
        if (opportunity.description !== null) formData.append('description', opportunity.description);
        if (opportunity.amount !== null) formData.append('amount', opportunity.amount);
        if (opportunity.stage !== null) formData.append('stage', opportunity.stage);
        if (opportunity.status !== null) formData.append('status', opportunity.status);
        if (opportunity.start !== null) formData.append('start', opportunity.start);
        if (opportunity.finish !== null) formData.append('finish', opportunity.finish);
        if (opportunity.user_id !== null) formData.append('user_id', opportunity.user_id);
        if (opportunity.customer_id !== null) formData.append('customer_id', opportunity.customer_id);
        if ((opportunity.client_id !== null) && (typeof opportunity.client_id !== "undefined")) formData.append('client_id', opportunity.client_id);

        fetch(`${process.env.REACT_APP_API_HOST}/opportunities/${opportunity_id}`, {
            method: 'PATCH',
            headers: {
                'authorization': localStorage.getItem('accessToken')
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                navigate(navigatePath());
            } else {
                throw new Error('Failed to update opportunity');
            }
        })
        .then(data => {
            console.log('Opportunity updated:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Opportunity Edit</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Title:</label>
                    <input type="text" name="title" value={opportunity?.title || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    {formErrors["title"] && <p style={{ color: "red" }}>{formErrors["title"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Description:</label>
                    <textarea name="description" value={opportunity?.description || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                    {formErrors["description"] && <p style={{ color: "red" }}>{formErrors["description"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Amount:</label>
                    <input type="number" name="amount" value={opportunity?.amount || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    {formErrors["amount"] && <p style={{ color: "red" }}>{formErrors["amount"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Stage:</label>
                    <select type="text" name="stage" value={opportunity?.stage} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select a Stage</option>
                        {opportunityStages.map(stage => (
                            <option key={stage.key} value={stage.key}>
                                {stage.value}
                            </option>
                        ))}
                    </select>
                    {formErrors["stage"] && <p style={{ color: "red" }}>{formErrors["stage"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Status:</label>
                    <select type="text" name="status" value={opportunity?.status} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select Status</option>
                        {opportunityStatuses.map(status => (
                            <option key={status.key} value={status.key}>
                                {status.value}
                            </option>
                        ))}
                    </select>
                    {formErrors["status"] && <p style={{ color: "red" }}>{formErrors["status"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Start:</label>
                    <input type="date" name="start" value={opportunity?.start || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    {formErrors["start"] && <p style={{ color: "red" }}>{formErrors["start"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Finish:</label>
                    <input type="date" name="finish" value={opportunity?.finish || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></input>
                    {formErrors["finish"] && <p style={{ color: "red" }}>{formErrors["finish"]}</p>}
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Curator:</label>
                    <select type="text" name="user_id" value={opportunity?.user_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.key} value={user.key}>
                                {user.value}
                            </option>
                        ))}
                    </select>
                    {formErrors["user_id"] && <p style={{ color: "red" }}>{formErrors["user_id"]}</p>}
                </div>
                { selectCompany() ?
                    <div>
                        <label className="block text-gray-700 mb-1">Company:</label>
                        <select type="text" name="customer_id" value={opportunity?.customer_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
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
                { selectPerson() ?
                    <div>
                        <label className="block text-gray-700 mb-1">Person:</label>
                        <select type="text" name="client_id" value={opportunity?.client_id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" >
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

                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded">Save</button>
                <Link to={navigatePath()} className="bg-grey-200 hover:bg-gray-400 px-7 py-3 mb-5 ml-5 rounded-md text-md font-medium">Cancel</Link>
            </form>
        </div>
    );
}

export default OpportunityEdit;
