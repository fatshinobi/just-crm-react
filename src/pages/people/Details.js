import {useEffect, useState} from "react";
import { useLocation, useParams } from "react-router-dom";
import NewCard from "../../components/NewCard";
import ElementCard from "../../components/ElementCard";

function PersonDetails() {
    const [companies, setCompanies] = useState([]);
    const location = useLocation();
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/clients/customers/${id}`, {
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
                throw new Error("Failed to fetch companies");
            }
        })
        .then((data) => {
            console.log("Companies data:", data);
            setCompanies(data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    }, [location.key, location.pathname]);

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">Person details</h1>
            <h2 className="text-3xl font-bold m-4">Companies</h2>

            <div className="gap-4 flex m-5">
                {companies.map((record, index) => (
                    <ElementCard record={record} default_image={"/def_company_logo.png"} link_path={`/person_company/edit/${record.id}/${id}`} key={index} />
                ))}
                <NewCard parentId={id} link_path={`/person_company/create/${id}`} />
            </div>
        </div>
    );
}

export default PersonDetails;