import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function AppointmentCard({ record, link_path }) {
    const defaultImage = () => {
        switch (record.communication_type) {
            case 0:
                // task icon               
                return "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z";
            case 1:
                // email icon
                return "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
            case 2:
                // phone icon
                return "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z";
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

    const localTime = dayjs.utc(record.formatted_when).local().format('MMMM D, YYYY hh:mm A');

    return (
        <Link to={link_path} style={{ textDecoration: 'none', color: 'inherit' }} >
            <div className="min-w-md m-6 md:mb-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg flex gap-4">
                <svg className="w-16 h-16 md:w-20 md:h-20 mr-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={defaultImage()}></path>
                </svg>

                <div className="flex flex-col">
                    <span className={`${slassForStatus()} link-underline link-underline-black font-bold text-lg mb-2`}>
                        {localTime}
                    </span>

                    <span className="text-black text-lg mb-2">
                        Customer: <span className="font-bold">{record.customer_name}</span>
                        <span className="ml-2">Client:</span> <span className="font-bold">{record.client_name}</span>
                    </span>

                    <p className="font-mono text-xs font-normal opacity-75 text-black mb-2">{record.about}</p>
                </div>
            </div>
        </Link>
    );
}

export default AppointmentCard;
