import { Link } from "react-router-dom";
import { defaultImage, slassForStage, slassForStatus } from "../../constants/opportunityOptions";

function OpportunityCardDetail({ record, showViewButton = false, linkPath = null }) {

    return (
        <div className="min-w-md m-6 md:mb-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg flex gap-4">
            <svg className={`w-16 h-16 md:w-20 md:h-20 mr-4 ${slassForStage(record)}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={defaultImage(record)}></path>
            </svg>

            <div className="flex flex-col">
                <span className={`link-underline link-underline-black text-black font-bold text-lg mb-2 ${slassForStatus(record)}`}>
                    {record.title}
                </span>

                <span className="text-black text-lg mb-2">
                    Start: <span className="font-bold">{record.start}</span>
                    <span className="ml-2">Finish:</span> <span className="font-bold">{record.finish}</span>
                </span>
                <span className="text-black text-lg mb-2">
                    Company: <span className="font-bold">{record.customer_name}</span>
                    <span className="ml-2">Person:</span> <span className="font-bold">{record.client_name}</span>
                    <span className="ml-2">User:</span> <span className="font-bold">{record.user_name}</span>
                </span>

                <p className="font-mono text-xs font-normal opacity-75 text-black mb-2">{record.description}</p>
                {showViewButton && (
                    <Link to={linkPath} className="inline-flex items-center px-7 py-3 text-md font-bold leading-5 text-white font-display mr-2 capitalize bg-blue-500 w-fit rounded-md hover:bg-gray-700">View</Link>
                )}
            </div>
        </div>
    );
}

export default OpportunityCardDetail;
