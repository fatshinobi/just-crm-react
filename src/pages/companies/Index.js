import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import RecordList from "../../components/RecordList";


function CompaniesIndex() {
    const [companies, setCompanies] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/companies' && location.pathname !== '/') return;
        // Fetch companies data from API and update state
        fetch('http://localhost:3000/customers', {
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
            throw new Error('Failed to fetch companies');
          }
        })
        .then(data => {
          console.log('Companies data:', data);
          setCompanies(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [location.key, location.pathname]);

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">Companies List</h1>
            <RecordList records={companies.map(company => (
              {
                id: company.id,
                caption: company.name,
                description: company.about,
                show_path: `/company/show/${company.id}`,
                edit_path: `/company/edit/${company.id}`
              })
            )} />
        </div>
    );
}

export default CompaniesIndex;
