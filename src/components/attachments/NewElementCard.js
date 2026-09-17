import { Link } from "react-router-dom";

function NewAttachmentElementCard({ parentId, link_path }) {
  return (
    <Link to={link_path} style={{ textDecoration: 'none', color: 'inherit' }} >
        <div className="border p-4 rounded-lg shadow-lg flex flex-col gap-4 min-h-[200px]">
            <svg className="w-10 h-10 mt-14 mr-7 ml-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
        </div>
    </Link>
  );
}

export default NewAttachmentElementCard;
