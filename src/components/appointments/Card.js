import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { defaultImage, appointmentStatuses } from "../../constants/appointmentOptions";

dayjs.extend(utc);

function AppointmentCard({ record, link_path }) {
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
        <Link to={link_path} onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none', color: 'inherit' }} >
            <div className="min-w-md m-6 md:mb-0 col-span-12 sm:col-span-6 lg:col-span-4 border p-4 rounded-lg shadow-lg flex gap-4">
                <svg className="w-16 h-16 md:w-20 md:h-20 mr-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={defaultImage(record)}></path>
                </svg>

                <div className="flex flex-col">
                    <span className={`${slassForStatus()} link-underline link-underline-black font-bold text-lg mb-2`}>
                        {localTime}
                    </span>

                    <span className="text-black text-lg mb-2">
                        Company: <span className="font-bold">{record.customer_name}</span>
                        <span className="ml-2">Person:</span> <span className="font-bold">{record.client_name}</span>
                        <span className="ml-2">User:</span> <span className="font-bold">{record.user_name}</span>
                        <span className="ml-2">Opportunity:</span> <span className="font-bold">{record.opportunity_name}</span>
                    </span>

                    <p className="font-mono text-xs font-normal opacity-75 text-black mb-2">{record.about}</p>
                </div>
            </div>
        </Link>
    );
}

export default AppointmentCard;
