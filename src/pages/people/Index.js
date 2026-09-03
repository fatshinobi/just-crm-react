import {useEffect, useState} from "react";
import { useLocation, useParams } from "react-router-dom";
import RecordList from "../../components/RecordList";
import { apiGet } from "../../api/apiFetch";


function PeopleIndex() {
    const [people, setPeople] = useState([]);
    const location = useLocation();
    const { tag } = useParams();
    const { query } = useParams();

    useEffect(() => {
        if (!location.pathname.includes('/people') && people.length > 0) return;
        // Fetch people data from API and update state
        let url = `${process.env.REACT_APP_API_HOST}/clients`;
        if (typeof tag !== "undefined") {
          url = `${url}?tag=${tag}`;
        } else if (typeof query !== "undefined" && query.length > 2 ) {
          url = `${url}?search=${query}`;
        }

        apiGet(url)
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
                avatar_url: person.avatar_url,
                tags: (person.tags || []).map(tag => tag.name)
              }
            ))} defaultImage="/def_person_ava.png" />
        </div>
    );
}

export default PeopleIndex;
