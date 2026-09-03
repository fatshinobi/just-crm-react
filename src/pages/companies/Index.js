import {useEffect, useState} from "react";
import { useLocation, useParams } from "react-router-dom";
import RecordList from "../../components/RecordList";
import { apiGet } from "../../api/apiFetch";

function CompaniesIndex() {
    const [companies, setCompanies] = useState([]);
    const location = useLocation();
    const { tag } = useParams();
    const { query } = useParams();

    useEffect(() => {
        if (!location.pathname.includes('/companies') && location.pathname !== '/' && companies.length > 0) return;
        // Fetch companies data from API and update state
        let url = `${process.env.REACT_APP_API_HOST}/customers`;
        if (typeof tag !== "undefined") {
          url = `${url}?tag=${tag}`;
        } else if (typeof query !== "undefined" && query.length > 2 ) {
          url = `${url}?search=${query}`;
        }

        apiGet(url)
        .then((data) => {
          console.log('Companies data:', data);
          setCompanies(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, [location.key, location.pathname]);

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">Companies List</h1>
            { companies && companies.length > 0 ?
              <RecordList records={companies?.map(company => (
                {
                  id: company.id,
                  caption: company.name,
                  description: company.about,
                  show_path: `/company/show/${company.id}`,
                  edit_path: `/company/edit/${company.id}`,
                  avatar_url: company.avatar_url,
                  tags: company.tags?.map(tag => (tag.name))
                }
              ))} defaultImage="/def_company_logo.png" />
            : <p>Loading companies...</p> }
        </div>
    );
}

export default CompaniesIndex;
