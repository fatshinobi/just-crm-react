import { Link } from "react-router-dom";

function OpportunityCard({ record, link_path }) {
const defaultImage = () => {
        switch (record.stage) {
            case 0:
                // awareness icon - target/bullseye
                return "M12 8v4l3 3m-3-7a7 7 0 100 14A7 7 0 0012 8z";
            case 1:
                // interest icon - eye
                return "M1 12s8 7 11 7 11-7 11-7-8-7-11-7S1 12 1 12z";
            case 2:
                // decision icon - chess knight
                return "M12 2l3 9h9l-6 5 2 9-7-5-7 5 2-9z";
            case 3:
                // buy/won icon - checkmark
                return "M5 13l4 4L19 7";
        }
    };

    const slassForStage = () => {
        switch (record.stage) {
            case 0:
                // awareness - gray
                return "text-gray-500";
            case 1:
                // interest - blue
                return "text-blue-500";
            case 2:
                // decision - orange
                return "text-orange-500";
            case 3:
                // buy/won - green
                return "text-green-500";
            default:
                return "text-gray-500";
        }
    };

    const slassForStatus = () => {
        switch (record.status) {
            case 0:
                return "text-gray-500";
            case 1:
                return "text-black";
            case 2:
                return "text-black line-through";
            default:
                return "text-gray-500";
        }
    };


    return (
        <div className="min-w-md m-6 md:mb-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg flex gap-4">
            <svg className={`w-16 h-16 md:w-20 md:h-20 mr-4 ${slassForStage()}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={defaultImage()}></path>
            </svg>

            <div className="flex flex-col">
                <span className="link-underline link-underline-black text-black font-bold text-lg mb-2">
                    {record.title}
                </span>

                <span className="text-black text-lg mb-2">
                    Company: <span className="font-bold">{record.customer_name}</span>
                    <span className="ml-2">Person:</span> <span className="font-bold">{record.client_name}</span>
                    <span className="ml-2">User:</span> <span className="font-bold">{record.user_name}</span>
                </span>

                <p className="font-mono text-xs font-normal opacity-75 text-black mb-2">{record.description}</p>
                <Link to={link_path} className="inline-flex items-center px-7 py-3 text-md font-bold leading-5 text-white font-display mr-2 capitalize bg-blue-500 w-fit rounded-md hover:bg-gray-700">View</Link>
            </div>
        </div>
    );
}

export default OpportunityCard;
