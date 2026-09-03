import { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import NewCard from "../../components/NewCard";
import ElementCard from "../../components/ElementCard";
import AppointmentCard from "../../components/appointments/Card";
import AppointmentCreate from "../../components/appointments/Create";
import AppointmentNewCard from "../../components/appointments/NewCard";
import OpportunityElementCard from "../../components/opportunities/ElementCard";
import OpportunityNewCard from "../../components/opportunities/NewCard";
import TagsDetails from "../../components/TagsDetails";
import { apiGet } from "../../api/apiFetch";

function CompanyDetails() {
  const [people, setPeople] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    apiGet(`${process.env.REACT_APP_API_HOST}/customers/clients/${id}`)
      .then((data) => {
        console.log("People data:", data);
        setPeople(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [location.key, location.pathname]);

  useEffect(() => {
        if (!id) return;
        apiGet(`${process.env.REACT_APP_API_HOST}/customers/${id}/appointments`)
        .then(data => {
            console.log('Company Appointments data:', data);
            setAppointments(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }, [location.key, location.pathname]);

  useEffect(() => {
        if (!id) return;
        apiGet(`${process.env.REACT_APP_API_HOST}/customers/${id}/opportunities`)
        .then(data => {
            console.log('Company Opportunities data:', data);
            setOpportunities(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
  }, [location.key, location.pathname]);

  return (
    <div>
      <Link to={`/company/show/${id}`} className="bg-gray-200 hover:bg-gray-400 px-7 py-3 mb-5 rounded-md text-md font-medium">Back to Company</Link>

      <h1 className="text-4xl font-bold m-4">Company details</h1>
      <TagsDetails tagType={0} tagName="Company" />
      <h2 className="text-3xl font-bold m-4">People</h2>

      <div className="gap-4 flex m-5">
        {people.map((record, index) => (
          <ElementCard record={record} default_image={"/def_person_ava.png"} link_path={`/company_person/edit/${record.id}/${record.customer_id}`} key={index} />
        ))}
        <NewCard parentId={id} link_path={`/company_person/create/${id}`}/>
      </div>

      <h2 className="text-3xl font-bold m-4">Opportunities</h2>
      <OpportunityNewCard link_path={`/company/opportunities/create/${id}`} />
      <div className="">
        {opportunities.map((record, index) => (
          <OpportunityElementCard record={record} link_path={`/company/opportunities/edit/${record.id}/${id}`} key={index} />
        ))}
      </div>

      <h2 className="text-3xl font-bold m-4">Appointments</h2>
      <AppointmentNewCard link_path={`/company/appointments/create/${id}`} />
      <div className="">
        {appointments.map((record, index) => (
          <AppointmentCard record={record} link_path={`/company/appointments/edit/${id}/${record.id}`} key={index} />
        ))}
      </div>
    </div>
  );
}

export default CompanyDetails;
