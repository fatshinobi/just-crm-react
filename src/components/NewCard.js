import { Link } from "react-router-dom";

function NewCard({parentId}) {
  const img_url = process.env.PUBLIC_URL + "/def_person_ava.png";
  return (
    <Link to={`/company_person/create/${parentId}`} style={{ textDecoration: 'none', color: 'inherit' }} >
        <div className="border p-4 rounded-lg shadow-lg flex flex-col gap-4">
            <svg className="w-10 h-10 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
        </div>
    </Link>
  );
}

export default NewCard;
