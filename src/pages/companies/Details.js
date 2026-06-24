import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";


function CompanyDetails() {
    const [companies, setCompanies] = useState([]);
    const location = useLocation();

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">Company details</h1>
        </div>
    );
}

export default CompanyDetails;
