import {useEffect, useState} from "react";
import { useLocation, Link, useParams } from "react-router-dom";

function CompanyDetails() {
    const [companies, setCompanies] = useState([]);
    const location = useLocation();
    const { id } = useParams();

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">Company details</h1>
            <h2 className="text-3xl font-bold m-4">People</h2>
            <Link to={`/company_person/create/${id}`} className="inline-flex items-center px-7 py-3 text-md font-bold leading-5 text-white font-display mr-2 capitalize bg-blue-500 w-fit rounded-md hover:bg-gray-700">Add Person</Link>
        </div>
    );
}

export default CompanyDetails;
