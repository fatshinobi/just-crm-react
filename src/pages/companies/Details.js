import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import NewCard from "../../components/NewCard";
import ElementCard from "../../components/ElementCard";

function CompanyDetails() {
  const [people, setPeople] = useState([]);
  const [tags, setTags] = useState([]);
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/customers/clients/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch people");
        }
      })
      .then((data) => {
        console.log("People data:", data);
        setPeople(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [location.key, location.pathname]);

    useEffect(() => {
        if (!id) return;
        fetch(`${process.env.REACT_APP_API_HOST}/customers/${id}/tags`, {
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
            throw new Error('Failed to fetch company tags');
            }
        })
        .then(data => {
            console.log('Company Person data:', data);
            setTags(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }, [location.key, location.pathname]);

  return (
    <div>
      <h1 className="text-4xl font-bold m-4">Company details</h1>
      <label className="ml-4">Tags:</label>
      {tags.map((tagRecord, tagIndex) => (
        <span className="bg-gray-500 text-white font-semibold py-1 px-2 ml-2 rounded">{tagRecord}</span>
      ))}

      <Link to={`/company/tags/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 ml-2 rounded">Edit Tags+</Link>
      <h2 className="text-3xl font-bold m-4">People</h2>

      <div className="gap-4 flex m-5">
        {people.map((record, index) => (
          <ElementCard record={record} default_image={"/def_person_ava.png"} link_path={`/company_person/edit/${record.id}/${record.customer_id}`} key={index} />
        ))}
        <NewCard parentId={id} link_path={`/company_person/create/${id}`}/>
      </div>

      <h2 className="text-3xl font-bold m-4">Appointments</h2>
      <Link to={`/company/appointments/create/${id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-2 ml-2 rounded">Add appointment+</Link>
    </div>
  );
}

export default CompanyDetails;
