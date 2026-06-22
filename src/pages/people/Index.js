import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import RecordList from "../../components/RecordList";


function PeopleIndex() {
    const [people, setPeople] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/people' && people.length > 0) return;
        // Fetch people data from API and update state
        fetch('http://localhost:3000/clients', {
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
    }, [location.key, location.pathname]);

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">People List</h1>
            <RecordList records={people.map(person => (
              {
                id: person.id,
                caption: person.name,
                description: person.about,
                show_path: `/person/show/${person.id}`,
                edit_path: `/person/edit/${person.id}`,
                avatar_url: person.avatar_url
              })
            )} defaultImage="/def_person_ava.png" />
        </div>
    );
}

export default PeopleIndex;
