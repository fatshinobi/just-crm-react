import { useLocation } from "react-router-dom"
import Sidebar from "./Sidebar"
import CompanyShow from "./companies/Show"
import CompanyEdit from "./companies/Edit"
import CompanyCreate from "./companies/Create"
import PersonCreate from "./people/Create"
import PersonShow from "./people/Show"
import PersonEdit from "./people/Edit"
import CompanyPersonCreate from "./company_person/Create"
import PersonCompanyCreate from "./person_company/Create"
import CompanyPersonEdit from "./company_person/Edit"
import PersonCompanyEdit from "./person_company/Edit"
import EditTags from "./EditTags"
import CompaniesTagsSidebar from "./companies/CompaniesTagsSidebar"
import PeopleTagsSidebar from "./people/PeopleTagsSidebar"
import SearchPanel from "./SearchPanel"
import AppointmentCreate from "./appointments/Create"
import AppointmentEdit from "./appointments/Edit"
import AppointmentShow from "./appointments/Show"

function SidebarSwitcher() {
    const location = useLocation();

    const renderSidebar = () => {
      switch (true) {
        case location.pathname.includes("/companies/appointment/create"):
          return <AppointmentCreate />;
        case location.pathname.includes("/companies"):
          return <div><SearchPanel tagType={"0"} /><Sidebar /> <CompaniesTagsSidebar /></div>;
        case location.pathname.includes("/company/edit"):
          return <CompanyEdit />;
        case location.pathname.includes("/company/show"):
          return <CompanyShow isDetails={false} />;
        case location.pathname.includes("/company/create"):
          return <CompanyCreate />;
        case location.pathname.includes("/company/details"):
          return <CompanyShow isDetails={true} />;
        case location.pathname.includes("/company/appointments/create"):
          return <AppointmentCreate />;
        case location.pathname.includes("/company/appointments/edit"):
          return <AppointmentEdit />;
        case location.pathname.includes("/dashboard/appointments/show"):
          return <AppointmentShow />;
        case location.pathname.includes("/dashboard/appointments/edit"):
          return <AppointmentEdit />;
        case location.pathname.includes("/dashboard/appointments/create"):
          return <AppointmentCreate />;
        case location.pathname.includes("/company/tags"):
          return <EditTags tagType={"0"} />;
        case location.pathname.includes("/person/tags"):
          return <EditTags tagType={"1"} />;
        case location.pathname.includes("/company_person/create"):
          return <CompanyPersonCreate />;
        case location.pathname.includes("/company_person/edit"):
          return <CompanyPersonEdit />;
        case location.pathname.includes("/person_company/edit"):
          return <PersonCompanyEdit />;
        case location.pathname.includes("/person_company/create"):
          return <PersonCompanyCreate />;
        case location.pathname.includes("/people/appointment/create"):
          return <AppointmentCreate />;
        case location.pathname.includes("/people"):
           return <div><SearchPanel tagType={"1"} /><Sidebar /> <PeopleTagsSidebar /></div>;
        case location.pathname.includes("/person/create"):
          return <PersonCreate />;
        case location.pathname.includes("/person/show"):
          return <PersonShow />;
        case location.pathname.includes("/person/edit"):
          return <PersonEdit />;
        case location.pathname.includes("/person/appointments/create"):
          return <AppointmentCreate />;
        case location.pathname.includes("/person/appointments/edit"):
          return <AppointmentEdit />;
        case location.pathname.includes("/person/appointments/show"):
          return <div><Sidebar /></div>;
        case location.pathname.includes("/person/details"):
          return <PersonShow isDetails={true} />;
        default:
          return <Sidebar />;
      }
    };

    return (
        <div class="bg-gray-200">
            {renderSidebar()}
        </div>
    )
}

export default SidebarSwitcher;
