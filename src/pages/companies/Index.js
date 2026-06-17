import {useEffect, useState} from "react";
import RecordList from "../../components/RecordList";


function CompaniesIndex() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
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
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold m-4">Companies List</h1>
            <RecordList records={companies.map(company => company.name)} />
        </div>
    );
}

export default CompaniesIndex;
