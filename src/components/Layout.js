import { Outlet, Link, useLocation } from "react-router-dom"
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

function Layout({setAccessToken}) {
    const location = useLocation();
    const Logout = () => {
        localStorage.removeItem("accessToken");
        setAccessToken(false);
    };

    const renderSidebar = () => {
      switch (true) {
        case location.pathname.includes("/companies"):
          return <Sidebar />;
        case location.pathname.includes("/company/edit"):
          return <CompanyEdit />;
        case location.pathname.includes("/company/show"):
          return <CompanyShow isDetails={false} />;
        case location.pathname.includes("/company/create"):
          return <CompanyCreate />;
        case location.pathname.includes("/company/details"):
          return <CompanyShow isDetails={true} />;
        case location.pathname.includes("/company_person/create"):
          return <CompanyPersonCreate />;
        case location.pathname.includes("/company_person/edit"):
          return <CompanyPersonEdit />;
        case location.pathname.includes("/person_company/edit"):
          return <PersonCompanyEdit />;
        case location.pathname.includes("/person_company/create"):
          return <PersonCompanyCreate />;
        case location.pathname.includes("/people"):
          return <Sidebar />;
        case location.pathname.includes("/person/create"):
          return <PersonCreate />;
        case location.pathname.includes("/person/show"):
          return <PersonShow />;
        case location.pathname.includes("/person/edit"):
          return <PersonEdit />;
        case location.pathname.includes("/person/details"):
          return <PersonShow isDetails={true} />;
        default:
          return <div>Default Sidebar</div>;
      }
    };
    return (
        <>
          {/* Navbar */}
          <nav className="bg-gray-800 p-4 flex items-center">
            <div className="flex space-x-4">
              <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/people" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">People</Link>
              <Link to="/companies" className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Companies</Link>
            </div>
            <button onClick={Logout} className="ml-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </nav>
          <div className="grid grid-cols-[70%_30%]">
            <div class="bg-white">
                <Outlet />
            </div>
            <div class="bg-gray-200">
              {renderSidebar()}
            </div>
          </div>
        </>
    );
}

export default Layout;
