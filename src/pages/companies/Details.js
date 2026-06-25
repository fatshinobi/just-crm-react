import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import PersonCard from "../../components/company_person/PersonCard";

function CompanyDetails() {
  const [people, setPeople] = useState([]);
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/customers/clients/${id}`, {
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
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold m-4">Company details</h1>
      <h2 className="text-3xl font-bold m-4">People</h2>

      <div className="gap-4 flex m-5">
        {people.map((record, index) => (
          <PersonCard record={record} key={index} />
        ))}
      </div>

      <Link
        to={`/company_person/create/${id}`}
        className="inline-flex items-center px-7 py-3 text-md font-bold leading-5 text-white font-display mr-2 capitalize bg-blue-500 w-fit rounded-md hover:bg-gray-700"
      >
        Add Person
      </Link>
    </div>
  );
}

export default CompanyDetails;
