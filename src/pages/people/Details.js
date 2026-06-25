import {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";


function PersonDetails() {
    const [people, setPeople] = useState([]);
    const location = useLocation();

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">Person details</h1>
        </div>
    );
}

export default PersonDetails;