import { Link } from "react-router-dom";

function OpportunityNewCard({link_path}) {
    return (
        <Link to={link_path} style={{ textDecoration: 'none', color: 'inherit' }} >
            <div className="min-w-md m-6 md:mb-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg flex gap-4">
                <svg className="w-16 h-16 md:w-20 md:h-20 mr-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path>
                </svg>

                <div className="flex flex-col items-center justify-center">
                    <p className="font-mono text-xl font-normal opacity-75 text-black mb-2">Add new opportunity</p>
                </div>
            </div>
        </Link>
    );
}

export default OpportunityNewCard;
