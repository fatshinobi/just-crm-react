import {useEffect, useState} from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import { apiGet } from "../api/apiFetch";

function Dashboards() {
    const [allEvents, setAllEvents] = useState([])
    const [currentView, setCurrentView] = useState("week");
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());

    const locales = {
        "en-US": require('date-fns/locale/en-US')
    };

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales
    });

    const convertToFinishDate = (startDate) => {
        const finishDate = new Date(dayjs.utc(startDate).local());
        return new Date(finishDate.getTime() + 30 * 60000);
    };

    const handleSelectedEvent = (event) => {
        navigate(`/dashboard/appointments/show/${event.id}`);
    };

    useEffect(() => {
        const userId = localStorage.getItem('userDataId');
        apiGet(`${process.env.REACT_APP_API_HOST}/users/${userId}/appointments`)
        .then(data => {
          console.log('Appointments data:', data);
          const allEventsData = data.map(appointment => ({
              id: appointment.id,
              start: new Date(dayjs.utc(appointment.formatted_when).local()),
              finish: convertToFinishDate(appointment.formatted_when),
              description: appointment.about
          }));
          setAllEvents(allEventsData);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, []);

    return (
        <div>
            <h1 className="text-4xl font-bold m-4">Dashboards</h1>
            <Calendar localizer={localizer} events={allEvents} view={currentView} defaultView="week"
                onView={(view) => setCurrentView(view)}
                onSelectEvent={(e) => handleSelectedEvent(e)}
                date={currentDate}
                onNavigate={(newDate, view, action) => {
                  setCurrentDate(newDate);
                }}
                startAccessor="start" endAccessor="finish" style={{height: 500, margin: "50px"}} />
        </div>
    )
}

export default Dashboards;
