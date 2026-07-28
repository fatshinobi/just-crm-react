import {useEffect, useState} from "react";
import { useLocation, useParams } from "react-router-dom";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Dashboards() {
    const [allEvents, setAllEvents] = useState([])

    const locales = {
        "en-US": require('date-fns/locale/en-US')
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    })

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">Dashboards</h1>
            <Calendar localizer={localizer} events={allEvents} 
                startAccessor="start" endAccessor="end" style={{height: 500, margin: "50px"}} />
        </div>
    )
}

export default Dashboards;
